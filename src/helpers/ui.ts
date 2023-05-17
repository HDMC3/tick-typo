export function setWordsContainerPosittion() {
	const activeLetter = document.querySelector<HTMLElement>('.animate-cursor');
	const words = document.querySelector<HTMLElement>('#words');

	if (activeLetter == null || words == null) return;

	const rect = activeLetter.getBoundingClientRect();

	if (words.clientHeight - activeLetter.offsetTop <= rect.height) return;
	words.style.transform = `translateY(${
		-activeLetter.offsetTop +
		(activeLetter.offsetTop === 0 ? 0 : rect.height)
	}px)`;
}

export function timeToMinutes(time: number) {
	const minutes = Math.floor(time / 60);
	return minutes < 10 ? `0${minutes}` : minutes;
}

export function timeToSeconds(time: number) {
	const seconds = Math.round(time % 60);
	return seconds < 10 ? `0${seconds}` : seconds;
}