/* import { dayjs } from "@/libs/dayjs"; */
/* import { db } from "@/server/db/db"; */
import dayjs from "dayjs";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

const PLAYERS = [
	{ nickname: "MedievalRambo", gold: 250 },
	{ nickname: "Kali", gold: 2500 },
	{ nickname: "DragonSlayer", gold: 2 },
	{ nickname: "OrcDefender", gold: 123 },
	{ nickname: "UnicornRider", gold: 860 },
	{ nickname: "DayDreamer", gold: 458 },
];

const ITEMS = [
	{ name: "long sword" },
	{ name: "short sword" },
	{ name: "shield" },
	{ name: "boots" },
	{ name: "banana" },
	{ name: "apple" },
	{ name: "orange" },
];

const NOW = dayjs();
const IN_ONE_WEEK = NOW.add(7, "week").toDate();

async function seed() {
	db.offer.deleteMany({});
	db.itemInstance.deleteMany({});
	db.player.deleteMany({});
	db.item.deleteMany({});
	await db.item.createMany({ data: ITEMS });
	const items = await db.item.findMany();

	await db.player.create({
		data: {
			...PLAYERS[0],
			items: {
				create: [
					{
						quantity: 3,
						itemId: (await items[0]).id,
					},
					{
						quantity: 10,
						itemId: (await items[1]).id,
					},
					{
						quantity: 17,
						itemId: (await items[2]).id,
					},
					{
						quantity: 200,
						itemId: (await items[3]).id,
					},
					{
						quantity: 1,
						itemId: (await items[4]).id,
					},
					{
						quantity: 8,
						itemId: (await items[5]).id,
					},
				],
			},
			offers: {
				create: [
					{
						offerType: "BUY",
						itemId: (await items[2]).id,
						quantity: 3,
						pricePerUnit: 60,
						endDate: IN_ONE_WEEK,
					},
					{
						offerType: "SELL",
						itemId: (await items[4]).id,
						quantity: 2,
						pricePerUnit: 600,
						endDate: IN_ONE_WEEK,
					},
				],
			},
		},
	});

	PLAYERS.forEach(async (player) =>
		db.player.upsert({
			where: { nickname: player.nickname },
			update: {},
			create: player,
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
