"use client";

import { DisconnectWallet } from "@/components/shared/disconnect-wallet";
import { useAppKitAccount } from "@reown/appkit/react";
import Image from "next/image";

export function Header() {
	const { isConnected } = useAppKitAccount();
	console.log("Is connected: ", isConnected);
	return (
		<div className="w-full z-10">
			<div className="container max-w-screen-2xl mx-auto">
				<div className="flex items-center justify-between h-14 text-sm w-full px-4">
					<div className="flex items-center gap-2">
						<Image
							src="/images/logo-ngold-white.png"
							alt="NGOLD Logo"
							width={40}
							height={40}
							className="h-6 w-6"
						/>
						<h3 className="text-lg font-bold">NGOLD Wallet</h3>
					</div>
					{isConnected === true && <DisconnectWallet />}
				</div>
			</div>
		</div>
	);
}
