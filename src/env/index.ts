import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("production"),
  DATABASE_URL: z.string(),
  PORT: z.string().default("80"),
  HOST: z.string().default("localhost"),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("Invalid environmnet variables", _env.error.format());

  throw new Error("Invalid environmnet variables");
}

export const env = _env.data;
