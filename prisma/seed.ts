/* import { dayjs } from "@/libs/dayjs"; */
/* import { db } from "@/server/db/db"; */
import dayjs from "dayjs";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

const PLAYERS = [
	{ nickname: "MedievalRambo" },
	{ nickname: "Kali" },
	{ nickname: "DragonSlayer" },
	{ nickname: "OrcDefender" },
	{ nickname: "UnicornRider" },
	{ nickname: "DayDreamer" },
];

function randomIntFromInterval({ min, max }: { min: number; max: number }) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

const ITEMS = [
	{ name: "long sword" },
	{ name: "short sword" },
	{ name: "shield" },
	{ name: "boots" },
	{ name: "banana" },
	{ name: "apple" },
	{ name: "orange" },
];

const ENRICHED_PLAYERS = PLAYERS.map((player, index) => ({
	...player,
	gold: randomIntFromInterval({ min: 50, max: 5000 }),
	items: ITEMS.map((item, itemIndex) => ({
		...item,
		quantity: itemIndex === index ? 0 : randomIntFromInterval({ min: 1, max: 20 }),
	})),
}));

const NOW = dayjs();
const IN_ONE_WEEK = NOW.add(7, "week").toDate();

async function seed() {
	db.offer.deleteMany({});
	db.itemInstance.deleteMany({});
	db.player.deleteMany({});
	db.item.deleteMany({});

	await db.item.createMany({ data: ITEMS });

	const createdPlayers = await db.player.createManyAndReturn({
		data: ENRICHED_PLAYERS.map((player) => ({
			nickname: player.nickname,
			gold: player.gold,
		})),
	});

	await Promise.all(
		ENRICHED_PLAYERS.map(async (player) => {
			const playerId = createdPlayers.find(
				(createdPlayer) => createdPlayer.nickname === player.nickname
			)?.id;

			const playerItems = await Promise.all(
				player.items.map(async (item) => {
					const itemIdResult = await db.item.findUnique({
						where: { name: item.name },
						select: { id: true },
					});

					return {
						quantity: item.quantity,
						itemId: itemIdResult?.id,
					};
				})
			);

			if (playerId) {
				await db.itemInstance.createMany({
					data: playerItems
						.filter((item) => item.itemId !== undefined)
						.map((item) => ({
							quantity: item.quantity,
							itemId: item.itemId!,
							ownerId: playerId,
						})),
				});
			}
		})
	);
}

seed()
	.then(async () => {
		console.log("Database seeded");
		await db.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await db.$disconnect();
		process.exit(1);
	});
