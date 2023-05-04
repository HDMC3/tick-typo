import { TestType, TestTypeOption } from '../store/enums';
import { useTypingTestStore } from '../store/typingTestStore';

interface TestTypeButtonProps {
	type: TestType;
	text: string;
}
const TestTypeButton = ({ type, text }: TestTypeButtonProps) => {
	const { testType, setTestType } = useTypingTestStore();
	return (
		<button
			onClick={() => setTestType(type)}
			className={`btn btn-sm btn-solid-success ${
				testType === type ? 'underline font-bold' : ''
			}`}
		>
			{text}
		</button>
	);
};

interface TestTypeOptionButtonProps {
	type: TestTypeOption;
	text: string;
}
const TestTypeOptionButton = ({ type, text }: TestTypeOptionButtonProps) => {
	const { testTypeOption, setTestTypeOption } = useTypingTestStore();
	return (
		<button
			onClick={() => setTestTypeOption(type)}
			className={`btn btn-sm btn-solid-warning ${
				testTypeOption === type ? 'underline font-bold' : ''
			}`}
		>
			{text}
		</button>
	);
};

export const OptionsBar = () => {
	const { testType } = useTypingTestStore();

	return (
		<div className="flex flex-wrap justify-center p-3 gap-1 bg-backgroundSecondary rounded-xl">
			<div className="flex gap-2">
				<TestTypeButton type={TestType.WORDS} text="Palabras" />
				<TestTypeButton type={TestType.TEXT} text="Texto" />
				<TestTypeButton type={TestType.TIME} text="Tiempo" />
			</div>

			<div className="divider divider-vertical h-8"></div>

			<div
				id="text-options"
				className={`gap-2 ${
					testType === TestType.WORDS ? 'flex' : 'hidden'
				}`}
			>
				<TestTypeOptionButton
					text="25p"
					type={TestTypeOption.WORDS_25}
				/>
				<TestTypeOptionButton
					text="50p"
					type={TestTypeOption.WORDS_50}
				/>
				<TestTypeOptionButton
					text="100p"
					type={TestTypeOption.WORDS_100}
				/>
			</div>

			<div
				id="words-options"
				className={`gap-2 ${
					testType === TestType.TEXT ? 'flex' : 'hidden'
				}`}
			>
				<TestTypeOptionButton
					text="Corto"
					type={TestTypeOption.TEXT_SHORT}
				/>
				<TestTypeOptionButton
					text="Medio"
					type={TestTypeOption.TEXT_MEDIUM}
				/>
				<TestTypeOptionButton
					text="Largo"
					type={TestTypeOption.TEXT_LONG}
				/>
			</div>

			<div
				id="time-options"
				className={`gap-2 ${
					testType === TestType.TIME ? 'flex' : 'hidden'
				}`}
			>
				<TestTypeOptionButton
					text="30s"
					type={TestTypeOption.TIME_30}
				/>
				<TestTypeOptionButton
					text="60s"
					type={TestTypeOption.TIME_60}
				/>
				<TestTypeOptionButton
					text="120s"
					type={TestTypeOption.TIME_120}
				/>
			</div>
		</div>
	);
};
