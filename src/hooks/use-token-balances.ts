import NGOLDABI from "@/lib/abis/NGOLD.json";
import USDTABI from "@/lib/abis/USDT.json";
import { ngoldAddress, usdtAddress } from "@/lib/constants/env";
import { DECIMALS, chain } from "@/lib/constants/magic";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { useQuery } from "@tanstack/react-query";
import {
	BrowserProvider,
	Contract,
	type Eip1193Provider,
	formatUnits,
} from "ethers";

interface TokenBalances {
	ngold: string;
	usdt: string;
}

export const useTokenBalances = () => {
	const { address, isConnected } = useAppKitAccount();
	const { walletProvider } = useAppKitProvider(chain);

	return useQuery({
		queryKey: ["token-balances", address],
		queryFn: async (): Promise<TokenBalances> => {
			if (!isConnected) throw new Error("Wallet not connected");

			const ethersProvider = new BrowserProvider(
				walletProvider as Eip1193Provider,
			);
			const signer = await ethersProvider.getSigner();

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
		},
		enabled: isConnected,
		refetchInterval: 30000,
		staleTime: 10000,
	});
};
