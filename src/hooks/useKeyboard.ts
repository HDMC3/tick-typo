import { useEffect, useState } from "react";
import { useTypingTestStore } from "../store/typingTestStore"
import { TypingState } from "../store/enums";
import { INVALID_KEYS } from "../helpers/constants";

export const useKeyboard = () => {
    const { letters, letterIdx, typingState, testText, deleteLetter, markAccent, startTest, checkLetter } = useTypingTestStore();
    const [errorsCount, setErrorsCount] = useState(0);
    const [capsLockOn, setCapsLockOn] = useState(false);

    const markError = () => {
        const checkedLetterIdx = letterIdx;
        if (checkedLetterIdx < 0 || checkedLetterIdx > testText.length - 1) return;

        if (letters[checkedLetterIdx].correct) return;
        
        setErrorsCount(state => state + 1)
    }

    useEffect(() => {
		const handleKeyUp = (event: KeyboardEvent) => {
            const capsLockState = event.getModifierState('CapsLock');
            setCapsLockOn(capsLockState);

			if (typingState === TypingState.FINISHED) return;

			if (INVALID_KEYS.includes(event.key)) return;

			if (event.key === 'Backspace') {
				deleteLetter();
				return;
			}

			if (event.key === 'Dead') {
				markAccent();
				return;
			}

			if (letterIdx === 0 && typingState === TypingState.PENDING) {
				startTest();
			}

			checkLetter(event.key);
			markError();
		};

		addEventListener('keyup', handleKeyUp);

		return () => {
			removeEventListener('keyup', handleKeyUp);
		};
	});

    return {
        activeLetter: letters[letterIdx],
        errors: errorsCount,
        capsLockOn
    }
}