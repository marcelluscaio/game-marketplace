import { getAllPlayers } from "@/server/actions/getAllPlayers";

export default async function Home() {
	const players = await getAllPlayers();
	console.log(players);
	return <div></div>;
}
