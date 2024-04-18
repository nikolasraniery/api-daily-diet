import jwt from 'jsonwebtoken';
import { generateShortUUID } from './generateShorUUID';

/**
 * Valida um tokenJWT enviado.
 * @param token Token para validar
 * @param maxAge Numero maximo para validade do token em dias (Default: 30)
 * @returns Conteudo do token
 */
export function validateToken(token: string, maxAge: number = 30) {
  try {
    const decode = jwt.verify(token,
      'secret',
      {
        maxAge: `${maxAge} days`,
      }
    ) as jwt.JwtPayload
  
    return decode
    
  } catch (error) {
    throw error
  }
}

/**
 * Gera um token JWT
 * @param content Conteudo do token
 * @param tokenId Id para o token (Opcional)
 * @returns token JWT
 */
export function generateToken<ContentType>(content: ContentType, tokenId?: string) {
  const token = jwt.sign({
    content,
    }, 'secret', {
    jwtid: tokenId
  })

  return token
}

export function generateAuthToken(userId: string, sessionId?: string): { auth: string, session_id: string} {
  const tokenId = generateShortUUID()
  const token = generateToken<{ user_id: string}>({ user_id: userId}, tokenId)

  return {
    auth: token,
    session_id: sessionId ?? tokenId
  };
}