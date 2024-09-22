import { db } from "@/server/db/db";

export async function getAllPlayers() {
	const players = await db.player.findMany({
		orderBy: {
			nickname: "asc",
		},
	});
	return players;
}
