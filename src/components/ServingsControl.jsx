import './ServingsControl.css'

function ServingsControl({ currentServings, baseServings, onIncrease, onDecrease }) {
  return (
    <div className="servings-control">
      <div className="servings-label">
        מנות:
        <span className="servings-count">{currentServings}</span>
        {currentServings !== baseServings && (
          <span className="base-servings">(מקור: {baseServings})</span>
        )}
      </div>
      <div className="servings-buttons">
        <button
          className="servings-btn decrease"
          onClick={onDecrease}
          disabled={currentServings <= 1}
          aria-label="הקטן מנות"
        >
          −
        </button>
        <button
          className="servings-btn increase"
          onClick={onIncrease}
          aria-label="הגדל מנות"
        >
          +
        </button>
      </div>
    </div>
  )
}

export default ServingsControl

