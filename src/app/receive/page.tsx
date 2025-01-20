import WalletQR from "@/components/receive/wallet-qr";
import { SocialLinks } from "@/components/shared/social-links";

export default function Send() {
	return (
		<div className="flex flex-col gap-4 mt-12">
			<WalletQR />
			<SocialLinks />
		</div>
	);
}
