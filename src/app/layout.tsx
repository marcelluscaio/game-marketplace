import type { Metadata } from "next";
import { Nanum_Brush_Script } from "next/font/google";
import "./styles/reset.css";
import "./styles/theme.css";
import "./styles/global.css";
import { Frame } from "@/View/components/Frame";

export const metadata: Metadata = {
	title: "CodeMiner Marketplace",
	description: "Buy and sell items from your favorite game",
};

const nanumBrushScript = Nanum_Brush_Script({
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
			<body className={nanumBrushScript.className}>
				<Frame>{children}</Frame>
			</body>
		</html>
	);
}
