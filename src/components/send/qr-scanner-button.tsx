"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Scanner } from "@yudiel/react-qr-scanner";
import { Camera } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface QRScannerButtonProps {
	onAddressScanned: (address: string) => void;
}

export function QRScannerButton({ onAddressScanned }: QRScannerButtonProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [isScanning, setIsScanning] = useState(true);

	const handleScan = (results: Array<{ rawValue: string }>) => {
		if (!results.length) return;

		const scannedValue = results[0].rawValue;

		// Basic Ethereum address validation
		if (!/^0x[a-fA-F0-9]{40}$/.test(scannedValue)) {
			toast.error("Invalid wallet address detected");
			return;
		}

		onAddressScanned(scannedValue);
		setIsScanning(false);
		setIsOpen(false);
		toast.success("Address scanned successfully");
	};

	const handleError = (error: unknown) => {
		console.error("QR Scanner error:", error);
		toast.error("Unable to access camera. Please check permissions.");
		setIsOpen(false);
	};

	const handleDialogClose = () => {
		setIsOpen(false);
		setIsScanning(true);
	};

	return (
		<>
			<Button
				variant="ghost"
				size="icon"
				onClick={() => setIsOpen(true)}
				className="absolute right-3 top-1/2 -translate-y-1/2"
			>
				<Camera className="h-4 w-4" />
			</Button>

			<Dialog open={isOpen} onOpenChange={handleDialogClose}>
				<DialogContent className="sm:max-w-md">
					<div className="w-full aspect-square">
						<Scanner
							onScan={handleScan}
							onError={handleError}
							constraints={{
								facingMode: "environment",
							}}
							paused={!isScanning}
							formats={["qr_code"]}
							scanDelay={500}
							components={{
								audio: false,
								torch: true,
								finder: true,
							}}
							styles={{
								container: {
									width: "100%",
									height: "100%",
								},
								video: {
									width: "100%",
									height: "100%",
									objectFit: "cover",
								},
							}}
						/>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
