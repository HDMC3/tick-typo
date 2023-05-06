import { create } from "zustand";
import { type TypingTestState, type TestLetter } from "./types";
import { VOWEL_TO_ACCENT } from "../helpers/constants";
import { TestMode, TestModeOption } from "./enums";

export const useTypingTestStore = create<TypingTestState>((set) => {
    return {
        text: '',
        letterIdx: 0,
        accentPressed: false,
        letters: [],
        words: [],
        testMode: TestMode.WORDS,
        testModeOption: TestModeOption.WORDS_25,
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
                const { letterIdx, letters, accentPressed, text } = state;
                if (letterIdx >= text.length) return state;
                const currentLetter = letters[letterIdx];
                
                if (accentPressed) {
                    typedChar = VOWEL_TO_ACCENT[typedChar];
                }

                currentLetter.correct = currentLetter.char === typedChar;
                currentLetter.evaluated = true;
                currentLetter.active = false;

                const newLetterIdx = letterIdx + 1;

                if (newLetterIdx <= text.length - 1) letters[newLetterIdx].active = true;
                return {
                    ...state,
                    letters: state.letters,
                    letterIdx: newLetterIdx,
                    accentPressed: false
                }
            })
        },
        deleteLetter: () => {
            set(state => {
                const { letterIdx, letters, text } = state;
                if (letterIdx === 0 || letterIdx >= text.length) return state;

                const currentLetter = letters[letterIdx];
                currentLetter.active = false;

                const newLetterIdx = letterIdx - 1;

                letters[newLetterIdx].active = true;
                letters[newLetterIdx].evaluated = false;
                return {
                    ...state,
                    letterIdx: newLetterIdx,
                    accentPressed: false
                };
            })
        },
        markAccent: () => {
            set(state => {
                return {
                    ...state,
                    accentPressed: true
                }
            })
        },
        setTestMode: (newTestMode: TestMode) => {
            const defaultOptions = {
                [TestMode.WORDS]: TestModeOption.WORDS_25,
                [TestMode.TEXT]: TestModeOption.TEXT_SHORT,
                [TestMode.TIME]: TestModeOption.TIME_30,
            }
            set(state => {
                if (state.testMode === newTestMode) return state;
                return {
                    ...state,
                    testMode: newTestMode,
                    testModeOption: defaultOptions[newTestMode]
                }
            });
        },
        setTestModeOption: (newTestModeOption: TestModeOption) => {
            set(state => {
                return {
                    ...state,
                    testModeOption: newTestModeOption
                }
            });
        }
    }
})