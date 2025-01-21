import Decimal from "decimal.js";
import { useMemo } from "react";

interface TokenPricesBalances {
	usdt: string | undefined;
	ngold: string | undefined;
	pol: string | undefined;
	usdtPrice: string | undefined;
	ngoldPrice: string | undefined;
	polPrice: string | undefined;
}

Decimal.set({ precision: 30, rounding: Decimal.ROUND_DOWN });

export function useTokenPricesBalances(values: TokenPricesBalances) {
	return useMemo(() => {
		const calculateTokenBalance = (balance?: string, price?: string) => {
			if (!balance || !price) return undefined;

			try {
				const rawBalance = new Decimal(balance);
				const priceDecimal = new Decimal(price);
				const usdValue = rawBalance.times(priceDecimal);

				return {
					formatted: rawBalance.toFixed(6),
					raw: rawBalance,
					usdValue: usdValue.toFixed(2),
				};
			} catch (error) {
				console.error(`Error calculating balance: ${error}`);
				return undefined;
			}
		};

		return {
			usdt: calculateTokenBalance(values.usdt, values.usdtPrice),
			ngold: calculateTokenBalance(values.ngold, values.ngoldPrice),
			pol: calculateTokenBalance(values.pol, values.polPrice),
		};
	}, [values]);
}
