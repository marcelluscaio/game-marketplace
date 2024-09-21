import styles from "./styles.module.css";
import { ImpersonationForm } from "@/View/components/ImpersonationForm";
import { getAllPlayers } from "@/server/actions/getAllPlayers";
import { login } from "@/server/actions/login";

async function Impersonation() {
	const players = await getAllPlayers();
	return (
		<main className={styles.container}>
			<h1 className={styles.title}>Player to Impersonate</h1>
			<ImpersonationForm
				players={players}
				formAction={login}
			/>
		</main>
	);
}

export { Impersonation };
