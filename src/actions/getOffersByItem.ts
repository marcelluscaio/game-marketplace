import { db } from "@/db/db";
import { Item } from "../../schema/items";

export async function getOffers(id: Item["itemTypeId"]) {
	"use server";
	const offers = await db.offer.findMany({
		where: {
			itemTypeId: id,
		},
		include: {
			item: {
				select: {
					owner: true,
				},
			},
		},
	});

	const offersWithOwner = offers.map((offer) => {
		const { item, ...rest } = offer;
		return { ...rest, owner: item.owner.nickname };
	});

	return offersWithOwner;
}
