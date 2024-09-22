import { db } from "@/server/db/db";
import { Player } from "../schema/players";

export async function getPlayerData(id: Player["id"]) {
	try {
		const player = await db.player.findUnique({
			where: {
				id,
			},
			include: {
				inventory: {
					select: {
						items: {
							include: {
								item: {
									select: {
										name: true,
									},
								},
							},
						},
					},
				},
			},
		});
		if (player === null) {
			throw new Error("Player not found the database");
		}
		return { success: true, player };
	} catch (error) {
		console.log(error);
		return { success: false, player: { gold: 0, nickname: "Not found" } };
	}
}
