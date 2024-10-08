import { getAllPlayers } from "@/actions/getAllPlayers";
import styles from "./styles.module.css";
import { ImpersonationForm } from "@/components/Impersonation/ImpersonationForm";
import { login } from "@/actions/login";

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
