"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppKitAccount } from "@reown/appkit/react";
import { Copy } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";

const WalletQR = ({ title = "Receive" }: { title?: string }) => {
	const { address } = useAppKitAccount();

	const truncateAddress = (addr: string) => {
		return `${addr.slice(0, 6)}....${addr.slice(-4)}`;
	};

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(address ?? "");
			toast.success("Address copied!");
		} catch (err) {
			console.error("Failed to copy address:", err);
			toast.error("Failed to copy");
		}
	};

	return (
		<Card className="w-full max-w-sm mx-auto bg-card">
			<CardHeader className="text-center">
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col items-center space-y-4">
				<div className="bg-white p-4 rounded-lg">
					<QRCodeSVG
						value={address ?? ""}
						size={200}
						level="H"
						className="w-full h-full"
					/>
				</div>

				<div className="flex items-center space-x-2">
					<code className="bg-muted px-2 py-1 rounded text-sm">
						{truncateAddress(address ?? "")}
					</code>
					<Button
						variant="ghost"
						size="icon"
						onClick={copyToClipboard}
						className="h-8 w-8"
					>
						<Copy className="h-4 w-4" />
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default WalletQR;
