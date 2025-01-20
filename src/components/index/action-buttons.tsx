"use client";

import { Ngold } from "@/components/icons/ngold-letter";
import { Button } from "@/components/ui/button";
import { urls } from "@/lib/constants/urls";
import { useAppKitAccount } from "@reown/appkit/react";
import { ArrowDown, ArrowUp, Gift, MoveUpRight } from "lucide-react";
import Link from "next/link";

const actionItems = [
	{
		href: urls.send,
		icon: <ArrowUp className="h-5 w-5" />,
		label: "Send",
		newTab: false,
	},
	{
		href: urls.receive,
		icon: <ArrowDown className="h-5 w-5" />,
		label: "Receive",
		newTab: false,
	},
	{
		href: urls.p2p,
		icon: <Ngold className="h-5 w-5" />,
		label: "Buy",
		newTab: true,
	},
	{
		href: urls.orders,
		icon: <span className="font-medium text-sm">P2P</span>,
		label: "Orders",
		newTab: true,
	},
	{
		href: urls.rewards,
		icon: <Gift className="h-5 w-5" />,
		label: "Rewards",
		newTab: true,
	},
	{
		href: urls.staking,
		icon: <MoveUpRight className="h-5 w-5" />,
		label: "Staking",
		newTab: true,
	},
];

export function ActionButtons() {
	const { isConnected } = useAppKitAccount();

	if (!isConnected) {
		return null;
	}

	return (
		<div className="w-full overflow-x-auto px-4 py-2">
			<div className="flex flex-row gap-4 items-center min-w-max justify-center">
				{actionItems.map((item) => (
					<div
						key={item.label}
						className="flex flex-col gap-2 items-center justify-center"
					>
						<Link
							href={item.href}
							target={item.newTab ? "_blank" : "_self"}
							rel="noreferrer noopener"
							className="transition-transform hover:scale-105"
						>
							<Button
								variant="secondary"
								size="icon"
								className="h-12 w-12 rounded-full shadow-sm hover:shadow-md transition-shadow"
							>
								{item.icon}
							</Button>
						</Link>
						<span className="text-sm text-muted-foreground font-medium">
							{item.label}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
