import { type TestLetter } from '../store/types';

interface Props {
	testLetter: TestLetter;
}

export const Letter = ({ testLetter }: Props) => {
	const letterClass = `text-slate-9 font-mono text-2xl ${
		!testLetter.correct ? 'text-red-10' : 'text-green-10'
	}`;
	return (
		<>
			{testLetter.char === ' ' ? (
				<span className={letterClass}>&nbsp;</span>
			) : (
				<span className={letterClass}>{testLetter.char}</span>
			)}
		</>
	);
};
