"use client";

import { Button } from "@/components/ui/button";
import { useAppKit } from "@reown/appkit/react";

export function ConnectButton() {
	const { open } = useAppKit();

	return (
		<div>
			<div>
				<Button onClick={() => open()}>Open Connect Modal</Button>
				<Button onClick={() => open({ view: "Networks" })}>
					Open Network Modal
				</Button>
			</div>
			<div>
				{/* @ts-expect-error appkit-button is a web component that TypeScript doesn't recognize */}
				<appkit-button />
			</div>
		</div>
	);
}
