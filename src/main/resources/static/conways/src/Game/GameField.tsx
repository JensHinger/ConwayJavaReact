import React from 'react';
import { Cell } from './Cell.tsx';
import { changeCell } from '../API/GameAPI.ts';

export function GameField({gameField, updateField}: {gameField:boolean[][], updateField:Function}){

    function handleCellClick(x: number, y: number){
        var fieldPromise = changeCell(x, y)
        updateField(fieldPromise)
    }

    const all_cells = gameField["gameField"].map(
        (cell_row, row_index) => {
            return (
                <div key={row_index}>
                    {cell_row.map((cell, col_index) => {
                        var state:boolean = cell.state
                        return (
                            <Cell key={col_index} state={state} uniqueKey={row_index + "" + col_index} handleCellClick={() => handleCellClick(col_index, row_index)}/>
                        ) 
                    })}
                </div>
            )
    })

    return (
        <div>
            {all_cells}
        </div>
    )
}