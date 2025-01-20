import { SendCard } from "@/components/send/send-card";
import { AccountInfo } from "@/components/shared/account-info";
import { SocialLinks } from "@/components/shared/social-links";

export default function Send() {
	return (
		<div className="flex flex-col gap-4">
			<AccountInfo />
			<h1 className="text-3xl font-bold text-center">Send</h1>
			<SendCard />
			<SocialLinks />
		</div>
	);
}
