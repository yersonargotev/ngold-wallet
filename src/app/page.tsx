"use client";

import { ActionButtonList } from "@/components/action-button-list";
import { InfoList } from "@/components/info-list";

export default function Home() {
	return (
		<div className="page-container">
			<h1 className="page-title">Wallet NGOLD</h1>

			<ActionButtonList />
			<InfoList />
		</div>
	);
}
