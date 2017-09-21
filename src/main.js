import 'pixi'
import 'p2'
import Phaser from 'phaser'
import RootBootState from './states/RootBoot'

class Game extends Phaser.Game {
    constructor() {
        let create = function() {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
        }
        super(window.screen.availWidth, window.screen.availHeight - 50, Phaser.CANVAS, 'content', {create: create})

        this.state.add('RootBoot', RootBootState, false)
        this.state.start('RootBoot')
    }


}

window.game = new Game()
