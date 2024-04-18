import { FastifyReply, FastifyRequest } from 'fastify';
import { getUserByLogin } from '../../models/user';
import { checkUserLoggedIn, deleteSession, newSession } from '../../models/user_sessions';
import { CustomError } from '../../utils/CustomError';
import { compareHash } from '../../utils/cryptoService';
import { generateAuthToken, validateToken } from '../../utils/jwtService';
import { loginBodySchema } from './schema';

export class Authenticate{
  public async login(req: FastifyRequest, reply: FastifyReply) {
    try {
      const data = loginBodySchema.safeParse(req.body)
  
      if (data.success) {
        const { login, password } = data.data
        const user =  await getUserByLogin(login);
    
        if (!user) {      
          throw new CustomError({
            code: 404,
            message: "Usuário não encontrado"
          })
        }
        
        const isCorrectPassword = compareHash(user.password, password);
  
        if (!isCorrectPassword) {
          return reply.status(401).send({ message: "Usuário ou senha inválidos" })
        }
        const lastSession = await checkUserLoggedIn(user.id)
          if (lastSession) {
            await deleteSession(lastSession.id)
          }

          const { auth, session_id } = generateAuthToken(user.id)

          const session = {
            id: session_id,
            user_id: user.id,
            logged_in: true,
          }

          await newSession(session)

          return reply.status(200).send({ auth })
      }

      
    } catch (error) {
      if (error instanceof CustomError) { 
        return reply.status(error.code).send({
          message: error.message
        })

      }

      console.error(error)
      reply.status(500).send()
    }
  }

  public async logout(req: FastifyRequest, res: FastifyReply) { 
    const token = req.headers.authorization
    
    if (token) {
      const decode = validateToken(token)
      const sessionId = String(decode.jti)

      await deleteSession(sessionId);    
      
      res.status(200)
    }
  }

}