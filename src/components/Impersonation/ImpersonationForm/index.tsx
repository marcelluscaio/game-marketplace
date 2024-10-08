"use client";
import { FormEvent, useState } from "react";
import { Player, Players } from "@/schema/players";
import styles from "./styles.module.css";
import { Button } from "@/components/Global/Button";

type FormData = Player["id"];
type Props = {
	players: Players;
	formAction: (data: FormData) => Promise<void>;
};

function ImpersonationForm({ players, formAction }: Props) {
	const [player, setPlayer] = useState<FormData>("");

	const onSubmit = async (formEvent: FormEvent<HTMLFormElement>) => {
		formEvent.preventDefault();
		//validation
		if (player.length > 0) {
			formAction(player);
		}
	};
	return (
		<form onSubmit={onSubmit}>
			<select
				className={styles.select}
				value={player}
				onChange={(e) => setPlayer(e.target.value)}
			>
				<option value={0}>-- Select Player --</option>
				{players.map((player) => (
					<option
						key={player.id}
						value={player.id}
					>
						{player.nickname}
					</option>
				))}
			</select>
			<Button text="Impersonate" />
		</form>
	);
}

export { ImpersonationForm };
