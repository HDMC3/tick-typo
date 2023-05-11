import { useEffect, useState } from "react"
import { useTypingTestStore } from "../store/typingTestStore"
import { TestMode, TestModeOption, TypingState } from "../store/enums";

interface TestResult {
    correctWords: number,
    wpm: number;
    errors: number;
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
    const [result, setResult] = useState<TestResult>({
        correctWords: 0,
        errors: 0,
        wpm: 0
    });

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
        const errors = letters.reduce((count, letter) => {
            count += !letter.correct && letter.evaluated ? 1 : 0;
            return count;
        }, 0);
        const wpm = correctWords / (time / 60);

        return { correctWords, errors, wpm };
    }

    useEffect(() => {
        if (typingState === TypingState.PENDING || typingState === TypingState.FINISHED) return;

        if (testMode === TestMode.TIME) {
            const testDuration = getTestDuration(testModeOption);
            if (time >= testDuration) {
                endTest();
            }
            return;
        }

        if (letterIdx > testText.length - 1) {
            endTest();
        }
    }, [letterIdx, time]);

    useEffect(() => {
        if (typingState === TypingState.STARTED) {
            startTimer();
            setResult({
                correctWords: 0,
                errors: 0,
                wpm: 0
            })       
        }

        if (typingState === TypingState.PENDING) {
            clearTimer();
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
        setResult({
            correctWords: 0,
            errors: 0,
            wpm: 0
        });
    }, [testModeOption]);

    return {
        time,
        result
    }
}
