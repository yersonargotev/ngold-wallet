"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import NGOLDABI from "@/lib/abis/NGOLD.json";
import USDTABI from "@/lib/abis/USDT.json";
import { DECIMALS, chain } from "@/lib/constants/magic";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { useQuery } from "@tanstack/react-query";
import {
	BrowserProvider,
	Contract,
	Eip1193Provider,
	formatUnits,
} from "ethers";
import { AlertCircle } from "lucide-react";

const USDTAddress = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";
const NGOLDAddress = "0xe87fE0aaE8815B4B7cD026FeE1B1072c766E09F5";

interface TokenBalance {
	ngold: string;
	usdt: string;
}

export function Balances() {
	const { address, isConnected } = useAppKitAccount();
	const { walletProvider } = useAppKitProvider(chain);

	const fetchBalances = async (): Promise<TokenBalance> => {
		if (!isConnected) throw new Error("Wallet not connected");

		const ethersProvider = new BrowserProvider(
			walletProvider as Eip1193Provider,
		);
		const signer = await ethersProvider.getSigner();

		const USDTContract = new Contract(USDTAddress, USDTABI, signer);
		const NGOLDContract = new Contract(NGOLDAddress, NGOLDABI, signer);

		const [USDTBalance, NGOLDBalance] = await Promise.all([
			USDTContract.balanceOf(address),
			NGOLDContract.balanceOf(address),
		]);

		return {
			usdt: formatUnits(USDTBalance, DECIMALS.USDT),
			ngold: formatUnits(NGOLDBalance, DECIMALS.NGOLD),
		};
	};

	const { data, isLoading, error } = useQuery({
		queryKey: ["balances", address],
		queryFn: fetchBalances,
		enabled: isConnected,
		refetchInterval: 30000, // Refetch every 30 seconds
		staleTime: 10000, // Consider data stale after 10 seconds
	});

	if (!isConnected) {
		return (
			<Alert className="max-w-md mx-auto">
				<AlertCircle className="h-4 w-4" />
				<AlertDescription>
					Please connect your wallet to view balances
				</AlertDescription>
			</Alert>
		);
	}

	if (error) {
		return (
			<Alert variant="destructive" className="max-w-md mx-auto">
				<AlertCircle className="h-4 w-4" />
				<AlertDescription>
					Error fetching balances. Please try again.
				</AlertDescription>
			</Alert>
		);
	}

	return (
		<div className="grid grid-cols-2 gap-4 p-4 max-w-2xl mx-auto">
			<Card className="bg-muted/50 hover:bg-muted/70 transition-colors">
				<CardHeader className="space-y-1">
					<CardTitle className="flex items-center gap-2">
						NGOLD Balance
					</CardTitle>
				</CardHeader>
				<CardContent>
					{isLoading ? (
						<Skeleton className="h-6 w-24" />
					) : (
						<p className="text-2xl font-semibold">
							{Number(data?.ngold).toLocaleString(undefined, {
								maximumFractionDigits: 4,
							})}{" "}
							NGOLD
						</p>
					)}
				</CardContent>
			</Card>

			<Card className="bg-muted/50 hover:bg-muted/70 transition-colors">
				<CardHeader className="space-y-1">
					<CardTitle className="flex items-center gap-2">
						USDT Balance
					</CardTitle>
				</CardHeader>
				<CardContent>
					{isLoading ? (
						<Skeleton className="h-6 w-24" />
					) : (
						<p className="text-2xl font-semibold">
							{Number(data?.usdt).toLocaleString(undefined, {
								maximumFractionDigits: 2,
							})}{" "}
							USDT
						</p>
					)}
				</CardContent>
			</Card>
		</div>
	);
}

export default Balances;
