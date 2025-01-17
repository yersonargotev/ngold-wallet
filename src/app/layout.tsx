import ContextProvider from "@/context";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "NGOLD - Wallet",
	description: "NGOLD - Wallet",
	creator: "croctec.com",
	keywords: ["ngold", "gold", "crypto", "web3", "blockchain", "dapp"],
	icons: {
		icon: [
			{
				url: "/favicon-dark.png",
				media: "(prefers-color-scheme: light)",
			},
			{
				url: "/favicon.png",
				media: "(prefers-color-scheme: dark)",
			},
		],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ContextProvider cookies={null}>{children}</ContextProvider>
			</body>
		</html>
	);
}
