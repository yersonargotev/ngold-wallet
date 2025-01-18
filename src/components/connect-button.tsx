"use client";

import { Button } from "@/components/ui/button";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useAccount } from "wagmi";

const compactHash = (hash: string) => {
	return `${hash.slice(0, 7)}...${hash.slice(-5)}`;
};

export const ConnectButton = () => {
	const wagmiAccount = useAccount();
	const account = useAppKitAccount();
	const { open } = useAppKit();

	const compactAddress = compactHash(account.address || "");
	const compactAddressWagmi = compactHash(wagmiAccount.address || "");

	return (
		<div className="flex flex-col gap-3 p-4 rounded-lg border border-gray-200 bg-white shadow-sm">
			<div className="flex flex-col gap-1.5">
				<span className="text-sm text-gray-600">
					AppKit Account:
					<span className="ml-2 font-mono text-black">{compactAddress}</span>
				</span>
				<span className="text-sm text-gray-600">
					Wagmi Account:
					<span className="ml-2 font-mono text-black">
						{compactAddressWagmi}
					</span>
				</span>
			</div>

			<div className="flex flex-col gap-2">
				{/* @ts-expect-error appkit-button is a web component that TypeScript doesn't recognize */}
				<appkit-button />
				<Button
					onClick={() => open()}
					className="w-full hover:bg-gray-800 transition-colors"
				>
					Open Connect Modal
				</Button>
			</div>
		</div>
	);
};
