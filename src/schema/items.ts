import { z } from "zod";

const ItemSchema = z.object({
	name: z.string(),
	itemTypeId: z.number(),
	id: z.number(),
	quantity: z.number(),
});

//TODO aply validation later
ItemSchema.safeParse({ name: "Test" });

type Item = z.infer<typeof ItemSchema>;

type Items = Item[];

export type { Item, Items };
