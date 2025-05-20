import React from 'react';
import '../Card.css';

const Card =({image, isFlipped, onClick, isMatched}) => {
    const handleClick = () => {
        if (!isFlipped && !isMatched){
            onClick();
        }
    };

    return(
        <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
            <div className="card-inner">
                <div className="card-front">
                    <img src={image} alt="carte" />
                </div>
                <div className="card-back">
                    <img src="src\assets\back.png" alt="dos de la carte" />
                </div>
            </div>
        </div> 
    );
};

export default Card;