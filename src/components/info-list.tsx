"use client";

import {
	useAppKitAccount,
	useAppKitEvents,
	useAppKitState,
	useAppKitTheme,
	useWalletInfo,
} from "@reown/appkit/react";
import { useEffect } from "react";

export const InfoList = () => {
	const kitTheme = useAppKitTheme();
	const state = useAppKitState();
	const { address, caipAddress, isConnected, status } = useAppKitAccount();
	const events = useAppKitEvents();
	const walletInfo = useWalletInfo();

	useEffect(() => {
		console.log("Events: ", events);
	}, [events]);

	return (
		<div>
			<section>
				<h2>useAppKit</h2>
				<pre>
					Address: {address}
					<br />
					caip Address: {caipAddress}
					<br />
					Connected: {isConnected.toString()}
					<br />
					Status: {status}
					<br />
				</pre>
			</section>

			<section>
				<h2>Theme</h2>
				<pre>
					Theme: {kitTheme.themeMode}
					<br />
				</pre>
			</section>

			<section>
				<h2>State</h2>
				<pre>
					activeChain: {state.activeChain}
					<br />
					loading: {state.loading.toString()}
					<br />
					open: {state.open.toString()}
					<br />
					{JSON.stringify(state, null, 2)}
				</pre>
			</section>

			<section>
				<h2>WalletInfo</h2>
				<pre>
					Name: {walletInfo.walletInfo?.name?.toString()}
					<br />
					{JSON.stringify(walletInfo, null, 2)}
				</pre>
			</section>
		</div>
	);
};
