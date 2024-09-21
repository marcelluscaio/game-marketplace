type Props = {
	params: {
		id: number;
	};
};

export default async function Marketplace({ params: { id } }: Props) {
	return (
		<main>
			<h1 className={"visually-hidden"}>Marketplace</h1>
			<div>{id}</div>
		</main>
	);
}
