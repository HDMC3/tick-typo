import { create } from "zustand";
import { type TypingTestState, type TestLetter } from "./types";
import { VOWEL_TO_ACCENT } from "../helpers/constants";
import { TestType, TestTypeOption } from "./enums";

export const useTypingTestStore = create<TypingTestState>((set) => {
    return {
        text: '',
        letterIdx: 0,
        accentPressed: false,
        letters: [],
        words: [],
        testType: TestType.WORDS,
        testTypeOption: TestTypeOption.WORDS_25,
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
        setTestType: (newTestType: TestType) => {
            const defaultOptions = {
                [TestType.WORDS]: TestTypeOption.WORDS_25,
                [TestType.TEXT]: TestTypeOption.TEXT_SHORT,
                [TestType.TIME]: TestTypeOption.TIME_30,
            }
            set(state => {
                if (state.testType === newTestType) return state;
                return {
                    ...state,
                    testType: newTestType,
                    testTypeOption: defaultOptions[newTestType]
                }
            });
        },
        setTestTypeOption: (newTesTypeOption: TestTypeOption) => {
            set(state => {
                return {
                    ...state,
                    testTypeOption: newTesTypeOption
                }
            });
        }
    }
})