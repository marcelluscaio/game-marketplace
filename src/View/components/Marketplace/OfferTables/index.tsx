"use client";
import { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../Dashboard";
import styles from "./styles.module.css";
import type { OfferFromDb } from "@/server/schema/offer";
import type { Item } from "@/server/schema/items";

type Props = {
	initialOffers: OfferFromDb[];
	getOffers: (id: Item["itemTypeId"]) => Promise<OfferFromDb[]>;
};

function OfferTables({ initialOffers, getOffers }: Props) {
	const context = useContext(DashboardContext);

	if (!context) {
		throw new Error("ItemList must be used within a DashboardContext Provider");
	}
	const { selectedItem } = context;

	const [offers, setOffers] = useState(initialOffers);
	useEffect(() => {
		async function get() {
			if (selectedItem) {
				const newOffers = await getOffers(selectedItem);
				setOffers(newOffers);
			}
		}

		get();
	}, [selectedItem]);

	const sellOffers = offers.filter((offer) => offer.offerType === "SELL");
	const buyOffers = offers.filter((offer) => offer.offerType === "BUY");

	return (
		<section>
			<div>
				<h2 className={styles.title}>Sell Offers:</h2>
				<table>
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
								<td>{offer.endDate.toLocaleString()}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div>
				<h2 className={styles.title}>Buy Offers:</h2>
				<table>
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
								<td>{offer.endDate.toLocaleString()}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
}

export { OfferTables };
