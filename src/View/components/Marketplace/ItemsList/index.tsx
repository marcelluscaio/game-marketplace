"use client";
import { Items } from "@/server/schema/items";
import styles from "./styles.module.css";
import { useContext, useEffect } from "react";
import { DashboardContext } from "../Dashboard";
type Props = { items: Items };
function ItemList({ items }: Props) {
	const context = useContext(DashboardContext);

	if (!context) {
		throw new Error("ItemList must be used within a DashboardContext Provider");
	}

	const { selectedItem, setSelectedItem } = context;

	useEffect(() => setSelectedItem(items[0].itemTypeId), []);

	return (
		<section className={styles.itemSection}>
			<h2 className={styles.title}>Items:</h2>
			<ul className={styles.itemList}>
				{items.map((item) => (
					<li key={item.id}>
						<button
							className={styles.item}
							onClick={() => setSelectedItem(item.itemTypeId)}
							disabled={selectedItem === item.itemTypeId}
						>
							{item.quantity} x {item.name}
						</button>
					</li>
				))}
			</ul>
		</section>
	);
}

export { ItemList };
