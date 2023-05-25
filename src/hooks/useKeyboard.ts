import { useEffect, useState } from "react";
import { useTypingTestStore } from "../store/typingTestStore"
import { TypingState } from "../store/enums";
import { INVALID_KEYS } from "../helpers/constants";

export const useKeyboard = () => {
    const { letters, letterIdx, typingState, deleteLetter, markAccent, startTest, checkLetter, setTestErrors } = useTypingTestStore();
    const [capsLockOn, setCapsLockOn] = useState(false);
    const [disable, setDisable] = useState(false);

    const setDisableKeyboard = (value: boolean) => {
        setDisable(value);
    }

    useEffect(() => {
		const handleKeyUp = (event: KeyboardEvent) => {
            const capsLockState = event.getModifierState('CapsLock');
            setCapsLockOn(capsLockState);

            if (disable) return;

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
                checkLetter(event.key);
                return;
			}

			checkLetter(event.key);
		};

		addEventListener('keyup', handleKeyUp);

		return () => {
			removeEventListener('keyup', handleKeyUp);
		};
	}, [letterIdx, typingState, disable]);

    useEffect(() => {
        if (typingState === TypingState.STARTED) {
            setTestErrors(_ => 0);
        }
    }, [typingState])

    return {
        activeLetter: letters[letterIdx],
        capsLockOn,
        setDisableKeyboard
    }
}