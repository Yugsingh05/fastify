import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const User = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),  // Ensure defaultRandom() is applied
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
});
