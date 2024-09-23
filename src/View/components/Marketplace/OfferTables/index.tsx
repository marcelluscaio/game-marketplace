"use client";
import { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../Dashboard";
import styles from "./styles.module.css";
import type { OfferFromDb } from "@/server/schema/offer";
import type { Item } from "@/server/schema/items";
import { formatDate } from "../Modal";

type Props = {
	initialOffers: OfferFromDb[];
	getOffers: (id: Item["itemTypeId"]) => Promise<OfferFromDb[]>;
};

function OfferTables({ initialOffers, getOffers }: Props) {
	const context = useContext(DashboardContext);

	if (!context) {
		throw new Error("Component must be used within a DashboardContext Provider");
	}
	const { selectedItem, newItem, setNewItem } = context;

	const [offers, setOffers] = useState(initialOffers);
	useEffect(() => {
		async function get() {
			if (selectedItem) {
				const newOffers = await getOffers(selectedItem.itemTypeId);
				setOffers(newOffers);
			}
		}

		get();
	}, [selectedItem]);

	useEffect(() => {
		async function get() {
			if (selectedItem && newItem) {
				const newOffers = await getOffers(selectedItem.itemTypeId);
				setOffers(newOffers);
				setNewItem(false);
			}
		}

		get();
	}, [newItem]);

	const sellOffers = offers.filter((offer) => offer.offerType === "SELL");
	const buyOffers = offers.filter((offer) => offer.offerType === "BUY");

	return (
		<section className={styles.tablesContainer}>
			<div>
				<h2 className={styles.title}>Sell Offers:</h2>
				{sellOffers.length > 0 ? (
					<table className={styles.table}>
						<thead>
							<tr>
								<th>Name</th>
								<th>Amount</th>
								<th>Price Per Unit</th>
								<th>Total Price</th>
								<th>Ends At</th>
							</tr>
						</thead>
						<tbody>
							{sellOffers.map((offer) => (
								<tr key={offer.id}>
									<td>{offer.owner}</td>
									<td>{offer.quantity}</td>
									<td>{offer.pricePerUnit}</td>
									<td>{offer.totalPrice}</td>
									<td>{formatDate(new Date(offer.endDate))}</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<p>No offers found</p>
				)}
			</div>
			<div>
				<h2 className={styles.title}>Buy Offers:</h2>
				{buyOffers.length > 0 ? (
					<table className={styles.table}>
						<thead>
							<tr>
								<th>Name</th>
								<th>Amount</th>
								<th>Price Per Unit</th>
								<th>Total Price</th>
								<th>Ends At</th>
							</tr>
						</thead>
						<tbody>
							{buyOffers.map((offer) => (
								<tr key={offer.id}>
									<td>{offer.owner}</td>
									<td>{offer.quantity}</td>
									<td>{offer.pricePerUnit}</td>
									<td>{offer.totalPrice}</td>
									<td>{formatDate(new Date(offer.endDate))}</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<p>No offers found</p>
				)}
			</div>
		</section>
	);
}

export { OfferTables };
