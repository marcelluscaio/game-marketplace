"use client";
import { useContext } from "react";
import { DashboardContext } from "../Dashboard";
import styles from "./styles.module.css";

function OfferTables() {
	const context = useContext(DashboardContext);

	if (!context) {
		throw new Error("ItemList must be used within a DashboardContext Provider");
	}

	const { selectedItem } = context;

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
					<tbody></tbody>
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
					<tbody></tbody>
				</table>
			</div>
		</section>
	);
}

export { OfferTables };
