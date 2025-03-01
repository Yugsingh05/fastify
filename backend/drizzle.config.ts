import { defineConfig } from "drizzle-kit";
import "dotenv/config"

export default defineConfig({
    schema: "./src/drizzle/schema.ts",
    out: "./src/drizzle/migrations.ts",
    dialect: "postgresql", 
   
    dbCredentials: {
       url:  process.env?.DATABASE_URL as string, // pg uses connectionString instead of url
    },
    extensionsFilters: ["postgis"],
    verbose: true,
    strict: true,
});
