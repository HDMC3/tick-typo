import { useEffect, useState } from 'react';
import { TestMode, TestModeOption, TypingState } from '../store/enums';
import { useTypingTestStore } from '../store/typingTestStore';

export const PARAM_BY_TEST_MODE_OPTION: Record<TestModeOption, number> = {
    [TestModeOption.WORDS_25]: 25,
    [TestModeOption.WORDS_50]: 50,
    [TestModeOption.WORDS_100]: 100,
    [TestModeOption.TIME_30]: 175,
    [TestModeOption.TIME_60]: 175,
    [TestModeOption.TIME_120]: 175,
    [TestModeOption.TEXT_SHORT]: 3,
    [TestModeOption.TEXT_MEDIUM]: 7,
    [TestModeOption.TEXT_LONG]: 10
}

const BASE_URL = 'https://moranh56.npkn.net/random-data';

export const useTestTextData = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { testMode, testModeOption, typingState, testText, setTestText } = useTypingTestStore();

    const getTestTextData = async() => {
        setLoading(true);
        const urlResource = testMode === TestMode.TEXT ? 'quotes' : 'words';
        const url = `${BASE_URL}/${urlResource}/${PARAM_BY_TEST_MODE_OPTION[testModeOption]}`;
        try {
            const resp = await fetch(url);            
            setError(!resp.ok);

            const data: string[] = await resp.json();
            const text = data.join(' ');
            setTestText(text);
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false);
        }
    }

    const reload = () => {
        void getTestTextData();
    }

    useEffect(() => {
        void getTestTextData();
    }, [testModeOption]);

    useEffect(() => {
        if (testText.length !== 0 && typingState === TypingState.PENDING) {
            void getTestTextData();
        }
    }, [typingState]);

    return {
        loadingWords: loading,
        error,
        reload
    }
}