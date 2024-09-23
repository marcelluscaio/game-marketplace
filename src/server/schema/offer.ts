import { z } from "zod";

const OFFER_TYPE = ["BUY", "SELL"] as const;

const OfferSchema = z.object({
	offerType: z.enum(OFFER_TYPE, { message: "Choose one of the two options" }),
	quantity: z.number().min(1, { message: "Quantity should be a positive number" }),
	pricePerUnit: z.number(),
	endDate: z
		.union([z.date(), z.string()])
		.refine((val) => val !== "" && val !== "Invalid Date", {
			message: "End date should be defined",
		}),
});

//TODO itemId deve vir de um tipo a partir de um schema
type Offer = z.infer<typeof OfferSchema> & { itemId: number; itemTypeId: number };

type OfferFromDb = Offer & { id: number };

export type { Offer, OfferFromDb };
export { OfferSchema };
