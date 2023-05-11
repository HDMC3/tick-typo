import { useEffect, useState } from 'react';
import { TestMode, TestModeOption } from '../store/enums';
import { useTypingTestStore } from '../store/typingTestStore';

export const PARAM_BY_TEST_MODE_OPTION: Record<TestModeOption, number> = {
    [TestModeOption.WORDS_25]: 25,
    [TestModeOption.WORDS_50]: 50,
    [TestModeOption.WORDS_100]: 100,
    [TestModeOption.TIME_30]: 300,
    [TestModeOption.TIME_60]: 600,
    [TestModeOption.TIME_120]: 1200,
    [TestModeOption.TEXT_SHORT]: 3,
    [TestModeOption.TEXT_MEDIUM]: 7,
    [TestModeOption.TEXT_LONG]: 10
}

const BASE_URL = 'https://moranh56.npkn.net/random-data';

export const useTestTextData = () => {
    const { testMode, testModeOption } = useTypingTestStore();
    const [ textData, setTextData ] = useState([]);

    const getTestTextData = async() => {
        const urlResource = testMode === TestMode.TEXT ? 'quotes' : 'words';
        const url = `${BASE_URL}/${urlResource}/${PARAM_BY_TEST_MODE_OPTION[testModeOption]}`;
        const resp = await fetch(url);
        const data = await resp.json();
        setTextData(data);
    }

    useEffect(() => {
        void getTestTextData();
    }, [testModeOption]);

    return {
        textData
    }
}