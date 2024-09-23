import { db } from "@/server/db/db";
import { Player } from "../schema/players";

export async function getPlayerData(id: Player["id"]) {
	//TODO implementar a mesma estrategia que na outra action, com discriminated union
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
								id: true,
							},
						},
					},
					orderBy: {
						item: {
							name: "asc",
						},
					},
				},
			},
		});
		if (player === null) {
			throw new Error("Player not found in the database");
		}
		const flattenedItems = player.items.map((item) => {
			const {
				item: { name, id },
				...rest
			} = item;
			return { ...rest, name, itemTypeId: id };
		});

		const modifiedPlayer = { ...player, items: flattenedItems };
		return { success: true, player: modifiedPlayer };
	} catch (error) {
		console.log(error);
		return { success: false, player: { gold: 0, nickname: "Not found", items: [] } };
	}
}
