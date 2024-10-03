import { db } from "@/server/db/db";
import { type Offer, OfferSchema } from "../schema/offer";
import { decreasePlayerGold } from "./decreasePlayerGold";

type Success = { status: "success"; offer: Offer };
type Error = { status: "error"; message: string };
type ActionReturn = Success | Error;

async function createOffer(offerData: Offer): Promise<ActionReturn> {
	"use server";
	try {
		const validatedData = OfferSchema.safeParse(offerData);
		//TODO provide better validation and error message
		const totalValidation =
			offerData.totalPrice === offerData.quantity * offerData.pricePerUnit;

		if (validatedData.success && totalValidation) {
			const offer = await db.offer.create({
				data: offerData,
			});
			if (offerData.offerType === "BUY") {
				const item = await db.itemInstance.findUnique({
					where: { id: offerData.itemId },
				});
				if (item) {
					await decreasePlayerGold({ id: item?.ownerId, gold: offerData.totalPrice });
				}
				//TODO Rollback in case of error
			}
			return { status: "success", offer };
		} else {
			throw new Error("Invalid data", validatedData.error);
		}
	} catch (error) {
		console.log(error);
		return { status: "error", message: "Something went wrong. Please, try again" };
	}
}

//TODO usar o revalidate
export { createOffer };
export type { ActionReturn };
