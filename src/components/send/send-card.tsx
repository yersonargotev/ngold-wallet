"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppKitAccount } from "@reown/appkit/react";
import { ArrowDownUp } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const sendFormSchema = z.object({
	address: z.string().min(1, { message: "The address is required" }),
	amount: z.string().min(1, { message: "Amount is required" }),
	usd: z.string().min(1, { message: "Value in USD is required" }),
});

type SendFormValues = z.infer<typeof sendFormSchema>;

export function SendCard() {
	const { isConnected } = useAppKitAccount();

	const form = useForm<SendFormValues>({
		resolver: zodResolver(sendFormSchema),
		defaultValues: {
			address: "",
			amount: "",
			usd: "",
		},
	});

	function onSubmit(values: SendFormValues) {
		console.log(values);
		// Aquí iría la lógica de envío
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
												className="border-0 text-2xl"
												placeholder="2"
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
												className="border-0 text-2xl"
												placeholder="$ 170.0"
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
