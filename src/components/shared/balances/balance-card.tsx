"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface BalanceCardProps {
	title: string;
	mainValue: React.ReactNode;
	subValue?: React.ReactNode;
	isLoading: boolean;
}

export const BalanceCard = React.memo(function BalanceCard({
	title,
	mainValue,
	subValue,
	isLoading,
}: BalanceCardProps) {
	return (
		<Card className="bg-muted/50 hover:bg-muted/70 transition-colors duration-200 backdrop-blur-sm px-4">
			<CardHeader className="space-y-1 p-2">
				<CardTitle className="flex flex-col items-center gap-2 text-center text-balance">
					{title}
				</CardTitle>
			</CardHeader>
			<CardContent className="px-2 pb-2">
				{isLoading ? (
					<div className="space-y-2">
						<Skeleton className="h-8 w-32" />
						{subValue && <Skeleton className="h-4 w-24" />}
					</div>
				) : (
					<div className="space-y-1">
						<div className="text-[#cfb53c] font-bold tracking-tight text-center">
							{mainValue}
						</div>
						{subValue && (
							<p className="text-sm text-center text-balance text-muted-foreground">
								{subValue}
							</p>
						)}
					</div>
				)}
			</CardContent>
		</Card>
	);
});
