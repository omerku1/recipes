import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllRecipes, searchRecipes, filterRecipesByTags } from '../utils/recipeLoader'
import './AllRecipesPage.css'

function AllRecipesPage() {
  const allRecipes = getAllRecipes()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState([])

  // Apply search and filters
  let filteredRecipes = allRecipes
  filteredRecipes = searchRecipes(searchQuery, filteredRecipes)
  filteredRecipes = filterRecipesByTags(selectedTags, filteredRecipes)

  return (
    <div className="all-recipes-page">
      <div className="page-header">
        <Link to="/" className="back-link">→ חזרה לחיפוש</Link>
        <h1>כל המתכונים</h1>
      </div>

      <div className="recipes-section">
        <div className="recipes-count">
          {filteredRecipes.length} מתכונים
        </div>

        {filteredRecipes.length === 0 ? (
          <div className="no-results">
            <p>לא נמצאו מתכונים</p>
          </div>
        ) : (
          <div className="recipes-grid">
            {filteredRecipes.map((recipe) => (
              <Link
                key={recipe.id}
                to={`/recipe/${recipe.id}`}
                className="recipe-card"
              >
                <div className="recipe-card-content">
                  <h3 className="recipe-name">{recipe.name}</h3>
                  <div className="recipe-meta">
                    <span className="recipe-servings">
                      👥 {recipe.baseServings} מנות
                    </span>
                    <span className="recipe-time">
                      ⏱️ {recipe.prepTimeMinutes} דק'
                    </span>
                  </div>
                  {recipe.tags && recipe.tags.length > 0 && (
                    <div className="recipe-tags">
                      {recipe.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="recipe-tag">
                          {tag}
                        </span>
                      ))}
                      {recipe.tags.length > 3 && (
                        <span className="recipe-tag-more">
                          +{recipe.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AllRecipesPage

