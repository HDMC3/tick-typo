import { type TestLetter } from '../store/types';
import './Letter.css';

interface Props {
	testLetter: TestLetter;
}

export const Letter = ({ testLetter }: Props) => {
	const cursor = testLetter.active ? 'animate-cursor' : '';
	const bgColor =
		testLetter.evaluated && !testLetter.correct ? 'bg-red-4' : '';
	const textColor = !testLetter.evaluated
		? 'text-slate-9'
		: !testLetter.correct
		? 'text-red-10'
		: 'text-content1';
	const letterClass = `font-mono text-2xl ${cursor} ${textColor} ${bgColor}`;
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
