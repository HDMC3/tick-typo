import { type TestLetter } from "./test-letter";

export interface TypingTestState {
    text: string;
    letterIdx: number;
    words: TestLetter[][]
    letters: TestLetter[];
    setText: (text: string) => void;
    checkLetter: (typedChar: string) => void;
}