import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAllRecipes, getAllTags, getAllCategories } from '../utils/recipeLoader'
import './HomePage.css'

function HomePage() {
  const navigate = useNavigate()
  const allRecipes = getAllRecipes()
  const allTags = getAllTags()
  const allCategories = getAllCategories()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState([])

  const toggleTag = (tag) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag)
      }
      return [...prev, tag]
    })
  }

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchQuery) params.set('search', searchQuery)
    if (selectedTags.length > 0) params.set('tags', selectedTags.join(','))
    navigate(`/results?${params.toString()}`)
  }

  const handleCategoryClick = (category) => {
    navigate(`/results?category=${encodeURIComponent(category)}`)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedTags([])
  }

  // Get recipe count for each category
  const getCategoryCount = (category) => {
    return allRecipes.filter(recipe => recipe.category === category).length
  }

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>מתכונים 🍳</h1>
      </header>

      {/* Search Area */}
      <div className="search-area">
        <h2 className="section-title">חיפוש מתכונים</h2>

        <div className="search-section">
          <input
            type="search"
            className="search-input"
            placeholder="חפש מתכונים או מרכיבים..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>

        {allTags.length > 0 && (
          <div className="tags-section">
            <div className="tags-label">סינון לפי תגיות:</div>
            <div className="tags-list">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  className={`tag-btn ${selectedTags.includes(tag) ? 'active' : ''}`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
            {(searchQuery || selectedTags.length > 0) && (
              <button className="clear-filters-btn" onClick={clearFilters}>
                נקה סינונים
              </button>
            )}
          </div>
        )}

        <button className="search-btn" onClick={handleSearch}>
          חפש מתכונים
        </button>
      </div>

      {/* Categories Area */}
      <div className="categories-area">
        <h2 className="section-title">חפש לפי קטגוריה</h2>
        <div className="categories-grid">
          {allCategories.map((category) => (
            <button
              key={category}
              className="category-card"
              onClick={() => handleCategoryClick(category)}
            >
              <div className="category-content">
                <h3 className="category-name">{category}</h3>
                <p className="category-count">
                  {getCategoryCount(category)} מתכונים
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* View All Recipes Link */}
      <div className="view-all-section">
        <Link to="/results" className="view-all-link">
          צפה בכל המתכונים ←
        </Link>
      </div>
    </div>
  )
}

export default HomePage

