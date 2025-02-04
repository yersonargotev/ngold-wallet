import { Skeleton } from "@/components/ui/skeleton";
import TokenBadge from "./token-badge";

interface TokenRowProps {
	icon: React.ReactNode;
	name: string;
	price?: string;
	balance?: string;
	otherBalance?: string;
	isLoading?: boolean;
	showBridge?: boolean;
}

export const TokenRow = ({
	icon,
	name,
	price,
	balance,
	otherBalance,
	isLoading,
	showBridge,
}: TokenRowProps) => (
	<div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
		<div className="flex gap-3 items-center">
			<TokenBadge icon={icon} showBridge={showBridge} />
			<div className="flex flex-col">
				<h3 className="font-semibold text-base">{name}</h3>
				{isLoading ? (
					<Skeleton className="h-4 w-16" />
				) : (
					<span className="text-sm text-muted-foreground">
						$
						{Number(price ?? 0).toLocaleString(undefined, {
							maximumFractionDigits: 4,
						})}
					</span>
				)}
			</div>
		</div>
		<div className="flex flex-col items-end gap-1">
			{isLoading ? (
				<>
					<Skeleton className="h-5 w-24" />
					<Skeleton className="h-4 w-16" />
				</>
			) : (
				<>
					<span className="font-medium">
						$
						{Number(balance ?? 0).toLocaleString(undefined, {
							maximumFractionDigits: 4,
						})}
					</span>
					<span className="text-sm text-muted-foreground">
						{Number(otherBalance ?? 0).toLocaleString(undefined, {
							maximumFractionDigits: 4,
						})}{" "}
						{name}
					</span>
				</>
			)}
		</div>
	</div>
);
