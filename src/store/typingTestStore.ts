import { create } from "zustand";
import { type TypingTestState, type TestLetter } from "./types";

export const useTypingTestStore = create<TypingTestState>((set) => {
    return {
        text: '',
        letterIdx: 0,
        letters: [],
        words: [],
        setText: (text: string) => {
            const testLetters: TestLetter[] = text.split('').map(char => {
                return {
                    char, 
                    correct: false
                }
            });

            let idx = 0;
            const testWords = text.split(' ').map(word => {
                const end = idx + word.length;
                const testWord = testLetters.slice(idx, end);
                idx = end + 1;
                return testWord;
            })

            set(state => {
                return {
                    ...state,
                    text,
                    words: testWords,
                    letters: testLetters
                }
            })
        }
    }
})