/**
 * Created by kfang on 6/19/17.
 */
import Phaser from 'phaser'
import config from '../config'
import MainMenuState from './MainMenu'

export default class extends Phaser.State {
    init() {
        console.log('Root Boot Init.')
    }

    preload() {
        console.log('Root Boot Preload.')
        this.game.global = {}
        this.game.global.currentTaskIndex = 0
        this.game.load.text('rootContext', config.rootConf)
        this.state.add('MainMenu', MainMenuState, false)
        this.game.load.image('logo', 'assets/images/logo.png')
    }

    create() {
        console.log('Root Boot Create.')
        this.logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo')
        this.logo.anchor.setTo(0.5, 0.5)
        this.logo.scale.setTo(0.6,0.6)
        this.logo.alpha = 0.2
        this.logoTween = this.game.add.tween(this.logo).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 1, true)
    }

    render() {
        console.log('Root Boot Render.')
        if (!this.logoTween.isRunning) {
            this.logo.destroy()
            this.state.start('MainMenu')
        }
    }
}
