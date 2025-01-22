import React from 'react';

export function Cell({state, uniqueKey, handleCellClick}: {state:boolean, uniqueKey:string, handleCellClick:Function}) {
    
    return (
        <button className="cell" onClick={handleCellClick} key={uniqueKey} style={{"backgroundColor": state ? "white" : "black"}}> 
            {state ? "X" : "O"}
        </button>
    )
}

