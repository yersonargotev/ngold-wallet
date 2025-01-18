import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import type { AppKitNetwork } from "@reown/appkit/networks";
import { polygon } from "@reown/appkit/networks";

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) {
	throw new Error("Project ID is not defined");
}

export const networks = [polygon] as [AppKitNetwork, ...AppKitNetwork[]];

export const ethersAdapter = new EthersAdapter();
