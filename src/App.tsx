import { useEffect } from 'react';
import { WordsContainer } from './components/WordsContainer';
import { useTypingTestStore } from './store/typingTestStore';
import { INVALID_KEYS } from './helpers/constants';
import './App.css';
import { OptionsBar } from './components/OptionsBar';
import { useTestTextData } from './hooks/useTestTextData';
import { TypingState } from './store/enums';
import { useTestLogic } from './hooks/useTestLogic';

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

function App() {
	const {
		letterIdx,
		typingState,
		setTestText,
		checkLetter,
		markAccent,
		deleteLetter,
		startTest,
	} = useTypingTestStore();
	const { textData } = useTestTextData();

	useEffect(() => {
		setTestText(textData.join(' '));
		setWordsContainerPosittion();
	}, [textData]);

	const { time, result, markError } = useTestLogic();

	useEffect(() => {
		setWordsContainerPosittion();
		const handleKeyUp = (event: KeyboardEvent) => {
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
				<WordsContainer />
				<pre>{JSON.stringify({ time, result }, null, 4)}</pre>
			</main>
		</div>
	);
}

export default App;
