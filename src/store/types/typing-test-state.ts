import { type TestMode, type TestModeOption } from "../enums";
import { type TestLetter } from "./test-letter";

export interface TypingTestState {
    text: string;
    letterIdx: number;
    accentPressed: boolean;
    words: TestLetter[][]
    letters: TestLetter[];
    testMode: TestMode;
    testModeOption: TestModeOption;
    setText: (text: string) => void;
    checkLetter: (typedChar: string) => void;
    deleteLetter: () => void;
    markAccent: () => void;
    setTestMode: (testMode: TestMode) => void;
    setTestModeOption: (testModeOption: TestModeOption) => void;
}