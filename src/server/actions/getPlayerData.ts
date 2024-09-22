import { db } from "@/server/db/db";
import { Player } from "../schema/players";

export async function getPlayerData(id: Player["id"]) {
	try {
		const player = await db.player.findUnique({
			where: {
				id,
			},
			include: {
				items: {
					select: {
						id: true,
						quantity: true,
						item: {
							select: {
								name: true,
							},
						},
					},
				},
			},
		});
		if (player === null) {
			throw new Error("Player not found the database");
		}
		const flattenedItems = player.items.map((item) => {
			const {
				item: { name },
				...rest
			} = item;
			return { ...rest, name };
		});
		const modifiedPlayer = { ...player, items: flattenedItems };
		return { success: true, player: modifiedPlayer };
	} catch (error) {
		console.log(error);
		return { success: false, player: { gold: 0, nickname: "Not found", items: [] } };
	}
}
