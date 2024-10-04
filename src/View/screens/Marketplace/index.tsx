import buttonStyles from "@/View/components/Global/Button/styles.module.css";
import styles from "./styles.module.css";
import Link from "next/link";
import { getPlayerData } from "@/server/actions/getPlayerData";
import type { RouteProps } from "@/app/marketplace/[id]/page";
import { Modal } from "@/View/components/Marketplace/Modal";
import { createOffer } from "@/server/actions/createOffer";
import { ItemList } from "@/View/components/Marketplace/ItemsList";
import { Dashboard } from "@/View/components/Marketplace/Dashboard";
import { OfferTables } from "@/View/components/Marketplace/OfferTables";
import { getOffers } from "@/server/actions/getOffersByItem";
import { Search } from "@/View/components/Marketplace/Search";

type Props = RouteProps["params"];

async function Marketplace({ id }: Props) {
	const { player } = await getPlayerData(id);
	const { gold, nickname, items } = player;
	const initalOffers = await getOffers(items[0].itemTypeId);

	return (
		<main className={styles.container}>
			<div className={`${styles.greeting} ${styles.align}`}>
				<h1 className="visually-hidden">Marketplace</h1>
				<p>{`Hello, ${nickname}`}</p>
			</div>

			<Dashboard>
				<div className={`${styles.align} ${styles.dashboard}`}>
					<ItemList items={items} />
					<OfferTables
						initialOffers={initalOffers}
						getOffers={getOffers}
					/>
					<Search />
				</div>
				<section className={styles.footer}>
					<h2 className="visually-hidden">Footer</h2>
					{/* TODO update UI when an offer is made */}
					<p>Gold: {gold}</p>
					<div className={styles.buttonContainer}>
						<Link
							href="/"
							className={buttonStyles.button}
						>
							Switch Player
						</Link>
						<Modal
							formAction={createOffer}
							playerGold={gold}
						/>
					</div>
				</section>
			</Dashboard>
		</main>
	);
}

export { Marketplace };
