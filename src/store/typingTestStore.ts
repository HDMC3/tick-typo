import { create } from "zustand";
import { type TypingTestState, type TestLetter } from "./types";
import { VOWEL_TO_ACCENT } from "../helpers/constants";
import { TestMode, TestModeOption, TypingState } from "./enums";
import { type TestResult } from "./types/test-result";

const INITIAL_RESULT: TestResult = {
    correctWords: 0,
    incorrectChars: 0,
    correctChars: 0,
    wpm: 0,
}

export const useTypingTestStore = create<TypingTestState>((set) => {
    return {
        testText: '',
        letterIdx: 0,
        accentPressed: false,
        letters: [],
        words: [],
        testMode: TestMode.WORDS,
        testModeOption: TestModeOption.WORDS_25,
        typingState: TypingState.PENDING,
        testResult: INITIAL_RESULT,
        time: 0,
        errors: 0,
        setTestText: (text: string) => {
            text += ' ';
            const testLetters: TestLetter[] = text.split('').map((char, i) => {
                return {
                    char, 
                    correct: false,
                    evaluated: false,
                    active: i === 0
                }
            });

            let idx = 0;
            const rawWords = text.trim().split(' ');
            const testWords = rawWords.map((word) => {
                const end = idx + word.length;
                const testWord = testLetters.slice(idx, end + 1);
                idx = end + 1;
                return testWord;
            })

            set(state => {
                return {
                    ...state,
                    testText: text,
                    words: testWords,
                    letters: testLetters
                }
            })
        },
        checkLetter: (typedChar: string) => {
            set(state => {
                const { letterIdx, letters, accentPressed, testText } = state;
                if (letterIdx >= testText.length) return state;
                const currentLetter = letters[letterIdx];
                
                if (accentPressed) {
                    typedChar = VOWEL_TO_ACCENT[typedChar];
                }

                const isCorrect = currentLetter.char === typedChar;
                currentLetter.correct = isCorrect;
                currentLetter.evaluated = true;
                currentLetter.active = false;

                const newLetterIdx = letterIdx + 1;

                if (newLetterIdx <= testText.length - 1) letters[newLetterIdx].active = true;
                return {
                    ...state,
                    letters: state.letters,
                    letterIdx: newLetterIdx,
                    errors: isCorrect ? state.errors + 0 : state.errors + 1,
                    accentPressed: false
                }
            })
        },
        deleteLetter: () => {
            set(state => {
                const { letterIdx, letters, testText } = state;
                if (letterIdx === 0 || letterIdx >= testText.length) return state;

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
        },
        startTest: () => {
            set(state => {
                return {
                    ...state,
                    testResult: INITIAL_RESULT,
                    typingState: TypingState.STARTED
                }
            })
        },
        endTest: (result: TestResult) => {
            set(state => {
                return {
                    ...state,
                    testResult: {
                        ...result,
                    },
                    letterIdx: state.testText.length,
                    typingState: TypingState.FINISHED
                }
            })
        },
        restartTest: () => {
            set(state => {
                return {
                    ...state,
                    letterIdx: 0,
                    testResult: INITIAL_RESULT,
                    typingState: TypingState.PENDING
                }
            })
        },
        setTestTime(callback) {
            set(state => {
                const newTime = callback(state.time);
                return {
                    ...state,
                    time: newTime
                }
            });
        },
        setTestErrors(callback) {
            set(state => {
                const newErrorsCount = callback(state.errors);
                return {
                    ...state,
                    errors: newErrorsCount
                }
            });
        }
    }
})