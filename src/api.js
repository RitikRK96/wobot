const BASE = 'https://api.spoonacular.com'
export const API_KEY = import.meta.env.VITE_API_KEY;

export async function searchRecipes(query = '', number = 12) {
  const params = new URLSearchParams({
    apiKey: API_KEY,
    query,
    number,
    addRecipeInformation: 'false'
  })
  const res = await fetch(`${BASE}/recipes/complexSearch?${params}`)
  if (!res.ok) throw new Error('Failed to fetch recipes')
  return res.json()
}

export async function getRecipeDetails(id) {
  const params = new URLSearchParams({
    apiKey: API_KEY,
    includeNutrition: 'false'
  })
  const res = await fetch(`${BASE}/recipes/${id}/information?${params}`)
  if (!res.ok) throw new Error('Failed to fetch recipe details')
  return res.json()
}
