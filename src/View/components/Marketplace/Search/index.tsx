"use client";
import { useContext } from "react";
import styles from "./styles.module.css";
import { DashboardContext } from "../Dashboard";

function Search() {
	const context = useContext(DashboardContext);
	if (!context) {
		throw new Error("Component must be used within a DashboardContext Provider");
	}
	const { searchTerm, setSearchTerm } = context;

	return (
		<section className={styles.searchSection}>
			<h2 className={styles.title}>Search:</h2>
			<form>
				<input
					className={styles.search}
					type="text"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</form>
		</section>
	);
}

export { Search };
