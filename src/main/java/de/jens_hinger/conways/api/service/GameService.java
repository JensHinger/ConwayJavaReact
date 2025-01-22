package de.jens_hinger.conways.api.service;

import de.jens_hinger.conways.game.Field;
import org.springframework.stereotype.Service;

@Service
public class GameService {
    // This would usually contain the business logic

    private static Field gameField;

    public GameService() {
        gameField = new Field(10);
    }

    public Field getGameField(){
        return gameField;
    }

    public void setGameFieldSize(int size){
        gameField = new Field(size);
    }

}
