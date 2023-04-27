import { type TestLetter } from '../store/types';
import { Letter } from './Letter';

interface Props {
	testLetters: TestLetter[];
}

export const Word = ({ testLetters }: Props) => {
	return (
		<div className="flex flex-nowrap">
			{testLetters.map((testLetter, i) => (
				<Letter key={i} testLetter={testLetter} />
			))}
		</div>
	);
};
