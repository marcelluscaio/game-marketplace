import { z } from "zod";

const PlayerSchema = z.object({
	id: z.number(),
	nickname: z.string().min(2),
	gold: z.number(),
});

type Player = z.infer<typeof PlayerSchema>;

type Players = Player[];

export type { Player, Players };
