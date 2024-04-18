import fastifyCors from '@fastify/cors';
import fastify from 'fastify';
import { authenticateRoutes } from './routes/authenticateRoutes';
import { mealsRoutes } from './routes/mealsRoutes';
import { userRoutes } from './routes/userRoutes';


const app = fastify({ logger: true })

app.register(fastifyCors)
app.register(authenticateRoutes)
app.register(userRoutes, {
  prefix: "user"
})
app.register(mealsRoutes, {
  prefix: "meals",
})



app.listen({
  port: 3333,
  host: '0.0.0.0'
})
