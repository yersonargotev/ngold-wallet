import Polygon from "@/components/icons/polygon";
import { cn } from "@/lib/utils";

interface TokenBadgeProps {
	icon: React.ReactNode;
	showBridge?: boolean;
	className?: string;
}

const TokenBadge = ({ icon, showBridge, className }: TokenBadgeProps) => {
	return (
		<div className={cn("relative", className)}>
			<div className="h-10 w-10">{icon}</div>
			{showBridge && (
				<div className="absolute -right-1.5 top-0">
					<div className="rounded-full">
						<Polygon className="size-4" />
					</div>
				</div>
			)}
		</div>
	);
};

export default TokenBadge;
