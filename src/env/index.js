import { config } from "dotenv"
import z from "zod"

if(process.env.NODE_ENV === "test"){
  config({path: ".env.test"})
}else{
  config()
}

// Creating env schema
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test",  "production"]).default("production"),
  DATABASE_FILE: z.string()
})

// Parsing env
export const env = envSchema.parse(process.env)