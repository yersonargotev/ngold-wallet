import Telegram from "@/components/icons/telegram";
import { Wellcome } from "@/components/index/welcome";
import { InfoList } from "@/components/info-list";
import { AccountInfo } from "@/components/shared/account-info";
import { urls } from "@/lib/constants/urls";
import Link from "next/link";

export default function Home() {
	return (
		<div className="flex flex-col gap-4">
			<AccountInfo />
			<Wellcome />
			<div className="flex flex-col gap-2 items-center justify-center">
				<h3 className="text-lg font-bold text-muted-foreground">Need Help?</h3>
				<div className="flex gap-2 items-center justify-center">
					<Link href={urls.telegram} target="_blank" rel="noreferrer noopener">
						<Telegram className="w-auto h-10" />
					</Link>
				</div>
			</div>
			<InfoList />
		</div>
	);
}
