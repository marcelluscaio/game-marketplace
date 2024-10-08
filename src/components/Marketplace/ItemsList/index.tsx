"use client";
import { Items } from "@/schema/items";
import styles from "./styles.module.css";
import { useContext, useEffect } from "react";
import { DashboardContext } from "../Dashboard";
type Props = { items: Items };
function ItemList({ items }: Props) {
	const context = useContext(DashboardContext);

	if (!context) {
		throw new Error("ItemList must be used within a DashboardContext Provider");
	}

	const { selectedItem, setSelectedItem, searchTerm } = context;

	useEffect(
		() =>
			setSelectedItem({
				id: items[0].id,
				name: items[0].name,
				itemTypeId: items[0].itemTypeId,
			}),
		[]
	);

	return (
		<section className={styles.itemSection}>
			<h2 className={styles.title}>Items:</h2>
			<ul className={styles.itemList}>
				{items
					.filter((item) => item.name.includes(searchTerm))
					.map((item) => (
						<li key={item.id}>
							<button
								className={styles.item}
								onClick={() =>
									setSelectedItem({
										id: item.id,
										name: item.name,
										itemTypeId: item.itemTypeId,
									})
								}
								disabled={selectedItem?.itemTypeId === item.itemTypeId}
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
