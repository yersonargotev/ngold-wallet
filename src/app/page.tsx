import { ActionButtons } from "@/components/index/action-buttons";
import Tokens from "@/components/index/tokens";
import { Wellcome } from "@/components/index/welcome";
import { AccountInfo } from "@/components/shared/account-info";
import { SocialLinks } from "@/components/shared/social-links";

export default function Home() {
	return (
		<div className="flex flex-col gap-4">
			<AccountInfo />
			<ActionButtons />
			<Tokens />
			<Wellcome />
			<SocialLinks />
		</div>
	);
}
