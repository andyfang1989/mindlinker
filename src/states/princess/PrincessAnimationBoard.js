/**
 * Created by kfang on 7/23/17.
 */
import Phaser from 'phaser'
import config from '../../config'
import Princess from '../../sprites/Princess'
import PrincessAnimationPlayer from '../../animation/PrincessAnimationPlayer'
import TooltipBuilder from '../../util/TooltipBuilder'
import {showBlock, createLoadingText, loadStart, fileComplete, repositionBlock, repositionText, getInstruction, setReadableCode} from '../../UIUtil'
import {logDebugInfo} from '../../Logger'

export default class extends Phaser.State {
    calculateCharacterStartingPositionResponsively() {
        logDebugInfo('Game width: ' + this.game.width + ' height: ' + this.game.height)
        this.characterStartX = Math.round(this.game.width / 2)
        this.characterStartY = Math.round(this.game.height / 2)
    }

    getCurrentAnimationContext() {
        let instruction = getInstruction(this.game.workspace)
        logDebugInfo('Blockly Instruction: ' + instruction)
        setReadableCode(instruction)
        return {
            sprite: this.princess,
            startClockPosition: this.taskContext.character_starting_clock_position,
            maxSteps: this.taskContext.maxSteps,
            passPath: this.taskContext.passPath,
            instruction: instruction
        }
    }

    play() {
        logDebugInfo('play blocks')
        this.game.sound.play('press')
        let animationContext = this.getCurrentAnimationContext(this.gameContext)
        this.princess.start = true
        PrincessAnimationPlayer(animationContext)
        this.startButton.visible = false
    }

    drawBackground() {
        this.game.add.sprite(0, 0, 'background').scale.setTo(this.game.width/config.backgroundWidth, this.game.height/config.backgroundHeight)
    }

    drawForeGround() {
        this.game.add.sprite(0, 0, 'foreground').scale.setTo(this.game.width/config.backgroundWidth, this.game.height/config.backgroundHeight)
    }

    drawBoardButtons() {
        this.homeButton = this.game.add.button(10, 0, 'Buttons', this.onBackHome, this, 'buttons/home/hover', 'buttons/home/normal', 'buttons/home/click', 'buttons/home/disabled')
        this.hintButton = this.game.add.button(this.homeButton.width + 20, 0, 'Buttons', this.showInformationBoard, this, 'buttons/info/hover', 'buttons/info/normal', 'buttons/info/click', 'buttons/info/disabled')
        this.startButton = this.game.add.button(this.homeButton.width + this.hintButton.width + 40, 0, 'Buttons', this.play, this, 'buttons/start/hover', 'buttons/start/normal', 'buttons/start/click', 'buttons/start/disabled')
        TooltipBuilder(this.game, this.startButton, '开始', 'bottom')
        TooltipBuilder(this.game, this.hintButton, '关卡信息', 'bottom')
        TooltipBuilder(this.game, this.homeButton, '返回主界面', 'bottom')
    }

    drawMainCharacterAtStartingPosition() {
        let startX = this.characterStartX + this.taskContext.character_x_offset
        let startY = this.characterStartY - Math.round(this.taskContext.character_height_in_pixel / 3) + this.taskContext.character_y_offset
        logDebugInfo('Draw main character at location: x = ' + startX + ' and y = ' + startY)
        let sprite = new Princess({
            game: this.game,
            name: 'princess',
            x: startX,
            y: startY,
            yOffset: Math.round(this.taskContext.character_height_in_pixel / 3),
            speed: this.taskContext.speed,
            asset: this.gameContext.spritesheets[0].key,
            frame: 0
        })
        this.princess = this.game.add.existing(sprite)
        this.initPrincessPosition()
    }

    initPrincessPosition() {
        this.princess.actionQueue.push({
            name: 'TurnRight0_' + this.taskContext.character_starting_clock_position,
            xOffset: 0,
            yOffset: 0,
            audio: null
        })
    }

    drawPath() {
        logDebugInfo('Draw task path.')
        let path = this.game.add.sprite(Math.round(this.game.width/2), Math.round(this.game.height/2), 'taskPath')
        path.anchor.setTo(0.5, 0.5)
    }

    setCurrentGameContexts() {
        this.gameContext = JSON.parse(this.game.cache.getText('gameContext'))
    }

    setCurrentTaskContext() {
        this.taskContext = JSON.parse(this.game.cache.getText('taskContext'))
    }

    loadPath() {
        logDebugInfo('Load path image: ' + this.taskContext.pathImage)
        this.game.load.image('taskPath', this.taskContext.pathImage)
    }

    addAnimationsForSprite(sprite, spritesheets) {
        for (let i = spritesheets.length - 1; i >= 0; i--) {
            let spritesheet = spritesheets[i]
            sprite.loadTexture(spritesheet.key)
            for (let j = 0; j < spritesheet.animations.length; j++) {
                let animation = spritesheet.animations[j]
                logDebugInfo('Add animation: ' + animation.name + ' for sprite: ' + sprite.name)
                sprite.animations.add(animation.name, animation.frames, animation.rate, animation.loop, false)
            }
        }
    }

