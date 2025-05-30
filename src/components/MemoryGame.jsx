import { useState, useEffect } from "react"
import Card from "./Card"
import Button from "./Button"
import { cardsData } from "../data/cards"
import { formatTime } from "../utils/helpers"


function MemoryGame({ level, onRestart, onComplete, bestTime }) {
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [isChecking, setIsChecking] = useState(false)
  const [time, setTime] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [moves, setMoves] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [isSpeedrunMode, setIsSpeedrunMode] = useState(false)
  const [audio] = useState(new Audio("/music/full.wav"))
  const [isMusicStarted, setIsMusicStarted] = useState(false);


  useEffect(() => {
    resetGame()
    setTime(0)
    setMoves(0)
    setIsTimerRunning(false)
    setGameComplete(false)
  }, [level])

  useEffect(() => {
    let timer

    if (isTimerRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
      }, 1000)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [isTimerRunning])

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.isMatched)) {
      if (isTimerRunning) {
        setIsTimerRunning(false)
        setGameComplete(true)
        onComplete(time)
        audio.pause()
        audio.currentTime = 0
        setIsMusicStarted(false)
      }
    }
  }, [cards, isTimerRunning, time, onComplete])

  const getCardsForLevel = (level) => {
    let selectedCards

    switch (level) {
      case "easy":
        selectedCards = cardsData.slice(0, 3)
        break
      case "medium":
        selectedCards = cardsData.slice(0, 6)
        break
      case "hard":
        selectedCards = cardsData.slice(0, 8)
        break
      default:
        selectedCards = cardsData.slice(0, 8)
    }

    const duplicatedCards = [...selectedCards, ...selectedCards].map((card, index) => ({
      ...card,
      uuid: `${index}-${card.name}`,
      isFlipped: false,
      isMatched: false,
    }))

    return duplicatedCards.sort(() => Math.random() - 0.5)
  }

  const handleCardClick = (clickedCard) => {
  if (isChecking || clickedCard.isFlipped || clickedCard.isMatched || gameComplete) return;

  if (!isTimerRunning && time === 0) {
    setIsTimerRunning(true)
    
    if (!isMusicStarted) {
    audio.loop = true         
    audio.volume = 0.3        
    audio.currentTime = 15
    audio.play()
    setIsMusicStarted(true)
  };
  }

  const newFlipped = [...flippedCards, clickedCard];

  setCards((prevCards) =>
    prevCards.map((card) =>
      card.uuid === clickedCard.uuid ? { ...card, isFlipped: true } : card
    )
  );

  setFlippedCards(newFlipped);

  if (newFlipped.length === 2) {
    setIsChecking(true);
    setMoves((prevMoves) => prevMoves + 1);

    const [first, second] = newFlipped;

    if (first.name === second.name) {
      setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.name === first.name ? { ...card, isMatched: true } : card
          )
        );
        setFlippedCards([]);
        setIsChecking(false);
      }, 500);
    } else {
      if (isSpeedrunMode) {
        setIsChecking(false);
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.uuid === first.uuid || card.uuid === second.uuid
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
          setIsChecking(false);
        }, 700);
      }
    }
  }

  if (isSpeedrunMode && flippedCards.length === 2) {
    const [first, second] = flippedCards;

    setCards((prevCards) =>
      prevCards.map((card) =>
        card.uuid === first.uuid || card.uuid === second.uuid
          ? { ...card, isFlipped: false }
          : card
      )
    );

    setFlippedCards([clickedCard]);
  }
};

  const resetGame = () => {
    const shuffledCards = getCardsForLevel(level)
    setCards(shuffledCards)
    setFlippedCards([])
    setIsChecking(false)
    setTime(0)
    setMoves(0)
    setIsTimerRunning(false)
    setGameComplete(false)
    if (isMusicStarted) {
      audio.pause()
      audio.currentTime = 0
      setIsMusicStarted(false)
    }
  }

  return (
    <div className="memory-game">
      <div className="game-stats">
        <div className="stats-container">
          <div className="stat-box">
            <p className="stat-label">Time</p>
            <p className="stat-value">{formatTime(time)}</p>
          </div>

          <div className="stat-box">
            <p className="stat-label">Moves</p>
            <p className="stat-value">{moves}</p>
          </div>
        </div>

        <div className="game-controls">
          <Button onClick={resetGame}>Restart</Button>
          <Button onClick={onRestart}>Levels</Button>
          <div className="toggle-wrapper">
            <div className="toggle normal">
              <input
              id="speedrun-toggle"
              type="checkbox"
              checked={isSpeedrunMode}
              onChange={() => setIsSpeedrunMode(prev => !prev)}
            />
            <label className="toggle-item" htmlFor="speedrun-toggle" />
            </div>
            <span className="name">{isSpeedrunMode ? 'Speedrun' : 'Normal'}</span>
          </div>
        </div>
      </div>

      {bestTime && <div className="best-time">Best time: {formatTime(bestTime)}</div>}

      {gameComplete && (
        <div className="victory-message">
          <h2> Bravo, tu as gagné ! </h2>
          <p>
            Time: {formatTime(time)} | Moves: {moves}
          </p>
        </div>
      )}

      <div className={`card-grid grid-${level}`}>
        {cards.map((card) => (
          <Card
            key={card.uuid}
            image={card.image}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </div>
    </div>
  )
}

export default MemoryGame
