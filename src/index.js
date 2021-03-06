import Boot from './states/Boot';
import Preload from './states/Preload';
import Main from './states/Main';
import Menu from './states/Menu';
import Levels from './states/LevelsState';

class Game extends Phaser.Game {

    constructor() {

        super(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS);

        this.state.add('Boot', Boot, false);
        this.state.add('Preload', Preload, false);
        this.state.add('Menu', Menu, false);
        this.state.add('LevelsState', Levels, false);
        this.state.add('Main', Main, false);

        this.state.start('Boot', null, null, true, false, "/static/assets/levels/levels.json");
    }
}


window.onload = function(){
    new Game();
};

