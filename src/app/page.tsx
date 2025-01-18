import { ActionButtonList } from "@/components/action-button-list";
import { ConnectButton } from "@/components/connect-button";
import { InfoList } from "@/components/info-list";
export default function Home() {
	return (
		<div className={"pages"}>
			<h1>AppKit ethers Next.js App Router Example</h1>

			<div>
				<ConnectButton />
			</div>
			<div>
				<ActionButtonList />
			</div>
			<InfoList />
		</div>
	);
}
