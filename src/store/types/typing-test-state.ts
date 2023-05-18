import { type TypingState, type TestMode, type TestModeOption } from "../enums";
import { type TestLetter } from "./test-letter";
import { type TestResult } from "./test-result";

export interface TypingTestState {
    testText: string;
    letterIdx: number;
    accentPressed: boolean;
    words: TestLetter[][]
    letters: TestLetter[];
    testMode: TestMode;
    testModeOption: TestModeOption;
    typingState: TypingState;
    testResult: TestResult;
    time: number;
    errors: number;
    setTestText: (text: string) => void;
    checkLetter: (typedChar: string) => void;
    deleteLetter: () => void;
    markAccent: () => void;
    setTestMode: (testMode: TestMode) => void;
    setTestModeOption: (testModeOption: TestModeOption) => void;
    endTest: (result: TestResult) => void;
    startTest: () => void;
    restartTest: () => void;
    setTestTime: (callback: (time: number) => number) => void;
    setTestErrors: (callback: (errors: number) => number) => void;
}