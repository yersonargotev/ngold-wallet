"use client";

import { Button } from "@/components/ui/button";
import { networks } from "@/lib/config";
import {
	useAppKit,
	useAppKitNetwork,
	useDisconnect,
} from "@reown/appkit/react";

export const ActionButtonList = () => {
	const { disconnect } = useDisconnect();
	const { open } = useAppKit();
	const { switchNetwork } = useAppKitNetwork();
	return (
		<div>
			<Button onClick={() => open()}>Open</Button>
			<Button onClick={() => disconnect()}>Disconnect</Button>
			<Button onClick={() => switchNetwork(networks[1])}>Switch</Button>
		</div>
	);
};
