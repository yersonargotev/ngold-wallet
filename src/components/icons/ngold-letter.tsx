import type { JSX, SVGProps } from "react";

const Ngold = ({
	className,
	...props
}: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 800 800"
		className={className}
		{...props}
	>
		<title>NGOLD</title>
		<circle cx={400} cy={400} r={350} fill="black" />
		<circle
			cx={400}
			cy={400}
			r={350}
			fill="none"
			stroke="currentColor"
			strokeWidth={20}
		/>
		<g
			transform="translate(125,620) scale(0.06,-0.06)"
			fill="currentColor"
			stroke="none"
		>
			<path d="M1250 6852 c0 -4 28 -41 63 -83 34 -41 150 -183 257 -314 107 -131 221 -269 253 -307 l57 -70 0 -533 c0 -477 -2 -534 -16 -539 -9 -3 -287 -6 -619 -6 -470 0 -605 -3 -613 -12 -8 -11 -88 -153 -179 -318 -93 -169 -199 -360 -262 -472 -39 -71 -71 -132 -71 -138 0 -7 292 -10 864 -10 475 0 871 -3 880 -6 14 -5 16 -54 16 -439 0 -293 -3 -436 -11 -440 -5 -4 -286 -9 -623 -12 l-614 -6 -138 -250 c-77 -138 -155 -280 -175 -316 -58 -106 -144 -262 -173 -313 -14 -26 -26 -52 -26 -57 0 -8 272 -12 878 -13 l877 -3 3 -847 2 -848 640 0 640 0 0 2171 0 2172 128 -194 c298 -450 594 -897 824 -1244 134 -203 350 -530 480 -725 129 -195 351 -530 493 -745 142 -214 386 -583 543 -820 156 -236 311 -472 345 -522 l62 -93 637 0 638 0 0 850 0 850 863 0 c475 0 867 3 870 7 4 3 -4 25 -17 47 -13 23 -45 82 -71 131 -26 50 -51 95 -55 100 -7 10 -29 48 -98 175 -19 36 -75 136 -124 224 -48 87 -88 160 -88 162 0 2 -13 26 -30 52 l-30 49 -599 5 c-330 3 -604 9 -610 12 -8 5 -11 138 -11 441 0 385 2 434 16 439 9 3 400 6 870 6 470 0 854 3 854 6 0 3 -48 92 -106 197 -107 192 -126 226 -192 347 -139 253 -215 386 -225 392 -7 4 -276 8 -599 8 -322 0 -593 3 -602 6 -14 6 -16 97 -16 930 l0 924 -635 0 -635 0 0 -2165 c0 -1725 -3 -2165 -12 -2165 -7 0 -49 56 -93 123 -44 67 -206 313 -360 547 -155 234 -339 513 -410 620 -71 107 -233 353 -360 545 -216 326 -331 500 -720 1090 -84 127 -266 403 -406 615 -140 212 -315 476 -388 588 l-134 202 -953 0 c-525 0 -954 -3 -954 -8z" />
		</g>
	</svg>
);

export { Ngold };
