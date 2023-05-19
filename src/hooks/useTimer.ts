import { useEffect, useState } from "react";
import { useTypingTestStore } from "../store/typingTestStore";
import { TypingState } from "../store/enums";

export const useTimer = () => {
    const [timer, setTimer] = useState<number | undefined>();
    const { time, typingState, setTestTime } = useTypingTestStore();

    const timerCallback = () => {
        setTestTime(currentTime => currentTime + 1);
    }

    const startTimer = () => {
        setTestTime(_ => 0);
        const interval = setInterval(timerCallback, 1000);
        setTimer(interval);
    }

    const clearTimer = () => {
        clearInterval(timer);
    }

    useEffect(() => {
        if (typingState === TypingState.STARTED) {
            startTimer();      
        }

        if (typingState === TypingState.PENDING) {
            clearTimer();
        }

        if (typingState === TypingState.FINISHED) {
            clearTimer();
        }
    }, [typingState])

    return {
        time
    }
}