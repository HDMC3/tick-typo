import { useEffect } from "react"
import { useTypingTestStore } from "../store/typingTestStore"
import { TestMode, TestModeOption, TypingState } from "../store/enums";
import { type TestResult } from "../store/types/test-result";


const getTestDuration = (option: TestModeOption) => {
    return option === TestModeOption.TIME_30 ? 30 
        : option === TestModeOption.TIME_60 ? 60 
        : option === TestModeOption.TIME_120 ? 120 
        : 0;
}

export const useTestLogic = () => {
    const { testMode, time, testModeOption, letterIdx, testText, typingState, endTest, restartTest, words, letters } = useTypingTestStore();
    // const [result, setResult] = useState<TestResult>(INITIAL_RESULT);

    const calculateResult = (): TestResult => {
        const correctWords = words.reduce((count, word) => {
            count += word.every(l => (l.evaluated && l.correct) || (!l.evaluated && l.char === ' ')) ? 1 : 0;
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
        
        return {
            correctWords,
            incorrectChars,
            correctChars,
            wpm
        };
    }

    useEffect(() => {
        if (typingState !== TypingState.STARTED) return;

        if(letterIdx === testText.length - 1 && letters[letterIdx-1].correct) {
            const result = calculateResult();
            endTest(result);
        }

        if (letterIdx > testText.length - 1) {
            const result = calculateResult();
            endTest(result);
        }
    }, [letterIdx]);

    useEffect(() => {
        if (typingState !== TypingState.STARTED) return;

        if (testMode !== TestMode.TIME) return 
        
        const testDuration = getTestDuration(testModeOption);
        if (time >= testDuration) {
            const result = calculateResult();
            endTest(result);
        }
    }, [time]);

    // useEffect(() => {
    //     if (typingState === TypingState.STARTED) {
                
    //     }

    //     if (typingState === TypingState.PENDING) {
            
    //     }

    //     if (typingState === TypingState.FINISHED) {
            
    //     }
    // }, [typingState])

    useEffect(() => {
        restartTest();
        // setResult(INITIAL_RESULT);
    }, [testModeOption]);
}
