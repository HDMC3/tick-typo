import { useEffect } from 'react';
import { WordsContainer } from './components/WordsContainer';
import { useTypingTestStore } from './store/typingTestStore';
import { INVALID_KEYS } from './helpers/constants';
import './App.css';
import { OptionsBar } from './components/OptionsBar';
import { useTestTextData } from './hooks/useTestTextData';

function setWordsContainerPosittion() {
	const activeLetter = document.querySelector<HTMLElement>('.animate-cursor');
	const words = document.querySelector<HTMLElement>('#words');

	if (activeLetter == null || words == null) return;

	const rect = activeLetter.getBoundingClientRect();

	if (words.clientHeight - activeLetter.offsetTop <= rect.height * 2) return;
	words.style.transform = `translateY(${
		-activeLetter.offsetTop +
		(activeLetter.offsetTop === 0 ? 0 : rect.height)
	}px)`;
}

function App() {
	const { setTestText, checkLetter, markAccent, deleteLetter } =
		useTypingTestStore();
	const { textData } = useTestTextData();

	useEffect(() => {
		setTestText(textData.join(' '));
		setWordsContainerPosittion();
	}, [textData]);

	useEffect(() => {
		setWordsContainerPosittion();
		const handleKeyUp = (event: KeyboardEvent) => {
			if (INVALID_KEYS.includes(event.key)) return;

			if (event.key === 'Backspace') {
				deleteLetter();
				return;
			}

			if (event.key === 'Dead') {
				markAccent();
				return;
			}

			checkLetter(event.key);
		};

		addEventListener('keyup', handleKeyUp);

		return () => {
			removeEventListener('keyup', handleKeyUp);
		};
	});

	return (
		<div>
			<main className="flex flex-col gap-10 py-7 justify-center items-center relative">
				<OptionsBar />
				<WordsContainer />
			</main>
		</div>
	);
}

export default App;
