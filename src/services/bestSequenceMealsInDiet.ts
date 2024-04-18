import { getAllMeals } from "../models/meals";

export async function bestSequenceMealsInDiet(user_id: string) {
  const { meals } = await getAllMeals(user_id)

  let currentSequence = 0
  let bestSequence = 0

  for (const meal of meals) {
    if (meal.in_diet) {
      currentSequence++;
      bestSequence = Math.max(currentSequence, bestSequence)
    } else {
      currentSequence = 0
    }
  }

  return bestSequence
}