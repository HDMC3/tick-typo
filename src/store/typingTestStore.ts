import { create } from "zustand";
import { type TypingTestState, type TestLetter } from "./types";
import { VOWEL_TO_ACCENT } from "../helpers/constants";

export const useTypingTestStore = create<TypingTestState>((set) => {
    return {
        text: '',
        letterIdx: 0,
        accentPressed: false,
        letters: [],
        words: [],
        setText: (text: string) => {
            const testLetters: TestLetter[] = text.split('').map((char, i) => {
                return {
                    char, 
                    correct: false,
                    evaluated: false,
                    active: i === 0
                }
            });

            let idx = 0;
            const rawWords = text.split(' ');
            const testWords = rawWords.map((word, i) => {
                const end = idx + word.length;
                const testWord = testLetters.slice(idx, end);
                if (i < rawWords.length - 1) {
                    testWord.push(testLetters[end])
                }
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
        },
        checkLetter: (typedChar: string) => {
            set(state => {
                const { letterIdx, letters, accentPressed } = state;
                const letter = letters[letterIdx];
                
                if (accentPressed) {
                    typedChar = VOWEL_TO_ACCENT[typedChar];
                }

                letter.correct = letter.char === typedChar;
                letter.evaluated = true;
                letter.active = false;
                letters[letterIdx + 1].active = true;
                return {
                    ...state,
                    letters: state.letters,
                    letterIdx: letterIdx + 1,
                    accentPressed: false
                }
            })
        },
        markAccent: () => {
            set(state => {
                return {
                    ...state,
                    accentPressed: true
                }
            })
        }
    }
})