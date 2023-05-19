import { timeToTimerFormat } from '../helpers/ui';
import { useTypingTestStore } from '../store/typingTestStore';

interface Props {
	show: boolean;
}

export const ResultsModal = ({ show }: Props) => {
	const { testResult, errors, time, words, restartTest } =
		useTypingTestStore();

	return (
		<div className={`modal w-screen opacity-100 ${show ? 'visible' : ''}`}>
			<div className="modal-content opacity-100 flex flex-col gap-12 max-w-3xl">
				<h2 className="text-4xl text-center font-bold">Resultados</h2>

				<div className="flex flex-col gap-0 flex-wrap px-16">
					<div className="flex flex-col items-center justify-center gap-4">
						<span className="text-3xl font-bold">WPM</span>
						<span className="badge badge-flat-success text-5xl p-4 rounded-3xl">
							{Math.round(testResult.wpm)}
						</span>
					</div>

					<div className="divider my-6"></div>

					<div className="flex flex-col gap-6">
						<div className="flex gap-4 text-2xl items-center">
							<span className="font-bold">Palabras:</span>

							<div className="flex gap-3 text-2xl items-center">
								<span className="badge badge-flat-success text-2xl p-2">
									{testResult.correctWords}
								</span>
								/
								<span className="badge badge-flat-error text-2xl p-2">
									{words.filter(word =>
										word.every(
											letter =>
												letter.evaluated ||
												letter.char === ' '
										)
									).length - testResult.correctWords}
								</span>
							</div>
						</div>
						<div className="flex gap-4 items-center">
							<span className="text-2xl font-bold">Tiempo:</span>
							<span className="badge badge-flat-default badge-xl">
								{timeToTimerFormat(time)}
							</span>
						</div>
						<div className="flex gap-4 items-center">
							<span className="text-2xl font-bold">Errores:</span>
							<span className="badge badge-flat-error badge-xl">
								{errors}
							</span>
						</div>
					</div>
				</div>

				<div className="flex gap-3">
					<button
						onClick={() => restartTest()}
						className="btn btn-solid-primary btn-block btn-lg"
					>
						Reiniciar
					</button>
				</div>
			</div>
		</div>
	);
};
