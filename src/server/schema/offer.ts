import { z } from "zod";

const OFFER_TYPE = ["BUY", "SELL"] as const;

const OfferSchema = z.object({
	pricePerUnit: z.coerce
		.number()
		.min(1, { message: "Price should be a positive number" }),
	quantity: z.coerce.number().min(1, { message: "Quantity should be a positive number" }),
	offerType: z.enum(OFFER_TYPE, { message: "Choose one of the two options" }),
	endDate: z.string().min(1, { message: "Date should be filled" }).date(),
});

type OfferForm = z.infer<typeof OfferSchema>;

//TODO itemId deve vir de um tipo a partir de um schema
type Offer = OfferForm & {
	itemId: number;
	itemTypeId: number;
	totalPrice: number;
};

type OfferFromDb = Offer & { id: number; owner: string };

export type { OfferForm, Offer, OfferFromDb };
export { OfferSchema };
