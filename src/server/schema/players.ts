import { z } from "zod";

const Player = z.object({
	id: z.number(),
	nickname: z.string().min(2),
	gold: z.number(),
});

const Players = z.array(Player);

type PlayersType = z.infer<typeof Players>;

export type { PlayersType };
