"use client"

import { useState } from "react"
import MemoryGame from "./components/MemoryGame"
import LevelSelect from "./components/LevelSelect"
import "./App.css"

function App() {
  const [level, setLevel] = useState(null)
  const [bestTimes, setBestTimes] = useState({
    easy: Number.POSITIVE_INFINITY,
    medium: Number.POSITIVE_INFINITY,
    hard: Number.POSITIVE_INFINITY,
  })

  const handleGameComplete = (gameLevel, time) => {
    setBestTimes((prev) => ({
      ...prev,
      [gameLevel]: time < prev[gameLevel] ? time : prev[gameLevel],
    }))
  }

  const handleRestart = () => {
    setLevel(null)
  }

  return (
    <div className="app">
      <h1 className="app-title" onClick={handleRestart}>
        Memory Game
      </h1>

      {level ? (
        <MemoryGame
          level={level}
          onRestart={handleRestart}
          onComplete={(time) => handleGameComplete(level, time)}
          bestTime={bestTimes[level] === Number.POSITIVE_INFINITY ? null : bestTimes[level]}
        />
      ) : (
        <LevelSelect onSelect={setLevel} bestTimes={bestTimes} />
      )}
    </div>
  )
}

export default App
