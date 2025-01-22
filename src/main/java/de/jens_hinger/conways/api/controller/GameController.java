package de.jens_hinger.conways.api.controller;

import de.jens_hinger.conways.api.service.GameService;
import de.jens_hinger.conways.game.Field;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class GameController {

    private static GameService gameService;

    public GameController() {
        gameService = new GameService();
    }

    @GetMapping("/game")
    public Field getGame(){
        return gameService.getGameField();
    }

    @PostMapping("/game")
    public Field calcNextStep() {
        gameService.getGameField().calcNextStep();
        return gameService.getGameField();
    }

    @PutMapping("/game/size/{size}")
    public Field setSize(@PathVariable int size){
        gameService.setGameFieldSize(size);
        return gameService.getGameField();
    }

    @PostMapping("/game/{y}_{x}")
    public Field setCell(@PathVariable int x, @PathVariable int y) {
        gameService.getGameField().setCell(y, x);
        return gameService.getGameField();
    }

    @PostMapping("/game/clear")
    public Field clearField(){
        gameService.getGameField().changeAllCells(cell -> {
            cell.setNextState(false);
        });
        return gameService.getGameField();
    }

    @PostMapping("/game/randomize")
    public Field randomizeField(){
        gameService.getGameField().changeAllCells(cell -> cell.randomizeState());
        return gameService.getGameField();
    }
}
