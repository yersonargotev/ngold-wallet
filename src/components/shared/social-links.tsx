import Telegram from "@/components/icons/telegram";
import { urls } from "@/lib/constants/urls";
import Link from "next/link";

export function SocialLinks() {
	return (
		<div className="flex flex-col gap-2 items-center justify-center">
			<h3 className="text-lg font-bold text-muted-foreground">Need Help?</h3>
			<div className="flex gap-2 items-center justify-center">
				<Link href={urls.telegram} target="_blank" rel="noreferrer noopener">
					<Telegram className="w-auto h-10" />
				</Link>
			</div>
		</div>
	);
}
