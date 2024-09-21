import buttonStyles from "@/View/components/Button/styles.module.css";
import styles from "./styles.module.css";
import Link from "next/link";
import { Button } from "@/View/components/Button";

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

const GOLD = 23456;

export default async function Marketplace({ params: { id } }: Props) {
	return (
		<main className={styles.container}>
			<h1 className="visually-hidden">Marketplace</h1>
			<section>
				<h2>Items: {id}</h2>
				<ul className={styles.itemList}>
					{ITEMS.map((item) => (
						<li key={item.name}>
							{item.quantity} x {item.name}
						</li>
					))}
				</ul>
			</section>
			<section>
				<div>
					<h2>Sell Offers:</h2>
				</div>
				<div>
					<h2>Buy Offers:</h2>
				</div>
			</section>
			<section>
				<h2>Search</h2>
				<form>
					<input type="text" />
				</form>
			</section>
			<section>
				<h2 className="visually-hidden">Footer</h2>
				<p>Gold: {GOLD}</p>
				<Link
					href="/"
					className={buttonStyles.button}
				>
					Switch Player
				</Link>
				<Button text="Create Offer" />
			</section>
		</main>
	);
}
