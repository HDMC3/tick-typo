interface Props {
	active: boolean;
}

export const CapsIndicator = ({ active }: Props) => {
	return (
		<span
			className={`badge badge-lg px-3 py-4 badge-outline-error gap-4 rounded-md ${
				!active ? 'invisible' : ''
			}`}
		>
			<span className={`dot dot-error`}></span>
			Caps Lock
		</span>
	);
};
