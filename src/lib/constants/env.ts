import { z } from "zod";

// Primero, hacemos una única lectura de todas las variables que necesitamos
const processEnv = {
	NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
	NODE_ENV: process.env.NODE_ENV,
	NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
	NEXT_PUBLIC_USDT_ADDRESS: process.env.NEXT_PUBLIC_USDT_ADDRESS,
	NEXT_PUBLIC_NGOLD_ADDRESS: process.env.NEXT_PUBLIC_NGOLD_ADDRESS,
	NEXT_PUBLIC_GOLD_ADDRESS: process.env.NEXT_PUBLIC_GOLD_ADDRESS,
	NEXT_PUBLIC_POLYGON_ADDRESS: process.env.NEXT_PUBLIC_POLYGON_ADDRESS,
} as const; // usando 'as const' para mayor seguridad de tipos

// Define el esquema de validación
const envSchema = z.object({
	NEXT_PUBLIC_PROJECT_ID: z
		.string({
			required_error: "Project ID is required in environment variables",
		})
		.min(1, "Project ID cannot be empty"),
	NODE_ENV: z
		.enum(["development", "production", "test"])
		.default("development"),
	NEXT_PUBLIC_URL: z.string().url("NEXT_PUBLIC_URL must be a valid URL"),
	NEXT_PUBLIC_USDT_ADDRESS: z
		.string()
		.min(1, { message: "USDT address is required" }),
	NEXT_PUBLIC_NGOLD_ADDRESS: z
		.string()
		.min(1, { message: "NGOLD address is required" }),
	NEXT_PUBLIC_GOLD_ADDRESS: z
		.string()
		.min(1, { message: "GOLD address is required" }),
	NEXT_PUBLIC_POLYGON_ADDRESS: z
		.string()
		.min(1, { message: "Polygon address is required" }),
});

// Tipo inferido del esquema
type Env = z.infer<typeof envSchema>;

// Función para validar las variables de entorno
function validateEnv(): Env {
	try {
		// Validamos usando el objeto que ya tenemos en memoria
		const env = envSchema.parse(processEnv);
		return env;
	} catch (error) {
		if (error instanceof z.ZodError) {
			const errorMessages = error.issues.map((issue) => issue.message);
			throw new Error(
				`Invalid environment variables: ${errorMessages.join(", ")}`,
			);
		}
		throw error;
	}
}

// Validamos una sola vez al inicio y guardamos el resultado
const env = validateEnv();

// Congelamos el objeto para prevenir modificaciones accidentales
const validatedEnv = Object.freeze(env);

// Exportamos el objeto congelado
export default validatedEnv;

// También podemos exportar variables individuales si lo preferimos
export const {
	NEXT_PUBLIC_PROJECT_ID: projectId,
	NEXT_PUBLIC_URL: url,
	NEXT_PUBLIC_USDT_ADDRESS: usdtAddress,
	NEXT_PUBLIC_NGOLD_ADDRESS: ngoldAddress,
	NEXT_PUBLIC_GOLD_ADDRESS: goldAddress,
	NEXT_PUBLIC_POLYGON_ADDRESS: polygonAddress,
} = validatedEnv;
