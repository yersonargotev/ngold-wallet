"use client";

import { Button } from "@/components/ui/button";
import { useAppKit } from "@reown/appkit/react";

export function ConnectWallet() {
	const { open } = useAppKit();

	return (
		<div className="flex flex-col gap-2 items-center justify-center">
			<Button
				onClick={() => open({ view: "Connect" })}
				className="max-w-md font-bold"
			>
				Connect Wallet
			</Button>
		</div>
	);
}
