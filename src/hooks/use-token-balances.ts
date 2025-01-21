import { useWalletProvider } from "@/hooks/use-wallet-provider";
import NGOLDABI from "@/lib/abis/NGOLD.json";
import POLABI from "@/lib/abis/POL.json";
import USDTABI from "@/lib/abis/USDT.json";
import { ngoldAddress, polygonAddress, usdtAddress } from "@/lib/constants/env";
import { DECIMALS } from "@/lib/constants/magic";
import { useAppKitAccount } from "@reown/appkit/react";
import { useQuery } from "@tanstack/react-query";
import { Contract, formatUnits } from "ethers";

interface TokenBalances {
	ngold: string;
	usdt: string;
	pol: string;
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
				const POLContract = new Contract(polygonAddress, POLABI, signer);

				const [USDTBalance, NGOLDBalance, POLBalance] = await Promise.all([
					USDTContract.balanceOf(address),
					NGOLDContract.balanceOf(address),
					POLContract.balanceOf(address),
				]);

				console.log("USDTBalance: ", USDTBalance);
				console.log("NGOLDBalance: ", NGOLDBalance);
				console.log("POLBalance: ", POLBalance);

				return {
					usdt: formatUnits(USDTBalance, DECIMALS.USDT),
					ngold: formatUnits(NGOLDBalance, DECIMALS.NGOLD),
					pol: formatUnits(POLBalance, DECIMALS.POL),
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
