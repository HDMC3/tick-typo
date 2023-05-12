import { useEffect } from 'react';
import { WordsContainer } from './components/WordsContainer';
import { useTypingTestStore } from './store/typingTestStore';
import './App.css';
import { OptionsBar } from './components/OptionsBar';
import { useTestTextData } from './hooks/useTestTextData';
import { useTestLogic } from './hooks/useTestLogic';
import { useKeyboard } from './hooks/useKeyboard';

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
	const { setTestText } = useTypingTestStore();
	const { textData } = useTestTextData();
	const { time, result } = useTestLogic();
	const { errors, capsLockOn } = useKeyboard();

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
				<WordsContainer />
				<pre>
					{JSON.stringify(
						{ time, errors, result, capsLockOn },
						null,
						4
					)}
				</pre>
			</main>
		</div>
	);
}

export default App;
