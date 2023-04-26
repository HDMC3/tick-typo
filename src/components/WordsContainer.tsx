import { useTypingTestStore } from '../store/typingTestStore';
import { Word } from './Word';

export const WordsContainer = () => {
	const { words } = useTypingTestStore();

	return (
		<div
			className="w-11/12 border border-black relative flex flex-wrap"
			style={{ maxWidth: '80ch' }}
		>
			{words.map((word, i) => {
				return <Word key={i} testLetters={word} />;
			})}
		</div>
	);
};
