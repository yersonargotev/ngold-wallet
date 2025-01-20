import { chain } from "@/lib/constants/magic";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { BrowserProvider, type Eip1193Provider } from "ethers";
import { useCallback, useState } from "react";

export const useWalletProvider = () => {
	const { isConnected } = useAppKitAccount();
	const { walletProvider } = useAppKitProvider(chain);
	const [error, setError] = useState<Error | null>(null);

	const getProvider = useCallback(async () => {
		try {
			if (!isConnected) {
				throw new Error("Wallet not connected");
			}

			if (!walletProvider) {
				throw new Error("Provider not available");
			}

			const provider = new BrowserProvider(walletProvider as Eip1193Provider);
			const signer = await provider.getSigner();

			return { provider, signer };
		} catch (err) {
			setError(err as Error);
			throw err;
		}
	}, [isConnected, walletProvider]);

	const resetError = useCallback(() => {
		setError(null);
	}, []);

	return {
		getProvider,
		error,
		resetError,
		isReady: isConnected && !!walletProvider,
	};
};
