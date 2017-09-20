/**
 * Created by kfang on 6/16/17.
 */
import Phaser from 'phaser'
import TooltipBuilder from '../util/TooltipBuilder'
import config from '../config'
import {sendHttpRequest, printHttpResponse} from '../UIUtil'
import {logDebugInfo} from '../Logger'

export default class extends Phaser.Sprite {
    constructor({game, name, x, y, asset, frame}) {
        super(game, x, y, asset, frame)
        this.name = name
        this.anchor.setTo(0.5, 0.5)
        this.actionQueue = []
        this.playingAnimation = null
        this.taskCompleted = false
        this.allset = false
    }

    update() {
        if (this.actionQueue.length > 0 && (this.playingAnimation === null || this.playingAnimation.isFinished)) {
            this.playNextAction()
        } else if (this.actionQueue.length === 0 && this.playingAnimation !== null && this.playingAnimation.isFinished && !this.allset) {
            if (this.taskCompleted) {
                let url = config.updateTaskStatus
                let operation = 'POST'
                let params = JSON.stringify({userid: 1, gameid: 0, taskid: this.game.global.currentTaskIndex, status: true})
                sendHttpRequest(printHttpResponse, operation, url, params)
            }
            this.showButtons()
            this.allset = true
        }
    }

    showButtons() {
        let offset = 0
        if (this.taskCompleted) {
            this.nextButton = this.game.add.button(this.game.world.width - 75, 50, 'Buttons', this.nextGame, this, 'buttons/arrow/hover', 'buttons/arrow/normal', 'buttons/arrow/click', 'buttons/arrow/disabled')
            this.nextButton.scale.setTo(-1, 1)
            this.nextButton.anchor.setTo(0.5, 0.5)
            TooltipBuilder(this.game, this.nextButton, '开始下一关', 'bottom')
            offset += 75
        }
        this.restartButton = this.game.add.button(this.game.world.width - 95 - offset, 50, 'Buttons', this.restart, this, 'buttons/restart/hover', 'buttons/restart/normal', 'buttons/restart/click', 'buttons/restart/disabled')
        this.restartButton.anchor.setTo(0.5, 0.5)
        TooltipBuilder(this.game, this.restartButton, '重新开始', 'bottom')
    }

    playNextAction() {
        let nextAction = this.actionQueue.shift()
        logDebugInfo('Update: play animation ' + nextAction.name + ' with xOffset: ' + nextAction.xOffset + ' and yOffset: ' + nextAction.yOffset + ' with sprite key: ' + nextAction.spriteKey)
        let newX = this.x + nextAction.xOffset
        let newY = this.y + nextAction.yOffset
        if (nextAction.spriteKey !== this.key) {
            this.loadTexture(nextAction.spriteKey, 0)
        }
        this.playingAnimation = this.animations.play(nextAction.name)
        if (nextAction.audio !== null) {
            this.game.sound.play(nextAction.audio)
        }
        this.game.add.tween(this).to({x: newX, y: newY}, config.animationDuration, null, true)
        if (nextAction.spriteToActivate !== null) {
            nextAction.spriteToActivate.activated = true
        }
    }

    destroyAllButtons() {
        this.restartButton.destroy()
        if (this.nextButton) {
            this.nextButton.destroy()
        }
    }

    restart() {
        this.game.sound.play('press')
        this.destroyAllButtons()
        this.game.global.preTaskIndex = this.game.global.currentTaskIndex
        this.game.state.start('KnightTaskBoot')
    }

    nextGame() {
        this.game.sound.play('press')
        this.destroyAllButtons()
        this.game.global.preTaskIndex = this.game.global.currentTaskIndex
        this.game.global.currentTaskIndex = this.game.global.currentTaskIndex + 1
        this.game.state.start('KnightTaskBoot')
    }
}
