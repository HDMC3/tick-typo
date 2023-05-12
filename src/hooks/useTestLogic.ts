import { useEffect, useState } from "react"
import { useTypingTestStore } from "../store/typingTestStore"
import { TestMode, TestModeOption, TypingState } from "../store/enums";

interface TestResult {
    correctWords: number;
    incorrectChars: number;
    correctChars: number;
    errors: number;
    wpm: number;
}

const INITIAL_RESULT: TestResult = {
    correctWords: 0,
    incorrectChars: 0,
    correctChars: 0,
    errors: 0,
    wpm: 0
}

const getTestDuration = (option: TestModeOption) => {
    return option === TestModeOption.TIME_30 ? 30 
        : option === TestModeOption.TIME_60 ? 60 
        : option === TestModeOption.TIME_120 ? 120 
        : 0;
}

export const useTestLogic = () => {
    const { testMode, testModeOption, letterIdx, testText, typingState, endTest, restartTest, words, letters } = useTypingTestStore();
    const [time, setTime] = useState(0);
    const [timer, setTimer] = useState<number | undefined>();
    const [result, setResult] = useState<TestResult>(INITIAL_RESULT);
    const [errorsCount, setErrorsCount] = useState(0);

    const timerCallback = () => {
        setTime(currentTime => currentTime + 1);
    }

    const startTimer = () => {
        setTime(0);
        const interval = setInterval(timerCallback, 1000);
        setTimer(interval);
    }

    const clearTimer = () => {
        clearInterval(timer);
    }

    const calculateResult = (): TestResult => {
        const correctWords = words.reduce((count, word) => {
            count += word.every(l => l.correct || l.char === ' ') ? 1 : 0;
            return count;
        }, 0);

        const incorrectChars = letters.reduce((count, letter) => {
            count += !letter.correct && letter.evaluated ? 1 : 0;
            return count;
        }, 0);

        const correctChars = letters.reduce((count, letter) => {
            count += letter.correct && letter.evaluated ? 1 : 0;
            return count;
        }, 0);

        const wpm = correctWords / (time / 60);

        return { correctWords, incorrectChars, correctChars, errors: errorsCount, wpm };
    }

    const markError = () => {
        const checkedLetterIdx = letterIdx;
        if (checkedLetterIdx < 0 || checkedLetterIdx > testText.length - 1) return;

        if (letters[checkedLetterIdx].correct) return;

        setErrorsCount(state => state + 1)
    }

    useEffect(() => {
        if (typingState !== TypingState.STARTED) return;

        if (letterIdx > testText.length - 1) {
            endTest();
        }
    }, [letterIdx]);

    useEffect(() => {
        if (typingState !== TypingState.STARTED) return;

        if (testMode !== TestMode.TIME) return 
        
        const testDuration = getTestDuration(testModeOption);
        if (time >= testDuration) {
            endTest();
        }
    }, [time]);

    useEffect(() => {
        if (typingState === TypingState.STARTED) {
            startTimer();
            setResult(INITIAL_RESULT)       
        }

        if (typingState === TypingState.PENDING) {
            clearTimer();
            setErrorsCount(0);
        }

        if (typingState === TypingState.FINISHED) {
            clearTimer();
            setResult(
                calculateResult()
            );
        }
    }, [typingState])

    useEffect(() => {
        restartTest();
        setTime(0);
        setResult(INITIAL_RESULT);
    }, [testModeOption]);

    return {
        time,
        result,
        markError
    }
}
