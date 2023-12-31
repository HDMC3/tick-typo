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
	const { loadingWords, error, reload } = useTestTextData();
	const { capsLockOn, setDisableKeyboard } = useKeyboard();
	const { time } = useTimer();
	useTestLogic();

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

	useEffect(() => {
		setDisableKeyboard(loadingWords || error);
	}, [loadingWords, error]);

	return (
		<>
			<Navbar />
			<main className="flex flex-col gap-10 py-7 px-4 justify-center items-center relative">
				<OptionsBar />
				<div className="flex items-center flex-col">
					<div className="pb-4">
						<CapsIndicator active={capsLockOn} />
					</div>

					{loadingWords ? (
						<div className="flex items-center justify-center h-32">
							<div className="spinner-circle spinner-xl [--spinner-color:var(--slate-8)]"></div>
						</div>
					) : error ? (
						<div className="alert alert-error max-w-lg justify-center mt-10 p-8">
							<div className="flex flex-col items-center">
								<span className="text-center text-lg">
									Problema al obtener texto
								</span>
								<span className="text-content2 text-center pt-2 pb-7">
									Reinicia o recarga la pagina para intentar
									nuevamente
								</span>
								<button
									className="btn btn-error btn-sm"
									onClick={() => reload()}
								>
									Reiniciar
								</button>
							</div>
						</div>
					) : (
						<WordsContainer />
					)}

					<div
						className="w-11/12 pt-4 flex justify-between"
						style={{ maxWidth: '60rem' }}
					>
						{loadingWords ? null : <TestTimer time={time} />}

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
