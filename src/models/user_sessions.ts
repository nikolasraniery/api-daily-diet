import { knex } from "../database";

interface Session{
  user_id: string;
  id: string;
  logged_in: boolean;
  
}

export async function newSession(session: Session) {
  try {
    await knex('users_session').insert({
      ...session,
      logged_in: session.logged_in ? 1 : 0
    })
    } catch (error) { 
    throw error
  }
}

export async function checkUserLoggedIn(user_id: string): Promise<Session | undefined>  {
  try {
    const session = await knex('users_session')
      .select('*')
      .where({
        user_id
      })
      .first();
    
    
    return session

  } catch (error) {
    throw error
  }
}

export async function getSession(sessionId: string): Promise<Session | undefined> {
  try {
    const session = await knex('users_session')
    .select('*')
    .where({
      id: sessionId
    })
    .first()

    return session
  } catch (error) {
    throw error
  }
}

export async function deleteSession(sessionId: string) { 
  try {
    await knex('users_session').delete().where({
      id: sessionId
    })
  } catch (error) {
    throw error
  }
}