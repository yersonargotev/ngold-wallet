"use client";

import { useAppKitAccount } from "@reown/appkit/react";

export function Tokens() {
	const { isConnected } = useAppKitAccount();

	if (!isConnected) return null;

	const balance = 10;
	const goldPrice = 10;
	const ngoldAmount = 10;

	return (
		<div className="flex flex-col gap-2 w-full">
			<h3 className="text-xl font-medium text-left">Tokens</h3>
			<div className="flex items-center justify-between">
				<div className="flex gap-2 items-center">
					<img src="/logo.webp" alt="NGOLD Logo" width={40} height={40} />
					<div>
						<h3>NGOLD</h3>
						<span>${goldPrice}</span>
					</div>
				</div>
				<div className="flex flex-col gap-2 items-center">
					<h3>${balance}</h3>
					<span className="text-muted-foreground">{ngoldAmount} NGOLD</span>
				</div>
			</div>
			<div className="flex items-center justify-between">
				<div className="flex gap-2 items-center">
					<img
						src="/images/logo-ngold-black.png"
						alt="NGOLD Logo"
						width={40}
						height={40}
					/>
					<div>
						<h3>NGOLD</h3>
						<span>${goldPrice}</span>
					</div>
				</div>
				<div className="flex flex-col gap-2 items-center">
					<h3>${balance}</h3>
					<span className="text-muted-foreground">{ngoldAmount} NGOLD</span>
				</div>
			</div>
			<div className="flex items-center justify-between">
				<div className="flex gap-2 items-center">
					<img
						src="/images/logo-ngold-black.png"
						alt="NGOLD Logo"
						width={40}
						height={40}
					/>
					<div>
						<h3>NGOLD</h3>
						<span>${goldPrice}</span>
					</div>
				</div>
				<div className="flex flex-col gap-2 items-center">
					<h3>${balance}</h3>
					<span className="text-muted-foreground">{ngoldAmount} NGOLD</span>
				</div>
			</div>
		</div>
	);
}
