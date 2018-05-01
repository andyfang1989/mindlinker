/**
 * Created by kfang on 6/27/17.
 */
import Phaser from 'phaser'
import {logDebugInfo} from '../../Logger'
import config from '../../config'
import {sendHttpRequest} from '../../UIUtil'

export default class extends Phaser.State {
    setCurrentGameContext() {
        this.gameContext = JSON.parse(this.game.cache.getText('gameContext'))
    }

    init() {
        logDebugInfo('KnightTaskBoot Init.')
        this.setCurrentGameContext()
    }

    loadCurrentTaskConfig() {
        if (this.game.global.selfTask) {
            let url = config.getSandboxConf
            let operation = 'GET'
            let params = JSON.stringify({})
            sendHttpRequest(this.renderKnightAnimationBoardOnGettingSandboxConf, operation, url, params)
        } else {
            let taskIndex = this.game.global.currentTaskIndex
            logDebugInfo('Current task conf: ' + this.gameContext.task_configs.tasks[taskIndex].taskConf)
            this.game.load.text('taskContext', this.gameContext.task_configs.tasks[taskIndex].taskConf)
        }
    }

    preload() {
        logDebugInfo('KnightTaskBoot Preload.')
        this.loadCurrentTaskConfig()
    }

    render() {
        logDebugInfo('KnightTaskBoot Render.')
        if (!this.game.global.selfTask) {
            logDebugInfo('From KnightTaskBoot Switch to KnightAnimationBoard.')
            this.game.state.start('KnightAnimationBoard')
        }
    }

    renderKnightAnimationBoardOnGettingSandboxConf() {
        logDebugInfo('KnightTaskBoot RenderKnightAnimationBoardOnGettingSandboxConf.')
        if(this.readyState == 4 && this.status == 200) {
            logDebugInfo('Response: ' + this.responseText)
            let conf = JSON.parse(this.responseText)
            if (conf.character_starting_grid_x === undefined) {
                alert('您还未制作沙盘游戏！')
                window.game.state.start('KnightStoryBoard')
            } else {
                window.game.global.currentSandboxConf = conf
                window.game.state.start('KnightAnimationBoard')
            }
        }
    }
}