import { useEffect } from 'react';
import { WordsContainer } from './components/WordsContainer';
import { useTypingTestStore } from './store/typingTestStore';
import { INVALID_KEYS } from './helpers/constants';
import './App.css';
import { OptionsBar } from './components/OptionsBar';

function App() {
	const { setText, checkLetter, markAccent, deleteLetter } =
		useTypingTestStore();
	useEffect(() => {
		setText(
			[
				'El cielo está despejado y el sol brilla intensamente.',
				'Los pájaros cantan alegremente en los árboles.',
				'El aroma del café recién hecho me despierta por las mañanas.',
				'La lluvia cae suavemente sobre el techo de mi casa.',
				'Los niños juegan en el parque y se divierten mucho.',
				'El olor de las flores en el jardín es embriagador.',
				'El viento sopla fuerte y hace que las hojas se muevan en el suelo.',
				'La nieve cubre todo el paisaje y crea un ambiente mágico.',
				'El fuego crepita en la chimenea, brindando calor y comodidad.',
				'El perfume de mi perfume favorito me hace sentir elegante y sofisticado.',
				'El sonido de las olas rompiendo en la playa es relajante y tranquilizador.',
			].join(' ')
		);
	}, []);

	useEffect(() => {
		const handleKeyUp = (event: KeyboardEvent) => {
			if (INVALID_KEYS.includes(event.key)) return;

			if (event.key === 'Backspace') {
				deleteLetter();
				return;
			}

			if (event.key === 'Dead') {
				markAccent();
				return;
			}

			checkLetter(event.key);
		};

		addEventListener('keyup', handleKeyUp);

		return () => {
			removeEventListener('keyup', handleKeyUp);
		};
	});

	return (
		<div>
			<main className="flex flex-col gap-6 py-7 justify-center items-center relative">
				<OptionsBar />
				<WordsContainer />
			</main>
		</div>
	);
}

export default App;
