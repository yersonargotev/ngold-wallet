"use client";

import { Ngold } from "@/components/icons/ngold-letter";
import Tether from "@/components/icons/tether";
import { TokenRow } from "@/components/index/tokens/token-row";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGoldPrice } from "@/hooks/use-gold-price";
import { useTokenBalances } from "@/hooks/use-token-balances";
import { useAppKitAccount } from "@reown/appkit/react";
import { AlertCircle, RefreshCw } from "lucide-react";

export function Tokens() {
	const { isConnected } = useAppKitAccount();

	const {
		data: balances,
		isLoading: isLoadingBalances,
		error: balancesError,
		refetch: refetchBalances,
		isRefetching: isRefetchingBalances,
	} = useTokenBalances();

	const { data: goldPrice, isLoading: isLoadingPrice } = useGoldPrice();

	const isLoading = isLoadingBalances || isLoadingPrice;

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

	if (balancesError) {
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
						onClick={() => refetchBalances()}
						disabled={isRefetchingBalances}
						className="h-8 w-8"
					>
						<RefreshCw
							className={`h-4 w-4 ${isRefetchingBalances ? "animate-spin" : ""}`}
						/>
					</Button>
				</div>

				<div className="flex flex-col gap-3">
					<TokenRow
						icon={<Ngold className="h-10 w-10 text-[#cfb53c]" />}
						name="NGOLD"
						price={goldPrice}
						balance={balances?.ngold}
						isLoading={isLoading}
					/>

					<TokenRow
						icon={<Tether className="h-10 w-10" />}
						name="USDT"
						price="1.00"
						balance={balances?.usdt}
						isLoading={isLoading}
					/>
				</div>
			</CardContent>
		</Card>
	);
}

export default Tokens;
