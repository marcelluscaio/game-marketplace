import { PlayersType } from "@/server/schema/players";
import styles from "./styles.module.css";
import { Button } from "@/View/components/Button";

type Props = {
	players: PlayersType;
};

function ImpersonationForm({ players }: Props) {
	return (
		<form>
			<select className={styles.select}>
				<option value="">-- Select Player --</option>
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
