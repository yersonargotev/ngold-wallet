"use client";

import { ConnectWallet } from "@/components/shared/connect-wallet";
import { useAppKitAccount } from "@reown/appkit/react";

export function Wellcome() {
	const { isConnected } = useAppKitAccount();

	if (isConnected) {
		return null;
	}

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-3xl font-bold text-center text-balance">
				Welcome to NGOLD Wallet
			</h1>

			<ConnectWallet />
		</div>
	);
}
