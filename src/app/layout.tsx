import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "CodeMiner Marketplace",
	description: "Buy and sell items from your favorite game",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={``}>{children}</body>
		</html>
	);
}
