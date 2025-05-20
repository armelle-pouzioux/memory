import React from "react";
import Button from "./Button";

function LevelSelect({onSelect}){
    return(
        <div className="level-select">
            <h1>Memory Game</h1>
            <div className="level-buttons">
                <Button label="easy" onClick={()=> onSelect("easy")}/>
                <Button label="medium" onClick={()=> onSelect("medium")}/>
                <Button label="hard" onClick={()=> onSelect("hard")}/>
            </div>
        </div>
    );
}

export default LevelSelect;