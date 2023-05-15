import { useEffect } from 'react';
import { WordsContainer } from './components/WordsContainer';
import { useTypingTestStore } from './store/typingTestStore';
import './App.css';
import { OptionsBar } from './components/OptionsBar';
import { useTestTextData } from './hooks/useTestTextData';
import { useTestLogic } from './hooks/useTestLogic';
import { useKeyboard } from './hooks/useKeyboard';
import { TestMode, TypingState } from './store/enums';

function setWordsContainerPosittion() {
	const activeLetter = document.querySelector<HTMLElement>('.animate-cursor');
	const words = document.querySelector<HTMLElement>('#words');

	if (activeLetter == null || words == null) return;

	const rect = activeLetter.getBoundingClientRect();

	if (words.clientHeight - activeLetter.offsetTop <= rect.height) return;
	words.style.transform = `translateY(${
		-activeLetter.offsetTop +
		(activeLetter.offsetTop === 0 ? 0 : rect.height)
	}px)`;
}

function timeToMinutes(time: number) {
	const minutes = Math.floor(time / 60);
	return minutes < 10 ? `0${minutes}` : minutes;
}

function timeToSeconds(time: number) {
	const seconds = Math.round(time % 60);
	return seconds < 10 ? `0${seconds}` : seconds;
}

function App() {
	const { setTestText, typingState, testMode } = useTypingTestStore();
	const { textData } = useTestTextData();
	const { time } = useTestLogic();
	const { capsLockOn } = useKeyboard();

	useEffect(() => {
		setTestText(textData.join(' '));
	}, [textData]);

	useEffect(() => {
		setWordsContainerPosittion();
	});

	useEffect(() => {
		if (document.body == null) return;

		const observer = new ResizeObserver(() => {
			setWordsContainerPosittion();
		});

		observer.observe(document.body);
		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<div>
			<main className="flex flex-col gap-10 py-7 justify-center items-center relative">
				<OptionsBar />
				<div className="flex items-center flex-col gap-8">
					<WordsContainer />
					{testMode === TestMode.TIME ? (
						<div className="w-11/12" style={{ maxWidth: '60rem' }}>
							<kbd className="kbd text-lg">
								{timeToMinutes(time)}:{timeToSeconds(time)}
							</kbd>
						</div>
					) : null}
				</div>
				{typingState === TypingState.STARTED && capsLockOn ? (
					<span
						className={`badge badge-xl px-5 py-5 badge-outline-error gap-4 rounded-md`}
					>
						<span className={`dot dot-error`}></span>
						Caps Lock
					</span>
				) : null}
			</main>
		</div>
	);
}

export default App;
