const port = Number(process.env.PORT) || 3000;
import Fastify from "fastify";
import { v4 as uuidv4 } from "uuid";

const fastify = Fastify({
  logger: true,
});
import cors from "@fastify/cors";
import { db } from "./src/drizzle/index";
import { User } from "./src/drizzle/schema";
import { eq, isNull } from "drizzle-orm";

// Enable CORS
fastify.register(cors, {
  origin: "*", // Change this for security
  methods: ["GET", "POST"],
});

// Declare a route
fastify.get("/", async (request, reply) => {
  // const users = await db.query.User.findMany();
  // console.log(users);
  reply.send({ hello: "world" });
  // await db.select().from(users);
});

// POST route with JSON parsing
fastify.post("/login", async (request, reply) => {
  const { email, name, password } = request.body as {
    email: string;
    name: string;
    password: string;
  };

  if (!email) {
    return reply.status(400).send({ message: "Email is required" });
  } else if (!name) {
    return reply.status(400).send({ message: "Name is required" });
  } else if (!password) {
    return reply.status(400).send({ message: "Password is required" });
  }

  const exisistingEmail = await db.query.User.findFirst({
    where: eq(User.email, email),
  })

  if (exisistingEmail) {
    return reply.status(400).send({ message: "Email already exists" });
  }

  reply.send({success: true, message: "Login successful", data : {
    name, email, password 
  }});
  try {
    await db.insert(User).values({
      id: uuidv4(),
      email,
      name,
      password,
    });
  } catch (error) {
    console.log(error);
  }
  console.log(email, name);
});

// Start server
fastify.listen({ port: port, host: "0.0.0.0" }, async function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // const usersWithNullId = await db.select().from(User).where(isNull(User.id)).execute();

  // if (usersWithNullId.length > 0) {
  //   await db.delete(User).where(isNull(User.id)).execute();
  // }

  const users = await db.query.User.findMany();
  console.log(users);
  console.log(`Server listening on ${address}`);
});