    addAudios() {
        for (let i = 0; i < this.gameContext.audios.length; i++) {
            let audio = this.gameContext.audios[i]
            this.game.sound.add(audio.key)
        }
    }

    addWorkspace() {
        /* Reposition block div first */
        repositionBlock(252, 744, this.game.height)
        repositionText(429, 315, 252)
        let options = {
            comments: false,
            disable: false,
            collapse: false,
            media: 'assets/blocks/media/',
            readOnly: false,
            rtl: false,
            scrollbars: false,
            toolbox: Blockly.Blocks.defaultToolboxPrincess,
            trashcan: true,
            horizontalLayout: true,
            toolboxPosition: true,
            sounds: true,
            colours: {
                workspace: '#334771',
                flyout: '#334771',
                scrollbar: '#24324D',
                scrollbarHover: '#0C111A',
                insertionMarker: '#FFFFFF',
                insertionMarkerOpacity: 0.3,
                fieldShadow: 'rgba(255, 255, 255, 0.3)',
                dragShadowOpacity: 0.6
            }
        }
        this.game.workspace = Blockly.inject('block', options);
    }

    loadToolbox() {
        let tree = Blockly.Xml.textToDom(this.taskContext.toolbox)
        this.game.workspace.updateToolbox(tree)
        document.getElementById('instructions').innerHTML = ''
    }

    init() {
        logDebugInfo('PrincessAnimationBoard Init.')
        if (this.game.global.preTaskIndex !== this.game.global.currentTaskIndex) {
            this.created = false
        }
    }

    preload() {
        logDebugInfo('PrincessAnimationBoard Preload.')
        this.setCurrentGameContexts()
        this.setCurrentTaskContext()
    }

    loadAssets() {
        logDebugInfo('Load assets.')
        this.loadPath()
        this.game.load.start()
    }

    create() {
        logDebugInfo('PrincessAnimationBoard Create.')
        if (!this.created) {
            this.loadingText = createLoadingText(this.game)
            this.game.load.onLoadStart.addOnce(loadStart, this);
            this.game.load.onFileComplete.add(fileComplete, this);
            this.game.load.onLoadComplete.addOnce(this.loadComplete, this);
            this.loadAssets()
        } else {
            this.renderState()
        }
    }

    onBackHome() {
        this.game.state.start('MainMenu')
    }

    drawTitle() {
        let titleboard = this.game.add.sprite(Math.round(this.game.width / 2), 0, 'titleboard')
        titleboard.anchor.setTo(0.5, 0)
        titleboard.alpha = 0.8
        let title = this.game.add.text(Math.round(this.game.width / 2), 10, this.taskContext.title, {font: 'bold 30px Arial', fill: '#3399FF', align: 'center'})
        title.anchor.setTo(0.5, 0)
    }

    renderState() {
        this.calculateCharacterStartingPositionResponsively()
        this.drawBackground()
        this.drawForeGround()
        this.drawPath()
        this.drawBoardButtons()
        this.drawMainCharacterAtStartingPosition()
        this.drawTitle()
        this.addAnimationsForSprite(this.princess, this.gameContext.spritesheets)
        this.addAudios()
        if (typeof this.game.workspace === "undefined"){
            // Only create blocks once
            this.addWorkspace()
        }
        this.game.workspace.clear()
        this.loadToolbox()
        showBlock()
    }

    loadComplete() {
        this.renderState()
        this.loadingText.destroy()
        this.created = true
    }

    showInformationBoard() {
        if (!this.infoBoard) {
            this.infoBoard = this.game.add.image(Math.round(this.game.width / 2), Math.round(this.game.height / 2)-100,'info')
            this.infoBoard.anchor.setTo(0.5, 0.5)
            this.infoBoard.scale.setTo(0.7,0.7)
            this.infoBoard.alpha = 0.8
            this.info = this.game.add.text(Math.round(this.game.width / 2), Math.round(this.game.height / 2)-100, this.taskContext.info + '\nHints:\n' + this.taskContext.hint, {font: 'bold 20px Arial', fill: '#FFFFFF', align: 'left'})
            this.info.anchor.setTo(0.5, 0.5)
            this.closeButton = this.game.add.button(Math.round(this.game.width / 2)+270, Math.round(this.game.height / 2)-285, 'Buttons', this.hideInformationBoard, this, 'buttons/restart/hover', 'buttons/restart/normal', 'buttons/restart/click', 'buttons/restart/disabled')
            this.closeButton.anchor.setTo(0.5, 0.5)
            this.closeButton.scale.setTo(0.5, 0.5)
            TooltipBuilder(this.game, this.closeButton, '返回', 'bottom')
        } else {
            this.infoBoard.visible = true
            this.info.visible = true
            this.closeButton.visible = true
        }
    }

    hideInformationBoard() {
        this.infoBoard.visible = false
        this.info.visible = false
        this.closeButton.visible = false
    }
}
