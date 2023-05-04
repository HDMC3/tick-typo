import { type TestType, type TestTypeOption } from "../enums";
import { type TestLetter } from "./test-letter";

export interface TypingTestState {
    text: string;
    letterIdx: number;
    accentPressed: boolean;
    words: TestLetter[][]
    letters: TestLetter[];
    testType: TestType;
    testTypeOption: TestTypeOption;
    setText: (text: string) => void;
    checkLetter: (typedChar: string) => void;
    deleteLetter: () => void;
    markAccent: () => void;
    setTestType: (testType: TestType) => void;
    setTestTypeOption: (testTypeOption: TestTypeOption) => void;
}