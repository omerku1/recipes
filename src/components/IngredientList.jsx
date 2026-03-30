import { useState } from 'react'
import { formatIngredient } from '../utils/servingsCalculator'
import './IngredientList.css'

function IngredientList({ ingredients, cookingMode = false }) {
  const [checkedItems, setCheckedItems] = useState({})

  const toggleIngredient = (index) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <div className={`ingredient-list ${cookingMode ? 'cooking-mode' : ''}`}>
      <h3>מצרכים</h3>
      <ul className="ingredients">
        {ingredients.map((ingredient, index) => (
          <li
            key={index}
            className={checkedItems[index] ? 'checked' : ''}
            onClick={() => toggleIngredient(index)}
          >
            <span className="checkbox">
              {checkedItems[index] ? '✓' : '○'}
            </span>
            <span className="ingredient-text">
              {formatIngredient(ingredient)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default IngredientList

