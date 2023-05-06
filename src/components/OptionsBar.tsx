import { TestMode, TestModeOption } from '../store/enums';
import { useTypingTestStore } from '../store/typingTestStore';

interface TestModeButtonProps {
	mode: TestMode;
	text: string;
}
const TestModeButton = ({ mode, text }: TestModeButtonProps) => {
	const { testMode, setTestMode } = useTypingTestStore();
	return (
		<button
			onClick={() => setTestMode(mode)}
			className={`btn btn-sm btn-solid-success ${
				testMode === mode ? 'underline font-bold' : ''
			}`}
		>
			{text}
		</button>
	);
};

interface TestModeOptionButtonProps {
	mode: TestModeOption;
	text: string;
}
const TestModeOptionButton = ({ mode, text }: TestModeOptionButtonProps) => {
	const { testModeOption, setTestModeOption } = useTypingTestStore();
	return (
		<button
			onClick={() => setTestModeOption(mode)}
			className={`btn btn-sm btn-solid-warning ${
				testModeOption === mode ? 'underline font-bold' : ''
			}`}
		>
			{text}
		</button>
	);
};

export const OptionsBar = () => {
	const { testMode } = useTypingTestStore();

	return (
		<div className="flex flex-wrap justify-center p-3 gap-1 bg-backgroundSecondary rounded-xl">
			<div className="flex gap-2">
				<TestModeButton mode={TestMode.WORDS} text="Palabras" />
				<TestModeButton mode={TestMode.TEXT} text="Texto" />
				<TestModeButton mode={TestMode.TIME} text="Tiempo" />
			</div>

			<div className="divider divider-vertical h-8"></div>

			<div
				id="text-options"
				className={`gap-2 ${
					testMode === TestMode.WORDS ? 'flex' : 'hidden'
				}`}
			>
				<TestModeOptionButton
					text="25p"
					mode={TestModeOption.WORDS_25}
				/>
				<TestModeOptionButton
					text="50p"
					mode={TestModeOption.WORDS_50}
				/>
				<TestModeOptionButton
					text="100p"
					mode={TestModeOption.WORDS_100}
				/>
			</div>

			<div
				id="words-options"
				className={`gap-2 ${
					testMode === TestMode.TEXT ? 'flex' : 'hidden'
				}`}
			>
				<TestModeOptionButton
					text="Corto"
					mode={TestModeOption.TEXT_SHORT}
				/>
				<TestModeOptionButton
					text="Medio"
					mode={TestModeOption.TEXT_MEDIUM}
				/>
				<TestModeOptionButton
					text="Largo"
					mode={TestModeOption.TEXT_LONG}
				/>
			</div>

			<div
				id="time-options"
				className={`gap-2 ${
					testMode === TestMode.TIME ? 'flex' : 'hidden'
				}`}
			>
				<TestModeOptionButton
					text="30s"
					mode={TestModeOption.TIME_30}
				/>
				<TestModeOptionButton
					text="60s"
					mode={TestModeOption.TIME_60}
				/>
				<TestModeOptionButton
					text="120s"
					mode={TestModeOption.TIME_120}
				/>
			</div>
		</div>
	);
};
