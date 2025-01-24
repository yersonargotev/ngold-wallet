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
	metadataBase: new URL("https://wallet.ngold.io"),
	title: "NGOLD - Wallet",
	description:
		"NGOLD - The secure and efficient digital wallet for managing your crypto assets",
	creator: "croctec.com",
	keywords: [
		"ngold",
		"gold",
		"crypto",
		"web3",
		"blockchain",
		"dapp",
		"wallet",
		"digital assets",
	],
	manifest: "/manifest.json",

	// OpenGraph metadata for social sharing
	openGraph: {
		type: "website",
		title: "NGOLD - Wallet",
		description:
			"NGOLD - The secure and efficient digital wallet for managing your crypto assets",
		siteName: "NGOLD",
		url: "https://wallet.ngold.io",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "NGOLD Wallet",
			},
		],
	},

	// Twitter card metadata
	twitter: {
		card: "summary_large_image",
		title: "NGOLD - Wallet",
		description:
			"NGOLD - The secure and efficient digital wallet for managing your NGOLD crypto assets.",
		images: ["/twitter-image.png"],
		creator: "@ngold_io",
	},

	// Icons configuration
	icons: {
		icon: [
			// Favicon icons for different color schemes
			{
				url: "/logo-ngold-black.png",
				media: "(prefers-color-scheme: light)",
			},
			{
				url: "/logo-ngold-white.png",
				media: "(prefers-color-scheme: dark)",
			},
			// Standard favicons
			{
				url: "/favicon.ico",
				sizes: "48x48",
				type: "image/x-icon",
			},
			{
				url: "/favicon-32x32.png",
				sizes: "32x32",
				type: "image/png",
			},
			{
				url: "/favicon-16x16.png",
				sizes: "16x16",
				type: "image/png",
			},
		],
		// Apple touch icons
		apple: [
			{
				url: "/apple-icon.png",
				sizes: "180x180",
				type: "image/png",
			},
		],
		// Other icons
		shortcut: ["/shortcut-icon.png"],
		other: [
			{
				rel: "mask-icon",
				url: "/safari-pinned-tab.svg",
				color: "#000000",
			},
		],
	},

	// Apple-specific configurations
	appleWebApp: {
		capable: true,
		statusBarStyle: "black-translucent",
		title: "NGOLD",
		startupImage: [
			{
				url: "/apple-splash-2048-2732.png",
				media:
					"(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)",
			},
			{
				url: "/apple-splash-1668-2388.png",
				media:
					"(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)",
			},
			{
				url: "/apple-splash-1536-2048.png",
				media:
					"(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)",
			},
			{
				url: "/apple-splash-1125-2436.png",
				media:
					"(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)",
			},
		],
	},

	// Other metadata
	other: {
		"apple-mobile-web-app-title": "NGOLD",
		"application-name": "NGOLD",
		"msapplication-TileColor": "#000000",
		"msapplication-config": "/browserconfig.xml",
		"theme-color": "#000000",
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
