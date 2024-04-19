import fastifyCors from "@fastify/cors";
import Fastify from "fastify";
import { env } from "./env";
import { authenticateRoutes } from "./routes/authenticateRoutes";
import { mealsRoutes } from "./routes/mealsRoutes";
import { userRoutes } from "./routes/userRoutes";

const app = Fastify({ logger: true });
const port = Number(env.PORT);

app.register(fastifyCors);
app.register(authenticateRoutes);
app.register(userRoutes, {
  prefix: "user",
});
app.register(mealsRoutes, {
  prefix: "meals",
});

const start = async () => {
  try {
    await app.listen({ port });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
