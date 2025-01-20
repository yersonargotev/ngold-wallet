"use client";

import { Ngold } from "@/components/icons/ngold-letter";
import Tether from "@/components/icons/tether";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import GOLDABI from "@/lib/abis/GOLD.json";
import NGOLDABI from "@/lib/abis/NGOLD.json";
import USDTABI from "@/lib/abis/USDT.json";
import { goldAddress, ngoldAddress, usdtAddress } from "@/lib/constants/env";
import { DECIMALS, chain } from "@/lib/constants/magic";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { useQuery } from "@tanstack/react-query";
import {
	BrowserProvider,
	Contract,
	type Eip1193Provider,
	formatUnits,
} from "ethers";
import { AlertCircle, RefreshCw } from "lucide-react";

interface TokenBalance {
	ngold: string;
	usdt: string;
	gold: string;
}

interface TokenRowProps {
	icon: React.ReactNode;
	name: string;
	price?: string;
	balance?: string;
	isLoading?: boolean;
}

const TokenRow = ({ icon, name, price, balance, isLoading }: TokenRowProps) => (
	<div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
		<div className="flex gap-3 items-center">
			<div className="flex-shrink-0">{icon}</div>
			<div className="flex flex-col">
				<h3 className="font-semibold text-base">{name}</h3>
				{isLoading ? (
					<Skeleton className="h-4 w-16" />
				) : (
					<span className="text-sm text-muted-foreground">
						${price ?? "0.00"}
					</span>
				)}
			</div>
		</div>
		<div className="flex flex-col items-end gap-1">
			{isLoading ? (
				<>
					<Skeleton className="h-5 w-24" />
					<Skeleton className="h-4 w-16" />
				</>
			) : (
				<>
					<span className="font-medium">${balance ?? "0.00"}</span>
					<span className="text-sm text-muted-foreground">
						{Number(balance ?? 0).toLocaleString(undefined, {
							maximumFractionDigits: 4,
						})}{" "}
						{name}
					</span>
				</>
			)}
		</div>
	</div>
);

export function Tokens() {
	const { address, isConnected } = useAppKitAccount();
	const { walletProvider } = useAppKitProvider(chain);

	const fetchBalances = async (): Promise<TokenBalance> => {
		if (!isConnected) throw new Error("Wallet not connected");

		const ethersProvider = new BrowserProvider(
			walletProvider as Eip1193Provider,
		);
		const signer = await ethersProvider.getSigner();

		const USDTContract = new Contract(usdtAddress, USDTABI, signer);
		const NGOLDContract = new Contract(ngoldAddress, NGOLDABI, signer);
		const GOLDContract = new Contract(goldAddress, GOLDABI, signer);

		const [USDTBalance, NGOLDBalance, GOLDBalance] = await Promise.all([
			USDTContract.balanceOf(address),
			NGOLDContract.balanceOf(address),
			GOLDContract.getGramGoldPrice(address),
		]);

		console.log("GOLD Balance: ", GOLDBalance);
		return {
			usdt: formatUnits(USDTBalance, DECIMALS.USDT),
			ngold: formatUnits(NGOLDBalance, DECIMALS.NGOLD),
			gold: formatUnits(GOLDBalance, DECIMALS.GOLD),
		};
	};

	const { data, isLoading, error, refetch, isRefetching } =
		useQuery<TokenBalance>({
			queryKey: ["balances", address],
			queryFn: fetchBalances,
			enabled: isConnected,
			refetchInterval: 30000,
			staleTime: 10000,
		});

	if (!isConnected) {
		return (
			<div className="flex items-center justify-center">
				<Alert className="max-w-md">
					<AlertCircle className="h-4 w-4" />
					<AlertDescription>
						Please connect your wallet to view tokens
					</AlertDescription>
				</Alert>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center">
				<Alert variant="destructive" className="max-w-md">
					<AlertCircle className="h-4 w-4" />
					<AlertDescription>
						Error fetching token data. Please try again.
					</AlertDescription>
				</Alert>
			</div>
		);
	}

	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardContent className="p-6">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-xl font-semibold">Tokens</h2>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => refetch()}
						disabled={isRefetching}
						className="h-8 w-8"
					>
						<RefreshCw
							className={`h-4 w-4 ${isRefetching ? "animate-spin" : ""}`}
						/>
					</Button>
				</div>

				<div className="flex flex-col gap-3">
					<TokenRow
						icon={<Ngold className="h-10 w-10 text-[#cfb53c]" />}
						name="NGOLD"
						price={data?.gold}
						balance={data?.ngold}
						isLoading={isLoading}
					/>

					<TokenRow
						icon={<Tether className="h-10 w-10" />}
						name="USDT"
						price="1.00"
						balance={data?.usdt}
						isLoading={isLoading}
					/>
				</div>
			</CardContent>
		</Card>
	);
}

export default Tokens;
