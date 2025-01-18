"use client";

export function ConnectButton() {
	return (
		<div>
			<div>
				{/* @ts-expect-error appkit-button is a web component that TypeScript doesn't recognize */}
				<appkit-button />
			</div>
		</div>
	);
}
