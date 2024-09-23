"use client";
import { Items } from "@/server/schema/items";
import styles from "./styles.module.css";
import { useContext } from "react";
import { DashboardContext } from "../Dashboard";
type Props = { items: Items };
function ItemList({ items }: Props) {
	const context = useContext(DashboardContext);

	if (!context) {
		throw new Error("ItemList must be used within a DashboardContext Provider");
	}

	return (
		<section className={styles.itemSection}>
			<h2 className={styles.title}>Items:</h2>
			<ul className={styles.itemList}>
				{items.map((item) => (
					<li
						key={item.id}
						className={styles.item}
					>
						<button onClick={() => context.setSelectedItem(item.itemTypeId)}>
							{item.quantity} x {item.name}
						</button>
					</li>
				))}
			</ul>
		</section>
	);
}

export { ItemList };
