import { useState, useEffect } from 'react'
import { scaleRecipe } from '../utils/servingsCalculator'

// Custom hook for managing recipe scaling
export const useRecipeScaling = (recipe) => {
  const [currentServings, setCurrentServings] = useState(recipe?.baseServings || 1)
  const [scaledRecipe, setScaledRecipe] = useState(recipe)

  useEffect(() => {
    if (recipe) {
      setCurrentServings(recipe.baseServings)
    }
  }, [recipe])

  useEffect(() => {
    if (recipe) {
      const scaled = scaleRecipe(recipe, currentServings)
      setScaledRecipe(scaled)
    }
  }, [recipe, currentServings])

  const increaseServings = () => {
    setCurrentServings((prev) => prev + 1)
  }

  const decreaseServings = () => {
    setCurrentServings((prev) => (prev > 1 ? prev - 1 : 1))
  }

  const setServings = (servings) => {
    if (servings >= 1) {
      setCurrentServings(servings)
    }
  }

  return {
    currentServings,
    scaledRecipe,
    increaseServings,
    decreaseServings,
    setServings,
  }
}

