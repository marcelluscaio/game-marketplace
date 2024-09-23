import { db } from "@/server/db/db";
import { Item } from "../schema/items";

export async function getOffers(id: Item["itemTypeId"]) {
	const offers = await db.offer.findMany({
		where: {
			itemTypeId: id,
		},
	});

	return offers;
}
