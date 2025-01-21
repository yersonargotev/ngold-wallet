"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGoldPrice } from "@/hooks/use-gold-price";
import { useWalletProvider } from "@/hooks/use-wallet-provider";
import NGOLDABI from "@/lib/abis/NGOLD.json";
import { ngoldAddress } from "@/lib/constants/env";
import { DECIMALS } from "@/lib/constants/magic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppKitAccount } from "@reown/appkit/react";
import Decimal from "decimal.js";
import { Contract, parseUnits } from "ethers";
import { ArrowDownUp } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Configure Decimal.js for high precision
Decimal.set({ precision: 30, rounding: Decimal.ROUND_DOWN });

const sendFormSchema = z.object({
	address: z.string().min(1, { message: "The address is required" }),
	amount: z.string().min(1, { message: "Amount is required" }),
	usd: z.string().min(1, { message: "Value in USD is required" }),
});

type SendFormValues = z.infer<typeof sendFormSchema>;

export function SendCard() {
	const { isConnected } = useAppKitAccount();
	const { getProvider } = useWalletProvider();
	const { data: goldPrice, isLoading: isLoadingGoldPrice } = useGoldPrice();

	const isLoading = isLoadingGoldPrice;

	const form = useForm<SendFormValues>({
		resolver: zodResolver(sendFormSchema),
		defaultValues: {
			address: "",
			amount: "",
			usd: "",
		},
	});

	// Convert NGOLD amount to USD
	const convertAmountToUsd = (amount: string): string => {
		if (!amount || !goldPrice) return "";
		try {
			const amountDecimal = new Decimal(amount);
			const priceDecimal = new Decimal(goldPrice);
			return amountDecimal.times(priceDecimal).toFixed(2);
		} catch (error) {
			console.error("Error converting amount to USD:", error);
			return "";
		}
	};

	// Convert USD to NGOLD amount
	const convertUsdToAmount = (usd: string): string => {
		if (!usd || !goldPrice) return "";
		try {
			const usdDecimal = new Decimal(usd);
			const priceDecimal = new Decimal(goldPrice);
			return usdDecimal.dividedBy(priceDecimal).toFixed(6);
		} catch (error) {
			console.error("Error converting USD to amount:", error);
			return "";
		}
	};

	// Handle amount field change
	const handleAmountChange = (amount: string) => {
		form.setValue("amount", amount);
		const usdValue = convertAmountToUsd(amount);
		form.setValue("usd", usdValue);
	};

	// Handle USD field change
	const handleUsdChange = (usd: string) => {
		form.setValue("usd", usd);
		const amountValue = convertUsdToAmount(usd);
		form.setValue("amount", amountValue);
	};

	async function onSubmit(values: SendFormValues) {
		console.log("Values: ", values);
		const { signer } = await getProvider();
		const NGOLDContract = new Contract(ngoldAddress, NGOLDABI, signer);

		const amount = parseUnits(values.amount, DECIMALS.NGOLD);
		console.log("Amount: ", amount);
		try {
			const tx = await NGOLDContract.transfer(values.address, amount);
			await tx.wait();

			console.log("Transaction sent successfully");
			toast.success("Transaction sent successfully");
		} catch (error) {
			console.error("Error sending transaction:", error);
			toast.error("Error sending transaction");
		}
	}

	if (!isConnected) return null;

	return (
		<Card className="w-full max-w-sm mx-auto bg-secondary border-0 p-6">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						<div>
							<p className="text-xs mb-1">Address</p>
							<FormField
								control={form.control}
								name="address"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												placeholder="0xe87f...09F5"
												className="bg-background/80"
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>

						<div className="flex flex-col justify-center my-2 bg-background/80 rounded-md p-2">
							<p className="mb-1 font-medium">NGOLD</p>
							<p className="text-xs mb-1 text-muted-foreground">Amount</p>
							<FormField
								control={form.control}
								name="amount"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												className="text-2xl"
												placeholder="2"
												onChange={(e) => handleAmountChange(e.target.value)}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>

						<div className="flex justify-center my-2">
							<ArrowDownUp className="text-muted-foreground" />
						</div>

						<div className="flex flex-col justify-center my-2 bg-background/80 rounded-md p-2">
							<p className="mb-1">USD</p>
							<p className="text-xs mb-1 text-muted-foreground">Equivalence</p>
							<FormField
								control={form.control}
								name="usd"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												className="text-2xl"
												placeholder="$ 170.0"
												onChange={(e) => handleUsdChange(e.target.value)}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
					</div>

					<div className="space-y-2 pt-4">
						<Button
							type="submit"
							className="w-full bg-[#cfb53c] hover:bg-[#cfb53c]/90 font-semibold text-xl text-foreground"
							disabled={isLoading}
						>
							Send
						</Button>
						<Button
							variant="ghost"
							className="w-full text-muted-foreground hover:text-foreground"
							onClick={() => form.reset()}
						>
							Cancel
						</Button>
					</div>
				</form>
			</Form>
		</Card>
	);
}

export default SendCard;
