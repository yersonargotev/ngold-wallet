import { useWalletProvider } from "@/hooks/use-wallet-provider";
import POLUSDABI from "@/lib/abis/POLUSD.json";
import USDTUSDABI from "@/lib/abis/USDTUSD.json";
import { polUsdAddress, usdtUsdAddress } from "@/lib/constants/env";
import { DECIMALS } from "@/lib/constants/magic";
import { useAppKitAccount } from "@reown/appkit/react";
import { useQuery } from "@tanstack/react-query";
import { Contract, formatUnits } from "ethers";

interface TokenPrices {
	usdt: string;
	pol: string;
}

export const useTokenPrices = () => {
	const { isConnected } = useAppKitAccount();
	const { getProvider } = useWalletProvider();

	return useQuery({
		queryKey: ["token-prices"],
		queryFn: async (): Promise<TokenPrices> => {
			console.log("Fetching token prices...");
			try {
				const { signer } = await getProvider();

				const USDTPriceContract = new Contract(
					usdtUsdAddress,
					USDTUSDABI,
					signer,
				);
				const POLPriceContract = new Contract(polUsdAddress, POLUSDABI, signer);

				const [USDTPrice, POLPrice] = await Promise.all([
					USDTPriceContract.latestRoundData(),
					POLPriceContract.latestRoundData(),
				]);

				return {
					usdt: formatUnits(USDTPrice.answer, DECIMALS.USDTUSD),
					pol: formatUnits(POLPrice.answer, DECIMALS.POLUSD),
				};
			} catch (error) {
				console.error("Error fetching prices:", error);
				throw new Error("Failed to fetch token prices. Please try again.");
			}
		},
		enabled: isConnected,
		retry: 2,
		retryDelay: 1000,
		refetchInterval: 30000,
		staleTime: 10000,
	});
};
