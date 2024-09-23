import { db } from "@/server/db/db";
import { Player } from "../schema/players";

export async function decreasePlayerGold({ id, gold }: Pick<Player, "id" | "gold">) {
	"use server";
	await db.player.update({
		where: {
			id,
		},
		data: {
			gold: {
				decrement: gold,
			},
		},
	});
}
