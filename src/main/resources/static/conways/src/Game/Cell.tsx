import React from 'react';

export function Cell({state, handleCellClick}: {state:boolean, handleCellClick:Function}) {
    
    return (
        <button 
            className="cell" 
            onClick={handleCellClick} 
            style={{"backgroundColor": state ? "white" : "black"}}
        > 
            {state ? "X" : "O"}
        </button>
    )
}

