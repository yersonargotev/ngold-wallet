import type { JSX, SVGProps } from "react";

const Tether = ({
	className,
	...props
}: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 50 41"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={className}
		{...props}
	>
		<title>Tether</title>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M10.55 0h27.9a1.86 1.86 0 0 1 1.613.934l8.13 14.146c.42.733.296 1.66-.306 2.254L25.513 39.471a1.86 1.86 0 0 1-2.616 0L.553 17.364a1.865 1.865 0 0 1-.278-2.3L8.964.89A1.86 1.86 0 0 1 10.55 0m24.298 6.316v3.969H26.9v2.752c5.582.294 9.77 1.502 9.802 2.95v3.017c-.032 1.448-4.22 2.656-9.802 2.95v6.753h-5.277v-6.753c-5.582-.294-9.77-1.502-9.801-2.95v-3.018c.03-1.447 4.219-2.655 9.8-2.95v-2.751h-7.947v-3.97zM24.262 19.88c5.957 0 10.936-1.022 12.154-2.386-1.033-1.156-4.77-2.067-9.516-2.317v2.882a50 50 0 0 1-5.277 0v-2.881c-4.745.25-8.483 1.16-9.516 2.316 1.218 1.364 6.198 2.386 12.155 2.386"
			fill="#009393"
		/>
	</svg>
);

export default Tether;
