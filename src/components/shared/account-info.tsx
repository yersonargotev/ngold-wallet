"use client";

import AddressIdenticon from "@/components/shared/address-identicon";
import { useAppKitAccount } from "@reown/appkit/react";
import { useState } from "react";
import { Balances } from "./balances";

function shortenAddress(address: string) {
	return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function AccountInfo() {
	const [copied, setCopied] = useState(false);
	const { address } = useAppKitAccount();

	if (!address) {
		return null;
	}

	const copyAddress = () => {
		navigator.clipboard.writeText(address ?? "");
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="flex flex-col gap-2 items-center justify-center">
			<AddressIdenticon address={address} />
			<button type="button" onClick={copyAddress}>
				<span className="text-muted-foreground">
					{shortenAddress(address ?? "")}
				</span>
			</button>
			{copied && <span className="text-muted-foreground">Copied!</span>}
			<Balances />
		</div>
	);
}
