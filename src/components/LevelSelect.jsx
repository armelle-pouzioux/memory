import Button from "./Button"
import { formatTime } from "../utils/helpers"

function LevelSelect({ onSelect, bestTimes }) {
  const levels = [
    { id: "easy", name: "Easy", pairs: 3, description: "6 cards to match" },
    { id: "medium", name: "Medium", pairs: 6, description: "12 cards to match" },
    { id: "hard", name: "Hard", pairs: 8, description: "16 cards to match" },
  ]

  return (
    <div className="level-select">
      <div className="level-select-container">
        <div className="level-options">
          {levels.map((level) => (
            <div key={level.id} className="level-option" onClick={() => onSelect(level.id)}>
              <div className="level-info">
                <h3 className="level-name">{level.name}</h3>
                <p className="level-description">{level.description}</p>
              </div>
              {bestTimes[level.id] !== Number.POSITIVE_INFINITY && (
                <div className="level-best-time">Best time: {formatTime(bestTimes[level.id])}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LevelSelect