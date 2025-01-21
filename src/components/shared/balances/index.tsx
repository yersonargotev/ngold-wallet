"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { useGoldPrice } from "@/hooks/use-gold-price";
import { useTokenBalances } from "@/hooks/use-token-balances";
import { useWalletProvider } from "@/hooks/use-wallet-provider";
import { useAppKitAccount } from "@reown/appkit/react";
import Decimal from "decimal.js";
import { AlertCircle } from "lucide-react";
import React, { useMemo } from "react";
import { BalanceCard } from "./balance-card";

// Configure Decimal.js
Decimal.set({ precision: 30, rounding: Decimal.ROUND_DOWN });

const formatDecimal = (
	value: string | null | undefined,
	decimals = 6,
): string => {
	if (!value) return "0";
	try {
		return new Decimal(value).toFixed(decimals);
	} catch {
		return "0";
	}
};

export function Balances() {
	const { isConnected } = useAppKitAccount();
	const { error: providerError } = useWalletProvider();
	const {
		data: balances,
		isLoading: isLoadingBalances,
		error: balancesError,
	} = useTokenBalances();
	const {
		data: goldPrice,
		isLoading: isLoadingPrice,
		error: priceError,
	} = useGoldPrice();

	const isLoading = isLoadingBalances || isLoadingPrice;
	const error = providerError || balancesError || priceError;

	// Memoize calculations
	const { formattedNgold, usdValue } = useMemo(() => {
		if (!balances?.ngold || !goldPrice) {
			return { formattedNgold: "0", usdValue: "0" };
		}
		try {
			const ngoldDecimal = new Decimal(balances.ngold);
			const priceDecimal = new Decimal(goldPrice);
			const usdDecimal = ngoldDecimal.times(priceDecimal);
			return {
				formattedNgold: ngoldDecimal.toFixed(6),
				usdValue: usdDecimal.toFixed(2),
			};
		} catch {
			return { formattedNgold: "0", usdValue: "0" };
		}
	}, [balances?.ngold, goldPrice]);

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
		<div className="grid grid-cols-2 gap-2 max-w-2xl mx-auto px-2">
			<BalanceCard
				title="NGOLD Balance"
				mainValue={`${formattedNgold}`}
				subValue={`$ ${usdValue}`}
				isLoading={isLoading}
			/>
			<BalanceCard
				title="Current Gold Price"
				mainValue={`$ ${formatDecimal(goldPrice, 4)}`}
				isLoading={isLoading}
			/>
		</div>
	);
}

export default React.memo(Balances);
