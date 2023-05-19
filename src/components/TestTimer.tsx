import { timeToTimerFormat } from '../helpers/ui';
import { TestMode, TypingState } from '../store/enums';
import { useTypingTestStore } from '../store/typingTestStore';

interface Props {
	time: number;
}

export const TestTimer = ({ time }: Props) => {
	const { testMode, typingState } = useTypingTestStore();

	return (
		<kbd
			className={`kbd text-lg ${
				testMode !== TestMode.TIME ? 'invisible' : ''
			}`}
		>
			{timeToTimerFormat(typingState === TypingState.PENDING ? 0 : time)}
		</kbd>
	);
};
