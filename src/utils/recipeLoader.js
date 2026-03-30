// Load all recipes at build time using Vite's import.meta.glob
const recipeModules = import.meta.glob('/src/data/recipes/*.json', { eager: true })

// Transform the modules into a usable array of recipes
export const getAllRecipes = () => {
  const recipes = Object.keys(recipeModules).map((path) => {
    return recipeModules[path].default || recipeModules[path]
  })
  return recipes
}

// Get a single recipe by ID
export const getRecipeById = (id) => {
  const recipes = getAllRecipes()
  return recipes.find((recipe) => recipe.id === id)
}

// Get all unique tags from all recipes
export const getAllTags = () => {
  const recipes = getAllRecipes()
  const tagsSet = new Set()
  recipes.forEach((recipe) => {
    recipe.tags.forEach((tag) => tagsSet.add(tag))
  })
  return Array.from(tagsSet).sort()
}

// Get all unique categories from all recipes
export const getAllCategories = () => {
  const recipes = getAllRecipes()
  const categoriesSet = new Set()
  recipes.forEach((recipe) => {
    if (recipe.category) {
      categoriesSet.add(recipe.category)
    }
  })
  return Array.from(categoriesSet).sort()
}

// Filter recipes by category
export const filterRecipesByCategory = (category, recipes) => {
  if (!category) return recipes
  return recipes.filter((recipe) => recipe.category === category)
}

// Search recipes by name or ingredients
export const searchRecipes = (query, recipes) => {
  if (!query) return recipes

  const lowerQuery = query.toLowerCase()
  return recipes.filter((recipe) => {
    // Search in recipe name
    if (recipe.name.toLowerCase().includes(lowerQuery)) {
      return true
    }
    // Search in ingredients
    return recipe.ingredients.some((ingredient) =>
      ingredient.name.toLowerCase().includes(lowerQuery)
    )
  })
}

// Filter recipes by tags
export const filterRecipesByTags = (selectedTags, recipes) => {
  if (!selectedTags || selectedTags.length === 0) return recipes

  return recipes.filter((recipe) =>
    selectedTags.every((tag) => recipe.tags.includes(tag))
  )
}

