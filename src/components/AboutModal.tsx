import { type MouseEvent } from 'react';

interface Props {
	open: boolean;
	onClose: () => void;
}

export const AboutModal = ({ open, onClose }: Props) => {
	const closeBackdropHandler = (e: MouseEvent) => {
		const element = e.target as HTMLDivElement;
		if (element.classList.contains('modal')) {
			onClose();
		}
	};
	return (
		<div
			className={`modal w-screen opacity-100 ${open ? 'visible' : ''}`}
			onClick={closeBackdropHandler}
		>
			<div className="modal-content opacity-100 flex flex-col gap-6 max-w-3xl pb-12 pt-8 z-[70]">
				<button
					className="btn btn-sm btn-circle btn-ghost absolute right-4 top-3 text-lg"
					onClick={() => onClose()}
				>
					✕
				</button>

				<p className="font-bold text-3xl text-center m-0">Hola ✌</p>

				<p className="text-xl px-9 text-center m-0">
					Tyck-Typo es un pequeño proyecto creado para realizar
					sencillos tests de velocidad de escritura con el teclado.
					Las pruebas son en español, y las palabras utilizadas (solo
					en modos “Palabras” y “Tiempo”) se obtienen de{' '}
					<a
						className="text-primary hover:underline"
						target="_blank"
						rel="noopener noreferrer"
						href="https://corpus.rae.es/frec/10000_formas.TXT"
					>
						aqui
					</a>
					. Para el resultado no se usa un cálculo complejo o un gran
					análisis de información 🤓, es una simple división entre las
					palabras acertadas y el tiempo transcurrido 😅, asi que
					tenlo en cuenta 😁.
				</p>
			</div>
		</div>
	);
};
