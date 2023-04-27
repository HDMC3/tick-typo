import { type TestLetter } from "./test-letter";

export interface TypingTestState {
    text: string;
    letterIdx: number;
    accentPressed: boolean;
    words: TestLetter[][]
    letters: TestLetter[];
    setText: (text: string) => void;
    checkLetter: (typedChar: string) => void;
    deleteLetter: () => void;
    markAccent: () => void;
}