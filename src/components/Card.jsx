import '../Card.css';


import { useState, useEffect } from "react"

function Card({ image, isFlipped, isMatched, onClick }) {
  const [flipped, setFlipped] = useState(isFlipped)

  useEffect(() => {
    setFlipped(isFlipped)
  }, [isFlipped])

  return (
    <div className={`card-container ${isMatched ? "matched" : ""}`} onClick={onClick}>
      <div className={`card ${flipped ? "flipped" : ""}`}>
        {/* Card Back */}
        <div className="card-back">
          <div className="card-back"><img src="src\assets\back.png" alt="dos de la carte" /></div>
        </div>

        {/* Card Front */}
        <div className="card-front">
          <img src={image} alt="carte" />
        </div>
      </div>
    </div>
  )
}

export default Card
