import { z } from "zod";

const ItemSchema = z.object({
	name: z.string(),
	itemTypeId: z.number(),
	id: z.number(),
	quantity: z.number(),
});

type Item = z.infer<typeof ItemSchema>;

type Items = Item[];

export type { Items };
