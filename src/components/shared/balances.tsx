"use client";

import { Card } from "@/components/ui/card";
import {
	useAppKitAccount,
	useAppKitProvider,
	useAppKitState,
} from "@reown/appkit/react";
import {
	BrowserProvider,
	Contract,
	Eip1193Provider,
	formatUnits,
} from "ethers";

const USDTAddress = "0x617f3112bf5397D0467D315cC709EF968D9ba546";

// The ERC-20 Contract ABI, which is a common contract interface
// for tokens (this is the Human-Readable ABI format)
const USDTAbi = [
	"function name() view returns (string)",
	"function symbol() view returns (string)",
	"function balanceOf(address) view returns (uint)",
	"function transfer(address to, uint amount)",
	"event Transfer(address indexed from, address indexed to, uint amount)",
];

export function Balances() {
	const { activeChain } = useAppKitState();
	const { address, caipAddress, isConnected } = useAppKitAccount();

	const { walletProvider } = useAppKitProvider(activeChain);

	async function getBalance() {
		if (!isConnected) throw Error("User disconnected");

		const ethersProvider = new BrowserProvider(
			walletProvider as Eip1193Provider,
		);
		const signer = await ethersProvider.getSigner();
		// The Contract object
		const USDTContract = new Contract(USDTAddress, USDTAbi, signer);
		const USDTBalance = await USDTContract.balanceOf(address);

		console.log(formatUnits(USDTBalance, 18));
	}

	return (
		// <button type="button" onClick={getBalance}>
		// 	Get User Balance
		// </button>
		<div className="flex flex-row gap-2 md:gap-6 w-full items-center justify-center p-2 max-w-sm">
			<Card className="p-4 max-w-sm border-0 bg-muted w-full">
				<div className="flex flex-col items-center gap-2">
					<h3> NGOLD Balance</h3>
					<p className="text-sm text-center">5 NGOLD</p>
				</div>
			</Card>
			<Card className="p-4 max-w-sm border-0 bg-muted w-full">
				<div className="flex flex-col items-center gap-2">
					<h3> USDT Balance</h3>
					<p className="text-sm text-center">5 USDT</p>
				</div>
			</Card>
		</div>
	);
}
