"use client";

import { Ngold } from "@/components/icons/ngold-letter";
import Polygon from "@/components/icons/polygon";
import Tether from "@/components/icons/tether";
import { TokenRow } from "@/components/index/tokens/token-row";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGoldPrice } from "@/hooks/use-gold-price";
import { useTokenBalances } from "@/hooks/use-token-balances";
import { useTokenPrices } from "@/hooks/use-token-prices";
import { useTokenPricesBalances } from "@/hooks/use-token-prices-balances";
import { useWalletProvider } from "@/hooks/use-wallet-provider";
import { useAppKitAccount } from "@reown/appkit/react";
import { AlertCircle, RefreshCw } from "lucide-react";

export function Tokens() {
	const { isConnected } = useAppKitAccount();
	const { error: providerError, resetError } = useWalletProvider();

	const {
		data: balances,
		isLoading: isLoadingBalances,
		error: balancesError,
		refetch: refetchBalances,
		isRefetching: isRefetchingBalances,
	} = useTokenBalances();

	const {
		data: goldPrice,
		isLoading: isLoadingPrice,
		error: priceError,
	} = useGoldPrice();

	const {
		data: prices,
		isLoading: isLoadingPrices,
		error: pricesError,
	} = useTokenPrices();

	const {
		usdt: bpUsdt,
		ngold: bpNgold,
		pol: bpPol,
	} = useTokenPricesBalances({
		usdt: balances?.usdt,
		ngold: balances?.ngold,
		pol: balances?.pol,
		usdtPrice: prices?.usdt,
		ngoldPrice: goldPrice,
		polPrice: prices?.pol,
	});

	const isLoading = isLoadingBalances || isLoadingPrice || isLoadingPrices;
	const error = providerError || balancesError || priceError || pricesError;

	const handleRefetch = async () => {
		resetError();
		await refetchBalances();
	};

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
			<div className="flex flex-col items-center justify-center gap-4">
				<Alert variant="destructive" className="max-w-md">
					<AlertCircle className="h-4 w-4" />
					<AlertDescription>
						{error instanceof Error
							? error.message
							: "Error fetching token data. Please try again."}
					</AlertDescription>
				</Alert>
				<Button
					variant="outline"
					onClick={handleRefetch}
					disabled={isRefetchingBalances}
				>
					Try Again
				</Button>
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
						otherBalance={bpNgold?.formatted}
						isLoading={isLoading}
					/>

					<TokenRow
						icon={<Tether className="h-10 w-10" />}
						name="USDT"
						price={prices?.usdt}
						balance={balances?.usdt}
						otherBalance={bpUsdt?.formatted}
						isLoading={isLoading}
					/>

					<TokenRow
						icon={<Polygon className="h-10 w-10" />}
						name="POL"
						price={prices?.pol}
						balance={balances?.pol}
						otherBalance={bpPol?.formatted}
						isLoading={isLoading}
					/>
				</div>
			</CardContent>
		</Card>
	);
}

export default Tokens;
