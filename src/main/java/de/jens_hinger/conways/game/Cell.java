package de.jens_hinger.conways.game;

import java.util.Random;

public class Cell {

    // State either True = alive, False = dead
    private boolean state;
    private boolean nextState;
    private static Random rand = new Random();

    public Cell(){
        this.state = true;
    }

    public boolean getState(){
        return this.state;
    }

    public void setState(boolean newState){
        this.state = newState;
    }

    public void updateState(){
        this.setState(this.nextState);
    }

    public boolean getNextState(){
        return this.nextState;
    }

    public void setNextState(boolean nextState){
        this.nextState = nextState;
    }

    public void randomizeState(){
        this.nextState = rand.nextBoolean();
    }
}
