import { useState } from 'react';

export const OptionsBar = () => {
	const [testType, setTestType] = useState(0);

	const testTypeSelectionHandler = (newType: number) => {
		setTestType(newType);
	};

	return (
		<div className="flex flex-wrap justify-center p-3 gap-1 bg-backgroundSecondary rounded-xl">
			<div className="flex gap-2">
				<button
					onClick={() => testTypeSelectionHandler(0)}
					className={`btn btn-sm btn-solid-success ${
						testType === 0 ? 'underline font-bold' : ''
					}`}
				>
					Palabras
				</button>
				<button
					onClick={() => testTypeSelectionHandler(1)}
					className={`btn btn-sm btn-solid-success ${
						testType === 1 ? 'underline font-bold' : ''
					}`}
				>
					Texto
				</button>
				<button
					onClick={() => testTypeSelectionHandler(2)}
					className={`btn btn-sm btn-solid-success ${
						testType === 2 ? 'underline font-bold' : ''
					}`}
				>
					Tiempo
				</button>
			</div>

			<div className="divider divider-vertical h-8"></div>

			<div
				id="text-options"
				className={`gap-2 ${testType === 0 ? 'flex' : 'hidden'}`}
			>
				<button className="btn btn-sm btn-solid-warning">25p</button>
				<button className="btn btn-sm btn-solid-warning">50p</button>
				<button className="btn btn-sm btn-solid-warning">100p</button>
			</div>

			<div
				id="words-options"
				className={`gap-2 ${testType === 1 ? 'flex' : 'hidden'}`}
			>
				<button className="btn btn-sm btn-solid-warning">Corto</button>
				<button className="btn btn-sm btn-solid-warning">Medio</button>
				<button className="btn btn-sm btn-solid-warning">Largo</button>
			</div>

			<div
				id="time-options"
				className={`gap-2 ${testType === 2 ? 'flex' : 'hidden'}`}
			>
				<button className="btn btn-sm btn-solid-warning">30s</button>
				<button className="btn btn-sm btn-solid-warning">60s</button>
				<button className="btn btn-sm btn-solid-warning">120s</button>
			</div>
		</div>
	);
};
