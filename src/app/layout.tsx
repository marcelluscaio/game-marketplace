import type { Metadata } from "next";
import { Gloria_Hallelujah } from "next/font/google";
import "@/View/styles/reset.css";
import "@/View/styles/theme.css";
import "@/View/styles/global.css";
import { Frame } from "@/View/components/Frame";

export const metadata: Metadata = {
	title: "CodeMiner Marketplace",
	description: "Buy and sell items from your favorite game",
};

const gloriaFont = Gloria_Hallelujah({
	weight: "400",
	subsets: ["latin"],
	display: "swap",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={gloriaFont.className}>
				<Frame>{children}</Frame>
			</body>
		</html>
	);
}
