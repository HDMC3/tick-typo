import { useEffect, type MouseEvent } from 'react';
import { WordsContainer } from './components/WordsContainer';
import { useTypingTestStore } from './store/typingTestStore';
import './App.css';
import { OptionsBar } from './components/OptionsBar';
import { useTestTextData } from './hooks/useTestTextData';
import { useTestLogic } from './hooks/useTestLogic';
import { TypingState } from './store/enums';
import { setWordsContainerPosittion } from './helpers/ui';
import { CapsIndicator } from './components/CapsIndicator';
import { TestTimer } from './components/TestTimer';
import { useKeyboard } from './hooks/useKeyboard';
import { ResultsModal } from './components/ResultsModal';
import { useTimer } from './hooks/useTimer';
import { Navbar } from './components/Navbar';

function App() {
	const { restartTest, typingState } = useTypingTestStore();
	const { capsLockOn } = useKeyboard();
	const { time } = useTimer();
	useTestLogic();
	useTestTextData();

	const restartHandler = (event: MouseEvent) => {
		const btn = event.target as HTMLButtonElement;
		btn.blur();
		restartTest();
	};

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
		<>
			<Navbar />
			<main className="flex flex-col gap-10 py-7 justify-center items-center relative">
				<OptionsBar />
				<div className="flex items-center flex-col">
					<div className="pb-4">
						<CapsIndicator active={capsLockOn} />
					</div>

					<WordsContainer />

					<div
						className="w-11/12 pt-4 flex justify-between"
						style={{ maxWidth: '60rem' }}
					>
						<TestTimer time={time} />

						<button
							onClick={e => restartHandler(e)}
							className={`btn btn-solid-primary font-bold flex-wrap ${
								typingState !== TypingState.STARTED
									? 'hidden'
									: ''
							}`}
						>
							Reiniciar
						</button>
					</div>
				</div>

				<ResultsModal show={typingState === TypingState.FINISHED} />
			</main>
		</>
	);
}

export default App;
