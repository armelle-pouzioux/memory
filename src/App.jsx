import { useState, useEffect } from 'react'
import Card from './components/Card';
import cardsData from './data/cards';
import './App.css';
import Button from './components/Button';
import LevelSelect from './components/LevelSelect';



function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [level, setLevel] = useState(null);


  useEffect(() => {
    resetGame();
  }, []);

  const handleCardClick = (clickedCard) => {
    if (isChecking || clickedCard.isFlipped || clickedCard.isMatched) return;

    const newFlipped = [...flippedCards, clickedCard];

    setCards((prevCards) =>
    prevCards.map((card) =>
      card.uuid === clickedCard.uuid ? { ...card, isFlipped: true } : card
     )
    );

    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
    setIsChecking(true);

    const [first, second] = newFlipped;

    setTimeout(()=>{
      if (first.name === second.name) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.name === first.name ? { ...card, isMatched: true } : card
          )
        );
      } else {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.uuid === first.uuid || card.uuid === second.uuid
              ? { ...card, isFlipped: false }
              : card
          )
        );
      }
      setFlippedCards([]);
      setIsChecking(false);
    }, 1000);
  }
};

const resetGame = () => {
  const duplicatedCards = [...cardsData, ...cardsData].map((card, index) => ({
    ...card,
    uuid: index + '-' + card.name,
    isFlipped: false,
    isMatched: false,
  }));

  const shuffledCards = duplicatedCards.sort(() => Math.random() - 0.5);
  setCards(shuffledCards);
  setFlippedCards([]);
  setIsChecking(false);
};

if (!level) {
    return <LevelSelect onSelect={setLevel} />;
  }



  return (
  <div className="App">
    <h1>Memory Game</h1>

    {cards.length > 0 && cards.every(card => card.isMatched) && (
      <div className="victory-message">
        🎉 Bravo, tu as gagné ! 🎉
        <Button label="Rejouer" onClick={resetGame} />
      </div>
    )}

    <div className="grid">
      {cards.map((card) => (
        <Card
          key={card.uuid}
          image={card.image}
          isFlipped={card.isFlipped}
          onClick={() => handleCardClick(card)}
          isMatched={card.isMatched}
        />
      ))}
    </div>
  </div>
  );
}

export default App;