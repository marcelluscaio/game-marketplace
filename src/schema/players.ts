import { z } from "zod";

const PlayerSchema = z.object({
	id: z.string(),
	nickname: z.string().min(2),
	gold: z.number(),
});

//TODO aply validation later
PlayerSchema.safeParse({ name: "Test" });

type Player = z.infer<typeof PlayerSchema>;

type Players = Player[];

export type { Player, Players };
