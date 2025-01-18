"use client";

import { useAccount } from "wagmi";

import { Button } from "@/components/ui/button";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";

const compactHash = (hash: string) => {
	return `${hash.slice(0, 7)}...${hash.slice(-5)}`;
};

export const ConnectButton = () => {
	const wagmiAccount = useAccount();
	const account = useAppKitAccount();

	const compactAddress = compactHash(account.address || "");
	const compactAddressWagmi = compactHash(wagmiAccount.address || "");

	const { open } = useAppKit();

	return (
		<div className="column">
			<span className="text-black">useAppKitAccount: {compactAddress}</span>
			<span className="text-black">
				useAccount (wagmi): {compactAddressWagmi}
			</span>
			{/* @ts-expect-error appkit-button is a web component that TypeScript doesn't recognize */}
			<appkit-button />
			<Button onClick={() => open()}>Open Connect Modal</Button>
		</div>
	);
};
