import { db } from "@/server/db/db";

export async function getOffers(itemId: string) {
	try {
		/* 
    db.offer.findMany({
      where: {itemId}
    }) */
		// const player = await db.player.findUnique({
		// 	where: {
		// 		id,
		// 	},
		// 	include: {
		// 		items: {
		// 			select: {
		// 				id: true,
		// 				quantity: true,
		// 				item: {
		// 					select: {
		// 						name: true,
		// 					},
		// 				},
		// 			},
		// 			orderBy: {
		// 				item: {
		// 					name: "asc",
		// 				},
		// 			},
		// 		},
		// 	},
		// });
		// if (player === null) {
		// 	throw new Error("Player not found the database");
		// }
		// const flattenedItems = player.items.map((item) => {
		// 	const {
		// 		item: { name },
		// 		...rest
		// 	} = item;
		// 	return { ...rest, name };
		// });
		// const modifiedPlayer = { ...player, items: flattenedItems };
		// return { success: true, player: modifiedPlayer };
	} catch (error) {
		console.log(error);
		// return { success: false, player: { gold: 0, nickname: "Not found", items: [] } };
	}
}
