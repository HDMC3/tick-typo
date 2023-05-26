import { useTypingTestStore } from '../store/typingTestStore';
import { Word } from './Word';
import './WordsContainer.css';

export const WordsContainer = () => {
	const { words } = useTypingTestStore();

	return (
		<div id="words-container" className="w-11/12 overflow-hidden relative">
			<div id="words" className="relative flex flex-wrap select-none">
				{words.map((word, i) => {
					return <Word key={i} testLetters={word} />;
				})}
			</div>
		</div>
	);
};
