import { Link, useSearchParams } from 'react-router-dom'
import { getAllRecipes, searchRecipes, filterRecipesByTags, filterRecipesByCategory } from '../utils/recipeLoader'
import './ResultsPage.css'

function ResultsPage() {
  const [searchParams] = useSearchParams()
  const allRecipes = getAllRecipes()

  const searchQuery = searchParams.get('search') || ''
  const tagsParam = searchParams.get('tags') || ''
  const categoryParam = searchParams.get('category') || ''

  const selectedTags = tagsParam ? tagsParam.split(',') : []

  // Apply filters
  let filteredRecipes = allRecipes

  if (categoryParam) {
    filteredRecipes = filterRecipesByCategory(categoryParam, filteredRecipes)
  }

  if (searchQuery) {
    filteredRecipes = searchRecipes(searchQuery, filteredRecipes)
  }

  if (selectedTags.length > 0) {
    filteredRecipes = filterRecipesByTags(selectedTags, filteredRecipes)
  }

  // Generate title based on filters
  const getPageTitle = () => {
    if (categoryParam) {
      return `מתכונים בקטגוריה: ${categoryParam}`
    }
    if (searchQuery || selectedTags.length > 0) {
      return 'תוצאות חיפוש'
    }
    return 'כל המתכונים'
  }

  return (
    <div className="results-page">
      <div className="results-header">
        <Link to="/" className="back-link">→ חזור לחיפוש</Link>
        <h1 className="results-title">{getPageTitle()}</h1>

        {/* Show active filters */}
        <div className="active-filters">
          {searchQuery && (
            <div className="filter-badge">
              <span className="filter-label">חיפוש:</span>
              <span className="filter-value">{searchQuery}</span>
            </div>
          )}
          {selectedTags.map((tag) => (
            <div key={tag} className="filter-badge">
              <span className="filter-label">תגית:</span>
              <span className="filter-value">{tag}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="results-content">
        <div className="results-count">
          {filteredRecipes.length === 0 ? (
            'לא נמצאו מתכונים'
          ) : (
            `${filteredRecipes.length} מתכונים נמצאו`
          )}
        </div>

        {filteredRecipes.length === 0 ? (
          <div className="no-results">
            <p>לא מצאנו מתכונים התואמים את החיפוש שלך</p>
            <Link to="/" className="try-again-btn">נסה חיפוש אחר</Link>
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
                  {recipe.category && (
                    <div className="recipe-category">{recipe.category}</div>
                  )}
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

export default ResultsPage

