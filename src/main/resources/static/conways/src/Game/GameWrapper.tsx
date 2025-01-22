import React from 'react';
import { useState, useRef, useEffect } from "react"
import { clearGame, initGame, randomizeGame, getNextStep } from '../API/GameAPI.ts';
import { GameField } from './GameField.tsx';

let loaded: boolean = false;
let iterations: number = 0;

export function GameWrapper(){
    const [field, setField] = useState<boolean[][]>();
    const [fieldSize, setFieldSize] = useState<Number>(10);
    const [run, setRun] = useState<boolean>(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        console.log(run, loaded)
        run? startProgression(): stopProgression();
    }, [run])

    function initField(): void{
        var fieldPromise: Promise<boolean[][]> = initGame(fieldSize);
        iterations = 0;
        updateField(fieldPromise);
    }

    function clearField(): void{
        var fieldPromise: Promise<boolean[][]> = clearGame();
        iterations = 0;
        updateField(fieldPromise);
    }

    function randomizeField() {
        var fieldPromise: Promise<boolean[][]> = randomizeGame();
        iterations = 0;
        updateField(fieldPromise);
    }

    function progressStep() {
        if (run && loaded){
            var fieldPromise: Promise<boolean[][]> = getNextStep();
            updateField(fieldPromise);
        }
    }

    function startProgression() {
        console.log(run, loaded)
        const intervalID = setInterval(() => {
            progressStep();
            iterations += 1;
        }, 200)
        intervalRef.current = intervalID;
    }

    function stopProgression() {
        console.log(run, loaded)
        clearInterval(intervalRef.current)
    }

    function updateField(fieldPromise: Promise<boolean[][]>): void{
        if (run && !loaded) {
            setRun(false)
            stopProgression();
        }

        fieldPromise.then(res =>{
            setField(res)
            loaded = true;
        })
    }

    function handleSizeChange(e: React.SyntheticEvent): void{
        var new_value: string = e.target.value;
        var intValue = parseInt(new_value);

        console.log(intValue);
        setFieldSize(intValue);
    }

    return (
        <>
            <div className="gameOptions">
                <label>
                    Fieldsize: 
                    <input name="initSize" value={fieldSize} onChange={e => handleSizeChange(e)} />
                </label>
                <button className="optionButton" onClick={initField}>
                    Initialize Game
                </button>
                <button className="optionButton" onClick={clearField}>
                    Clear Field
                </button>
                <button className="optionButton" onClick={randomizeField}>
                    Randomize Field
                </button>
                <button className="optionButton" onClick= {() => {
                    setRun(!run);
                    }}>
                    {run? "Pause" : "Play"}
                </button>
                <p>
                  Iterations: {iterations}  
                </p>
            </div>

                {field ? <GameField gameField={field} updateField={updateField} /> : ""}

        </>
    )

}