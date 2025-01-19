import ContextProvider from "@/components/providers/context-provider";
import { Header } from "@/components/shared/header";
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
				url: "/logo-ngold-black.png",
				media: "(prefers-color-scheme: light)",
			},
			{
				url: "/logo-ngold-white.png",
				media: "(prefers-color-scheme: dark)",
			},
		],
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ContextProvider>
					<Header />
					<main className="container max-w-screen-2xl mx-auto">{children}</main>
				</ContextProvider>
			</body>
		</html>
	);
}
