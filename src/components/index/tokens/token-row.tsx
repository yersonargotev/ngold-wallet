import { Skeleton } from "@/components/ui/skeleton";

interface TokenRowProps {
	icon: React.ReactNode;
	name: string;
	price?: string;
	balance?: string;
	otherBalance?: string;
	isLoading?: boolean;
}

export const TokenRow = ({
	icon,
	name,
	price,
	balance,
	otherBalance,
	isLoading,
}: TokenRowProps) => (
	<div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
		<div className="flex gap-3 items-center">
			<div className="flex-shrink-0">{icon}</div>
			<div className="flex flex-col">
				<h3 className="font-semibold text-base">{name}</h3>
				{isLoading ? (
					<Skeleton className="h-4 w-16" />
				) : (
					<span className="text-sm text-muted-foreground">
						${price ?? "0.00"}
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
					<span className="font-medium">${balance ?? "0.00"}</span>
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
