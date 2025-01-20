import { useWalletProvider } from "@/hooks/use-wallet-provider";
import NGOLDABI from "@/lib/abis/NGOLD.json";
import USDTABI from "@/lib/abis/USDT.json";
import { ngoldAddress, usdtAddress } from "@/lib/constants/env";
import { DECIMALS } from "@/lib/constants/magic";
import { useAppKitAccount } from "@reown/appkit/react";
import { useQuery } from "@tanstack/react-query";
import { Contract, formatUnits } from "ethers";

interface TokenBalances {
	ngold: string;
	usdt: string;
}

export const useTokenBalances = () => {
	const { address, isConnected } = useAppKitAccount();
	const { getProvider, isReady } = useWalletProvider();

	return useQuery({
		queryKey: ["token-balances", address],
		queryFn: async (): Promise<TokenBalances> => {
			try {
				const { signer } = await getProvider();

				const USDTContract = new Contract(usdtAddress, USDTABI, signer);
				const NGOLDContract = new Contract(ngoldAddress, NGOLDABI, signer);

				const [USDTBalance, NGOLDBalance] = await Promise.all([
					USDTContract.balanceOf(address),
					NGOLDContract.balanceOf(address),
				]);

				return {
					usdt: formatUnits(USDTBalance, DECIMALS.USDT),
					ngold: formatUnits(NGOLDBalance, DECIMALS.NGOLD),
				};
			} catch (error) {
				console.error("Error fetching balances:", error);
				throw new Error("Failed to fetch token balances. Please try again.");
			}
		},
		enabled: isConnected && isReady,
		retry: 2,
		retryDelay: 1000,
		refetchInterval: 30000,
		staleTime: 10000,
	});
};
