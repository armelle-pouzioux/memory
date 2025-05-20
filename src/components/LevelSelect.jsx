import React from "react";
import Button from "./Button";

function LevelSelect({onSelect}){
    return(
        <div className="level-select">
            <h1>Memory Game</h1>
            <div className="level-buttons">
                <Button label="Niveau 1" onClick={()=> onSelect(1)}/>
                <Button label="Niveau 2" onClick={()=> onSelect(2)}/>
                <Button label="Niveau 3" onClick={()=> onSelect(3)}/>
            </div>
        </div>
    );
}

export default LevelSelect;