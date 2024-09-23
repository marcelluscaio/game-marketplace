import buttonStyles from "@/View/components/Button/styles.module.css";
import styles from "./styles.module.css";
import Link from "next/link";
import { getPlayerData } from "@/server/actions/getPlayerData";
import type { RouteProps } from "@/app/(routes)/marketplace/[id]/page";
import { Modal } from "@/View/components/Marketplace/Modal";
import { createOffer } from "@/server/actions/createOffer";

type Props = RouteProps["params"];

async function Marketplace({ id }: Props) {
	const { player } = await getPlayerData(id);
	const { gold, nickname, items } = player;

	return (
		<main className={styles.container}>
			<h1 className="visually-hidden">Marketplace</h1>
			<p className={styles.greeting}>{`Hello, ${nickname}`}</p>
			<section className={styles.itemSection}>
				<h2 className={styles.title}>Items:</h2>
				<ul className={styles.itemList}>
					{items.map((item) => (
						<li
							key={item.id}
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
					<Modal
						item={{ id: items[0].id, name: items[0].name }}
						formAction={createOffer}
					/>
				</div>
			</section>
		</main>
	);
}

export { Marketplace };
