import buttonStyles from "@/View/components/Button/styles.module.css";
import styles from "./styles.module.css";
import Link from "next/link";
import { Button } from "@/View/components/Button";
import { getPlayerData } from "@/server/actions/getPlayerData";

type Props = {
	params: {
		id: number;
	};
};

const ITEMS = [
	{ quantity: 3, name: "Item 1" },
	{ quantity: 30, name: "Item 2" },
	{ quantity: 300, name: "Item 3" },
];

export default async function Marketplace({ params: { id } }: Props) {
	const { /* success,  */ player } = await getPlayerData(Number(id));
	const { gold, nickname } = player;
	console.log(player.inventory.items);
	return (
		<main className={styles.container}>
			<h1 className="visually-hidden">Marketplace</h1>
			<p className={styles.greeting}>{`Hello, ${nickname}`}</p>
			<section className={styles.itemSection}>
				<h2 className={styles.title}>Items:</h2>
				<ul className={styles.itemList}>
					{ITEMS.map((item) => (
						<li
							key={item.name}
							className={styles.item}
						>
							{item.quantity} x {item.name}
						</li>
					))}
				</ul>
			</section>
			<section>
				<div>
					<h2 className={styles.title}>Sell Offers:</h2>
					<table>
						<tr>
							<th>Name</th>
							<th>Amount</th>
							<th>Price Per Unit</th>
							<th>Total Price</th>
							<th>Ends At</th>
						</tr>
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
			<section className={styles.searchSection}>
				<h2 className={styles.title}>Search:</h2>
				<form>
					<input
						className={styles.search}
						type="text"
					/>
				</form>
			</section>
			<section className={styles.footer}>
				<h2 className="visually-hidden">Footer</h2>
				<p>Gold: {gold}</p>
				<div className={styles.buttonContainer}>
					<Link
						href="/"
						className={buttonStyles.button}
					>
						Switch Player
					</Link>
					<Button text="Create Offer" />
				</div>
			</section>
		</main>
	);
}
