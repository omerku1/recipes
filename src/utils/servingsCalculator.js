// Calculate scaled ingredient amounts based on servings
export const scaleIngredient = (ingredient, baseServings, currentServings) => {
  const scale = currentServings / baseServings
  const scaledAmount = ingredient.amount * scale

  // Round to 2 decimal places for display
  const roundedAmount = Math.round(scaledAmount * 100) / 100

  return {
    ...ingredient,
    amount: roundedAmount,
    originalAmount: ingredient.amount,
  }
}

// Scale all ingredients in a recipe
export const scaleRecipe = (recipe, currentServings) => {
  if (!recipe || !recipe.ingredients) return recipe

  const scaledIngredients = recipe.ingredients.map((ingredient) =>
    scaleIngredient(ingredient, recipe.baseServings, currentServings)
  )

  return {
    ...recipe,
    ingredients: scaledIngredients,
    currentServings,
  }
}

// Format ingredient for display
export const formatIngredient = (ingredient) => {
  const amount = ingredient.amount
  const unit = ingredient.unit
  const name = ingredient.name

  // Format amount nicely
  let formattedAmount = amount
  if (amount % 1 === 0) {
    formattedAmount = amount.toString()
  } else if (amount < 1) {
    // Convert to fraction if possible
    if (amount === 0.25) formattedAmount = '¼'
    else if (amount === 0.5) formattedAmount = '½'
    else if (amount === 0.75) formattedAmount = '¾'
    else if (amount === 0.33 || amount === 0.333) formattedAmount = '⅓'
    else if (amount === 0.67 || amount === 0.667) formattedAmount = '⅔'
    else formattedAmount = amount.toFixed(2)
  } else {
    formattedAmount = amount.toFixed(2).replace(/\.?0+$/, '')
  }

  // Build the string
  if (unit) {
    return `${formattedAmount} ${unit} ${name}`
  }
  return `${formattedAmount} ${name}`
}

