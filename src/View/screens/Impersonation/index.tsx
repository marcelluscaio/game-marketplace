import { ImpersonationForm } from "@/View/components/ImpersonationForm";
import styles from "./styles.module.css";
import { getAllPlayers } from "@/server/actions/getAllPlayers";

async function Impersonation() {
	const players = await getAllPlayers();
	return (
		<main className={styles.container}>
			<h1 className={styles.title}>Player to Impersonate</h1>
			<ImpersonationForm players={players} />
		</main>
	);
}

export { Impersonation };
