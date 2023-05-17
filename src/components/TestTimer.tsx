import { timeToMinutes, timeToSeconds } from '../helpers/ui';
import { TestMode } from '../store/enums';
import { useTypingTestStore } from '../store/typingTestStore';

interface Props {
	time: number;
}

export const TestTimer = ({ time }: Props) => {
	const { testMode } = useTypingTestStore();

	return (
		<kbd
			className={`kbd text-lg ${
				testMode !== TestMode.TIME ? 'invisible' : ''
			}`}
		>
			{timeToMinutes(time)}:{timeToSeconds(time)}
		</kbd>
	);
};
