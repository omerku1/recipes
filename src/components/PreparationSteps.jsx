import { useState } from 'react'
import './PreparationSteps.css'

function PreparationSteps({ stages, cookingMode = false }) {
  const [completedSteps, setCompletedSteps] = useState({})

  const toggleStep = (index) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <div className={`preparation-steps ${cookingMode ? 'cooking-mode' : ''}`}>
      <h3>שלבי הכנה</h3>
      <ol className="steps">
        {stages.map((stage, index) => (
          <li
            key={index}
            className={completedSteps[index] ? 'completed' : ''}
            onClick={() => toggleStep(index)}
          >
            <span className="step-number">{index + 1}</span>
            <span className="step-text">{stage}</span>
            <span className="step-check">
              {completedSteps[index] ? '✓' : ''}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default PreparationSteps

