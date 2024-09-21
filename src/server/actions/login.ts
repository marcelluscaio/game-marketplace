import { redirect } from "next/navigation";
import type { Player } from "../schema/players";

export async function login(data: Player["id"]) {
	"use server";
	redirect(`/marketplace/${data}`);
}
