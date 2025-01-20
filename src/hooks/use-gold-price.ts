import GOLDABI from "@/lib/abis/GOLD.json";
import { goldAddress } from "@/lib/constants/env";
import { DECIMALS, chain } from "@/lib/constants/magic";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { useQuery } from "@tanstack/react-query";
import {
	BrowserProvider,
	Contract,
	type Eip1193Provider,
	formatUnits,
} from "ethers";

export const useGoldPrice = () => {
	const { address, isConnected } = useAppKitAccount();
	const { walletProvider } = useAppKitProvider(chain);

	return useQuery({
		queryKey: ["gold-price", address],
		queryFn: async (): Promise<string> => {
			if (!isConnected) throw new Error("Wallet not connected");

			const ethersProvider = new BrowserProvider(
				walletProvider as Eip1193Provider,
			);
			const signer = await ethersProvider.getSigner();
			const GOLDContract = new Contract(goldAddress, GOLDABI, signer);

			const price = await GOLDContract.getGramGoldPrice(address);
			return formatUnits(price, DECIMALS.GOLD);
		},
		enabled: isConnected,
		refetchInterval: 5000, // Actualizar cada 5 segundos
		staleTime: 2000,
	});
};
