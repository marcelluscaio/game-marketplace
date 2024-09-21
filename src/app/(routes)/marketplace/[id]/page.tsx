type Props = {
	params: {
		id: number;
	};
};

export default async function Marketplace({ params: { id } }: Props) {
	return (
		<div>
			<div>{id}</div>
		</div>
	);
}
