import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { AppKitNetwork, polygon } from "@reown/appkit/networks";
import {
	createAppKit,
	useAppKit,
	useAppKitAccount,
	useAppKitEvents,
	useAppKitNetwork,
	useAppKitState,
	useAppKitTheme,
	useDisconnect,
	useWalletInfo,
} from "@reown/appkit/react";
import { cookieStorage, createStorage } from "wagmi";

export const projectId =
	process.env.NEXT_PUBLIC_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694"; // this is a public projectId only to use on localhost

export const networks = [polygon] as [AppKitNetwork, ...AppKitNetwork[]];

// Setup wagmi adapter
export const wagmiAdapter = new WagmiAdapter({
	storage: createStorage({
		storage: cookieStorage,
	}),
	ssr: true,
	networks,
	projectId,
});

// Create modal
const modal = createAppKit({
	adapters: [wagmiAdapter],
	networks,
	metadata: {
		name: "NGOLD - DEX Wallet",
		description: "NGOLD - DEX Wallet",
		url: "",
		icons: [""],
	},
	projectId,
	themeMode: "light",
	features: {
		analytics: true,
	},
});

export {
	modal,
	useAppKit,
	useAppKitAccount,
	useAppKitEvents,
	useAppKitNetwork,
	useAppKitState,
	useAppKitTheme,
	useDisconnect,
	useWalletInfo,
};
