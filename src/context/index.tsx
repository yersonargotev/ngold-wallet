"use client";

import type { ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";

import { polygon } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";

import { ethersAdapter, networks, projectId } from "@/lib/config";

// Set up queryClient
const queryClient = new QueryClient();

if (!projectId) {
	throw new Error("Project ID is not defined");
}

// Set up metadata
export const appKitMetadata = {
	name: "NGOLD Wallet",
	description: "NGOLD Wallet",
	url: "https://wallet-ngold.vercel.app/",
	icons: [""],
};

// Create the modal
export const modal = createAppKit({
	adapters: [ethersAdapter],
	projectId,
	networks,
	defaultNetwork: polygon,
	metadata: appKitMetadata,
	themeMode: "light",
	features: {
		analytics: false, // Optional - defaults to your Cloud configuration
	},
});

function ContextProvider({ children }: { children: ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider
				attribute="class"
				defaultTheme="light"
				enableSystem={false}
			>
				{children}
			</ThemeProvider>
		</QueryClientProvider>
	);
}

export default ContextProvider;
