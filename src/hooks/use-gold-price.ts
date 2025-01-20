import { useWalletProvider } from "@/hooks/use-wallet-provider";
import GOLDABI from "@/lib/abis/GOLD.json";
import { goldAddress } from "@/lib/constants/env";
import { DECIMALS } from "@/lib/constants/magic";
import { useAppKitAccount } from "@reown/appkit/react";
import { useQuery } from "@tanstack/react-query";
import { Contract, formatUnits } from "ethers";

export const useGoldPrice = () => {
	const { address, isConnected } = useAppKitAccount();
	const { getProvider, isReady } = useWalletProvider();

	return useQuery({
		queryKey: ["gold-price", address],
		queryFn: async (): Promise<string> => {
			try {
				const { signer } = await getProvider();
				const GOLDContract = new Contract(goldAddress, GOLDABI, signer);

				const price = await GOLDContract.getGramGoldPrice(address);
				return formatUnits(price, DECIMALS.GOLD);
			} catch (error) {
				console.error("Error fetching gold price:", error);
				throw new Error("Failed to fetch gold price. Please try again.");
			}
		},
		enabled: isConnected && isReady,
		retry: 2,
		retryDelay: 1000,
		refetchInterval: 5000,
		staleTime: 2000,
	});
};
