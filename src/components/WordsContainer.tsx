import { useEffect, useState } from 'react';
import { useTypingTestStore } from '../store/typingTestStore';
import { Word } from './Word';
import './WordsContainer.css';

export const WordsContainer = () => {
	const { words } = useTypingTestStore();
	const [showAlert, setShowAlert] = useState(false);

	useEffect(() => {
		const blurHandler = () => {
			setShowAlert(true);
		};

		const focusHandler = () => {
			setShowAlert(false);
		};

		window.addEventListener('blur', blurHandler);
		window.addEventListener('focus', focusHandler);
		return () => {
			window.removeEventListener('blur', blurHandler);
			window.removeEventListener('focus', focusHandler);
		};
	}, []);

	return (
		<div id="words-container" className="w-11/12 overflow-hidden relative">
			<div
				className={`absolute flex flex-col gap-4 items-center justify-center transition-opacity duration-300 w-full h-full border-dashed border-2 border-content1/10 z-10 rounded-lg ${
					showAlert ? 'opacity-100' : 'opacity-0'
				}`}
			>
				<span className="text-xl">
					Devuelve el foco a la pagina para escribir
				</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="icon icon-tabler icon-tabler-click w-10 h-10"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M3 12l3 0" />
					<path d="M12 3l0 3" />
					<path d="M7.8 7.8l-2.2 -2.2" />
					<path d="M16.2 7.8l2.2 -2.2" />
					<path d="M7.8 16.2l-2.2 2.2" />
					<path d="M12 12l9 3l-4 2l-2 4l-3 -9" />
				</svg>
			</div>

			<div
				id="words"
				className={`relative flex flex-wrap select-none transition-opacity duration-300 ${
					showAlert ? 'opacity-0' : 'opacity-100'
				}`}
			>
				{words.map((word, i) => {
					return <Word key={i} testLetters={word} />;
				})}
			</div>
		</div>
	);
};
