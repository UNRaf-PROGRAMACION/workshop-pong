import { Game as MainGame } from './scenes/Game';
import { AUTO, Scale,Game } from 'phaser';
import { FIELD_WIDTH, FIELD_HEIGHT } from './paddles';

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: AUTO,
    width: FIELD_WIDTH,
    height: FIELD_HEIGHT,
    parent: 'game-container',
    backgroundColor: '#000000',
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
    },
    scene: [
        MainGame
    ]
};

const StartGame = (parent) => {
    return new Game({ ...config, parent });
}

export default StartGame;
