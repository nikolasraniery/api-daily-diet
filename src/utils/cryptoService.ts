import bcrypt from 'bcrypt';

/**
 * Cria um Hash para a string informada
 * @param password String para que seja criado uma hash
 * @returns string Hash
 */
export function generateHash(password: string) {
  const salt = bcrypt.genSaltSync(10)
  const generatedHash = bcrypt.hashSync(password, salt)

  return generatedHash
}

/**
 * Faz a comparação de duas HASH para ver são iguais
 * @param hash 
 * @param compare 
 * @returns True se forem iguais
 */
export function compareHash(hash: string, compare: string): boolean { 
  const isValid = bcrypt.compareSync(compare, hash)

  return isValid
}