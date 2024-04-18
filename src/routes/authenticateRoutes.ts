import { FastifyInstance } from "fastify";
import { Authenticate } from "../controllers/Authenticate/Auth";

const authController = new Authenticate()

export async function authenticateRoutes(app: FastifyInstance) {
  app.post('/login', authController.login)
  app.get('/logout', authController.logout)
}