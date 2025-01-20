"use client";

import { Ngold } from "@/components/icons/ngold-letter";
import { Button } from "@/components/ui/button";
import { urls } from "@/lib/constants/urls";
import { useAppKitAccount } from "@reown/appkit/react";
import { ArrowDown, ArrowUp, Gift, MoveUpRight } from "lucide-react";
import Link from "next/link";

export function ActionButtons() {
	const { isConnected } = useAppKitAccount();
	if (!isConnected) {
		return null;
	}

	return (
		<div className="flex flex-row gap-2 items-center justify-center">
			<div className="flex flex-col gap-2 items-center justify-center">
				<Link href={urls.send} target="_blank" rel="noreferrer noopener">
					<Button variant="secondary" className="rounded-full">
						<ArrowUp />
					</Button>
				</Link>
				<span className="text-muted-foreground">Send</span>
			</div>
			<div className="flex flex-col gap-2 items-center justify-center">
				<Link href={urls.receive} target="_blank" rel="noreferrer noopener">
					<Button variant="secondary" className="rounded-full">
						<ArrowDown />
					</Button>
				</Link>
				<span className="text-muted-foreground">Receive</span>
			</div>
			<div className="flex flex-col gap-2 items-center justify-center">
				<Link href={urls.p2p} target="_blank" rel="noreferrer noopener">
					<Button variant="secondary" className="rounded-full">
						<Ngold />
					</Button>
				</Link>
				<span className="text-muted-foreground">Buy</span>
			</div>
			<div className="flex flex-col gap-2 items-center justify-center">
				<Link href={urls.orders} target="_blank" rel="noreferrer noopener">
					<Button variant="secondary" className="rounded-full">
						<span className="font-medium">P2P</span>
					</Button>
				</Link>
				<span className="text-muted-foreground">Orders</span>
			</div>
			<div className="flex flex-col gap-2 items-center justify-center">
				<Link href={urls.rewards} target="_blank" rel="noreferrer noopener">
					<Button variant="secondary" className="rounded-full">
						<Gift />
					</Button>
				</Link>
				<span className="text-muted-foreground">Orders</span>
			</div>
			<div className="flex flex-col gap-2 items-center justify-center">
				<Link href={urls.staking} target="_blank" rel="noreferrer noopener">
					<Button variant="secondary" className="rounded-full">
						<MoveUpRight />
					</Button>
				</Link>
				<span className="text-muted-foreground">Staking</span>
			</div>
		</div>
	);
}
