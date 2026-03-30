import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getRecipeById } from '../utils/recipeLoader'
import { useRecipeScaling } from '../hooks/useRecipeScaling'
import { useWakeLock } from '../hooks/useWakeLock'
import ServingsControl from '../components/ServingsControl'
import IngredientList from '../components/IngredientList'
import PreparationSteps from '../components/PreparationSteps'
import './RecipePage.css'

function RecipePage() {
  const { recipeId } = useParams()
  const recipe = getRecipeById(recipeId)
  const [cookingMode, setCookingMode] = useState(false)

  const {
    currentServings,
    scaledRecipe,
    increaseServings,
    decreaseServings,
  } = useRecipeScaling(recipe)

  const { isSupported, isActive, requestWakeLock, releaseWakeLock } = useWakeLock()

  if (!recipe) {
    return (
      <div className="recipe-page error">
        <div className="error-content">
          <h2>מתכון לא נמצא</h2>
          <p>המתכון שחיפשת לא קיים.</p>
          <Link to="/" className="back-link">→ חזרה למתכונים</Link>
        </div>
      </div>
    )
  }

  const toggleCookingMode = () => {
    const newMode = !cookingMode
    setCookingMode(newMode)

    if (newMode) {
      // Entering cooking mode - request wake lock
      if (isSupported) {
        requestWakeLock()
      }
    } else {
      // Exiting cooking mode - release wake lock
      if (isActive) {
        releaseWakeLock()
      }
    }
  }

  return (
    <div className={`recipe-page ${cookingMode ? 'cooking-mode' : ''}`}>
      {!cookingMode && (
        <div className="recipe-header">
          <Link to="/" className="back-link">→ חזרה למתכונים</Link>
        </div>
      )}

      <div className="recipe-content">
        <div className="recipe-title-section">
          <h1 className="recipe-title">{recipe.name}</h1>
          {recipe.category && (
            <div className="recipe-category-badge">{recipe.category}</div>
          )}
          <div className="recipe-info">
            <span className="info-item">⏱️ {recipe.prepTimeMinutes} דקות</span>
            <span className="info-item">👥 {recipe.baseServings} מנות (בסיס)</span>
          </div>
          {recipe.tags && recipe.tags.length > 0 && (
            <div className="recipe-tags">
              {recipe.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="cooking-mode-toggle">
          <button
            className={`toggle-btn ${cookingMode ? 'active' : ''}`}
            onClick={toggleCookingMode}
          >
            {cookingMode ? '📖 צא ממצב בישול' : '👨‍🍳 היכנס למצב בישול'}
          </button>
          {cookingMode && isSupported && (
            <div className="wake-lock-status">
              {isActive ? '🔒 המסך יישאר דלוק' : '⚠️ נעילת מסך לא פעילה'}
            </div>
          )}
          {cookingMode && !isSupported && (
            <div className="wake-lock-warning">
              ⚠️ השאר את הכרטיסייה פעילה כדי למנוע כיבוי מסך
            </div>
          )}
        </div>

        <ServingsControl
          currentServings={currentServings}
          baseServings={recipe.baseServings}
          onIncrease={increaseServings}
          onDecrease={decreaseServings}
        />

        <IngredientList
          ingredients={scaledRecipe.ingredients}
          cookingMode={cookingMode}
        />

        <PreparationSteps
          stages={recipe.stages}
          cookingMode={cookingMode}
        />

        {cookingMode && (
          <div className="cooking-mode-footer">
            <button className="exit-cooking-btn" onClick={toggleCookingMode}>
              צא ממצב בישול
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecipePage

