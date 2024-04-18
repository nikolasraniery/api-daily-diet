import { knex } from "../database";
import { Meal } from "../interfaces/Meal";
import { CustomError } from "../utils/CustomError";

type ReturnMeal = {
  id: string;
  name: string;
  description: string;
  in_diet: number;
  time: string;
}

export async function getAllMeals(user_id: string)
  : Promise<{ meals: ReturnMeal[], total: number}> {
  try {
    const meals: ReturnMeal[] = await knex('meals')
      .where({
        user_id
      })
      .select([
        'id',
        'name',
        'description',
        'in_diet',
        'time',
        'created_at',
        'user_id'
      ])
    
    return {
      meals,
      total: meals.length
    }
  } catch (error) { 
    throw error
  }
}

export async function getMeal(id: string, user_id: string): Promise<ReturnMeal>{
  try {
    const meal: ReturnMeal = await knex('meals')
      .where({
        id,
        user_id
      })
      .select([
        'id',
        'name',
        'description',
        'in_diet',
        'time',
        'created_at',
        'user_id'
      ])
      .first()
    
    if (!meal) {
      throw new CustomError({
        code: 500,
        message: 'Refeição não encontrada!'
      })
    }
    
    return meal
  } catch (error) {
    throw error
  }
}
export async function getMealInDiet(in_diet: boolean, user_id: string):
  Promise<{ meals: Array<ReturnMeal>, total: number }>{
  try {
    const meals: ReturnMeal[] = await knex('meals')
      .where({
        in_diet,
        user_id
      })
      .select([
        'id',
        'name',
        'description',
        'in_diet',
        'time',
        'created_at',
        'user_id'
      ])
    
    if (!meals) {
      throw new CustomError({
        code: 500,
        message: 'Refeição não encontrada!'
      })
    }
    
    return {
      meals,
      total: meals.length
    }
  } catch (error) {
    throw error
  }
}

export async function getMealsCount(user_id: string, in_diet?: number): Promise<number>{
  try {
    const mealsCount = await knex("meals").where((builder) => {
      if (in_diet != null) {
        builder.where({
          user_id,
          in_diet
        })
      }

      builder.where({ user_id })      
    }).count({ count: '*' })

    return mealsCount[0].count ?? 0

  } catch (error) {
    throw error
  }
 }


export async function createMeal(meal: Meal) {
  try {
    await knex('meals').insert(meal)

  } catch (error) {
    throw error
  }
}

export async function updateMeal(newMeal: Meal): Promise<ReturnMeal> {
  try {
    const updatedMeal = await knex('meals')
      .where({
        id: newMeal.id,
      })
      .update({
        name: newMeal.name,
        description: newMeal.description,
        in_diet: newMeal.in_diet ? 1 : 0,
        user_id: newMeal.user_id,
        updated_at: new Date().toISOString()
      }, [
        'id',
        'name',
        'description',
        'in_diet',
        'time',
        'created_at',
        'user_id'
      ])
    
    return updatedMeal[0]

  } catch (error) {
    throw error
  }
}

export async function deleteMeal(id: string, user_id: string): Promise<void>{
  try {
    await knex('meals')
      .where({ 
        id,
        user_id
       })
      .del()
    
  } catch (error) {
    throw error 
  }
}