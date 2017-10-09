/**
 * Created by kfang on 10/1/17.
 */
import Phaser from 'phaser'
import {logDebugInfo} from '../../Logger'

export default class extends Phaser.State {
    setCurrentGameContext() {
        this.gameContext = JSON.parse(this.game.cache.getText('gameContext'))
    }

    init() {
        logDebugInfo('KnightSandboxBoot Init.')
        this.setCurrentGameContext()
    }

    loadSandboxConfig() {
        let sandboxConf = this.gameContext.task_configs.sandbox
        logDebugInfo('Sandbox config file: ' + sandboxConf.taskConf)
        this.game.load.text('taskContext', sandboxConf.taskConf)
    }

    preload() {
        logDebugInfo('KnightSandboxBoot Preload.')
        this.loadSandboxConfig()
    }

    render() {
        logDebugInfo('KnightSandboxBoot Render.')
        this.state.start('KnightSandbox')
    }
}