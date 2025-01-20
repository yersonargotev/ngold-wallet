"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import * as jazzicon from "@metamask/jazzicon";
import makeBlockie from "ethereum-blockies-base64";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface AddressIdenticonProps {
	address: string;
	type?: "jazzicon" | "blockie";
	size?: number;
}

const AddressIdenticon = ({
	address,
	type = "jazzicon", // 'jazzicon' o 'blockie'
	size = 100, // tamaño en píxeles
}: AddressIdenticonProps) => {
	const jazziconRef = useRef<HTMLDivElement>(null);
	const [iconType, setIconType] = useState(type);

	useEffect(() => {
		if (!address) return;

		if (iconType === "jazzicon") {
			if (jazziconRef.current) {
				// Limpiar el contenido anterior
				while (jazziconRef.current.firstChild) {
					jazziconRef.current.firstChild.remove();
				}

				// Generar nuevo Jazzicon
				const seed = Number.parseInt(address.slice(2, 10), 16);
				const element = jazzicon.default(size, seed);
				jazziconRef.current.appendChild(element);
			}
		}
	}, [address, size, iconType]);

	if (!address) return null;

	return (
		<div className="p-4 flex flex-col items-center gap-4">
			<Select
				value={iconType}
				onValueChange={(value: "jazzicon" | "blockie") => setIconType(value)}
			>
				<SelectTrigger className="w-32">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="jazzicon">Jazzicon</SelectItem>
					<SelectItem value="blockie">Blockie</SelectItem>
				</SelectContent>
			</Select>

			<div className="flex items-center justify-center">
				{iconType === "jazzicon" ? (
					<div
						ref={jazziconRef}
						style={{
							height: size,
							width: size,
							borderRadius: "50%",
						}}
					/>
				) : (
					<Image
						src={makeBlockie(address)}
						alt="Blockie"
						style={{
							height: size,
							width: size,
							borderRadius: "8px",
						}}
					/>
				)}
			</div>
		</div>
	);
};

export default AddressIdenticon;
