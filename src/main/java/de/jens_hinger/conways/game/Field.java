package de.jens_hinger.conways.game;

import java.util.function.Consumer;

public class Field {

    private int size;
    private Cell[][] gameField;

    public Field(int size){
        this.size = size;

        gameField = new Cell[size][size];

        for (int i = 0; i < size; i ++){
            for (int j = 0; j < size; j++){
                Cell cell = new Cell();
                cell.randomizeState();
                gameField[i][j] = cell;
                cell.updateState();
            }
        }
    }

    public void changeAllCells(Consumer<Cell> action){
        for (int i = 0; i < size; i ++){
            for (int j = 0; j < size; j++){
                action.accept(this.gameField[i][j]);
                this.gameField[i][j].updateState();
            }
        }
    }

    public Cell getCell(int y, int x){
        return this.gameField[y][x];
    }

    public void setCell(int y, int x) {
        boolean currentState = this.getCell(y, x).getState();
        this.gameField[y][x].setState(!currentState);
    }

    public Cell[] getNeighbors(int y, int x){
        Cell[] resNeighbors = new Cell[8];
        int neighborIterator = 0;

        for (int i = y - 1; i < y + 2; i++){
            for (int j = x - 1; j < x + 2; j++){
                if (i != y || j != x){
                    resNeighbors[neighborIterator] =
                            this.gameField[(i + this.size) % this.size][(j + this.size) % this.size];
                    neighborIterator += 1;
                }
            }
        }
        return resNeighbors;
    }

    public boolean getNextState(int y, int x){
        boolean cellState = getCell(y, x).getState();
        Cell[] neighbors = this.getNeighbors(y, x);

        int neighborsState = 0;

        for (Cell neighbor : neighbors) {
            if (neighbor.getState()) {
                neighborsState += 1;
            } else {
                continue;
            }
        }

        if (cellState && neighborsState < 2){
            // dies
            return false;
        } else if (cellState && (neighborsState == 2 || neighborsState == 3)){
            // lifes
            return true;
        } else if (!cellState && neighborsState == 3){
            // lifes
            return true;
        } else {
            // alive/dead and more than 3 neighbors
            // dies
            return false;
        }
    }

    public void calcNextStep() {
        for (int i = 0; i < size; i ++){
            for (int j = 0; j < size; j++){
                Cell currentCell = this.getCell(i, j);
                // Update next state
                boolean nextState = this.getNextState(i, j);
                currentCell.setNextState(nextState);
            }
        }

        // set curr state to next state
        this.changeAllCells(cell -> cell.updateState());
    }

    public void printBoard(){
        System.out.println("______________________");
        for (int i = 0; i < size; i ++){
            for (int j = 0; j < size; j++){
                System.out.print(this.getCell(i, j).getNextState() ? "X" : "O");
            }
            System.out.println();
        }
        System.out.println("______________________");
    }

    public Cell[][] getGameField() {
        return gameField;
    }
}
