"use client";

import { Button } from "@/components/ui/button";
import { useDisconnect } from "@reown/appkit/react";

export function DisconnectWallet() {
	const { disconnect } = useDisconnect();

	return (
		<div className="flex flex-col gap-2 items-center justify-center">
			<Button
				onClick={() => disconnect()}
				className="w-full max-w-md font-bold"
				variant="outline"
			>
				Disconnect
			</Button>
		</div>
	);
}
