import { FastifyInstance } from "fastify";
import { User } from "../controllers/User/User";
import { authorize } from "../middlewares/authorization";

const userController = new User()

export async function userRoutes(app: FastifyInstance) {

  app.post('/', userController.register)
  app.get('/', {
    preHandler: authorize,
  },userController.getUser)
  app.patch('/:id', {
    preHandler: authorize
  },userController.updateUser)
}