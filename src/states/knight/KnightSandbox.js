/**
 * Created by kfang on 10/1/17.
 */
import Phaser from 'phaser'
import TooltipBuilder from '../../util/TooltipBuilder'
import {sendHttpRequest, printHttpResponse, createLoadingText, loadStart, fileComplete, rescaleObject, rescaleXOffset, rescaleYOffset} from '../../UIUtil'
import {logDebugInfo} from '../../Logger'
import config from '../../config'

export default class extends Phaser.State {
    calculateAndSetGridPositionAndStepSizesResponsively(){
        logDebugInfo('Game width: ' + this.game.width + ' height: ' + this.game.height)
        this.step_width_in_pixel = rescaleXOffset(this.gameContext.grid_image_width, this.game)
        this.step_height_in_pixel = rescaleYOffset(this.gameContext.grid_image_height, this.game)

        this.gridStartX = rescaleXOffset(this.gameContext.grid_board_top_left_x, this.game) + Math.round(this.step_width_in_pixel / 2)
        this.gridStartY = rescaleYOffset(this.gameContext.grid_board_top_left_y, this.game) + Math.round(this.step_height_in_pixel / 2)

        this.resourceStartX = rescaleXOffset(this.taskContext.resourceStartX, this.game)
        this.resourceStartY = rescaleYOffset(this.taskContext.resourceStartY, this.game)
        logDebugInfo('step_width_in_pixel: ' + this.step_width_in_pixel + ' step_height_in_pixel: ' + this.step_height_in_pixel)
        logDebugInfo('gridStartX: ' + this.gridStartX + ' this.gridStartY: ' + this.gridStartY)
        logDebugInfo('resource start x: ' + this.resourceStartX + ' resource start y: ' + this.resourceStartY)
    }

    drawBackground() {
        let background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'background')
        rescaleObject(background, this.game, 1, 1.2)
        background.anchor.setTo(0.5, 0.5)
    }

    drawBoardButtons() {
        let x = rescaleXOffset(80, this.game)
        let y = rescaleYOffset(80, this.game)
        let spacer = rescaleXOffset(20, this.game)
        this.backToTasksButton = this.game.add.button(x, y, 'Buttons', this.onBackToTasks, this, 'buttons/star/hover', 'buttons/star/normal', 'buttons/star/click', 'buttons/star/disabled')
        rescaleObject(this.backToTasksButton, this.game, 1, 1)
        x += rescaleXOffset(this.backToTasksButton.width, this.game)
        x += spacer
        this.editInfoButton = this.game.add.button(x, y, 'Buttons', this.editInformationBoard, this, 'buttons/info/hover', 'buttons/info/normal', 'buttons/info/click', 'buttons/info/disabled')
        rescaleObject(this.editInfoButton, this.game, 1, 1)
        x += rescaleXOffset(this.editInfoButton.width, this.game)
        x += spacer
        this.editTitleButton = this.game.add.button(x, y, 'Buttons', this.editTitle, this, 'buttons/start/hover', 'buttons/start/normal', 'buttons/start/click', 'buttons/start/disabled')
        rescaleObject(this.editTitleButton, this.game, 1, 1)
        x += rescaleXOffset(this.editTitleButton.width, this.game)
        x += spacer
        this.clearButton = this.game.add.button(x, y, 'Buttons', this.clearSandbox, this, 'buttons/start/hover', 'buttons/start/normal', 'buttons/start/click', 'buttons/start/disabled')
        rescaleObject(this.clearButton, this.game, 1, 1)
        x += rescaleXOffset(this.clearButton.width, this.game)
        x += spacer
        this.saveButton = this.game.add.button(x, y, 'Buttons', this.saveSandbox, this, 'buttons/start/hover', 'buttons/start/normal', 'buttons/start/click', 'buttons/start/disabled')
        rescaleObject(this.saveButton, this.game, 1, 1)
        this.clearButton.anchor.setTo(0.5, 0.5)
        this.saveButton.anchor.setTo(0.5, 0.5)
        this.backToTasksButton.anchor.setTo(0.5, 0.5)
        this.editInfoButton.anchor.setTo(0.5, 0.5)
        this.editTitleButton.anchor.setTo(0.5, 0.5)
        TooltipBuilder(this.game, this.clearButton, '清空沙盘', 'bottom')
        TooltipBuilder(this.game, this.saveButton, '保存沙盘', 'bottom')
        TooltipBuilder(this.game, this.editTitleButton, '编辑关卡名称', 'bottom')
        TooltipBuilder(this.game, this.editInfoButton, '编辑关卡信息', 'bottom')
        TooltipBuilder(this.game, this.backToTasksButton, '返回关卡选择页面', 'bottom')
    }

    saveSandbox() {
        logDebugInfo(JSON.stringify(this.taskContext))
        let url = config.createSandboxForUser
        let operation = 'POST'
        let params = JSON.stringify(this.taskContext)
        sendHttpRequest(printHttpResponse, operation, url, params)
    }

    clearSandbox() {
        for (let i = 0; i < this.resourcePool.length; i++) {
            let resource = this.resourcePool[i]
            resource.visible = false
            resource.count = 0
        }
        for (let i = 0; i < this.spritePool.length; i++) {
            let sprite = this.spritePool[i]
            sprite.destroy()
        }
        this.setCurrentTaskContext()
        logDebugInfo(JSON.stringify(this.taskContext))
    }

    setUpResource(spriteKey, max, resource) {
        resource.spriteKey = spriteKey
        resource.max = max
        resource.count = 0
    }

    decrementResource(spriteKey) {
        for (let i = 0; i < this.resourcePool.length; i++) {
            let resource = this.resourcePool[i]
            if (resource.spriteKey === spriteKey) {
                resource.count++
                break
            }
        }
    }

    drawMainCharacterResource() {
        let mainCharacter = this.game.add.button(this.resourceStartX, this.resourceStartY, this.gameContext.spritesheets[0].key, this.addResource, {key: this.mainSpriteKey, state: this})
        rescaleObject(mainCharacter, this.game, 1, 1)
        mainCharacter.anchor.setTo(0.5, 0.5)
        this.resourceStartX += rescaleXOffset(mainCharacter.width, this.game)
        this.resourceStartX += this.spacer
        this.resourcePool.push(mainCharacter)
        this.setUpResource(this.mainSpriteKey, 1, mainCharacter)
    }

    drawSprite(x, y, key) {
        let sprite = this.game.add.sprite(x, y, key)
        rescaleObject(sprite, this.game, 1, 1)
        sprite.anchor.setTo(0.5, 0.5)
        this.spritePool.push(sprite)
    }

    drawMainCharacter(x, y, key) {
        const cHeight = this.gameContext.character_height_in_pixel
        logDebugInfo('Calculating character starting position: grid starting x: ' + this.gridStartX + ' grid starting y: ' + this.gridStartY)
        const targetGridXMid = this.gridStartX + Math.round(x * this.step_width_in_pixel)
        const targetGridYMid = this.gridStartY + Math.round(y * this.step_height_in_pixel) - rescaleYOffset(Math.round(cHeight * 0.4), this.game)
        this.drawSprite(targetGridXMid, targetGridYMid, key)
    }

    drawItem(x, y, xoffset, yoffset, key, width, height) {
        const targetGridXMid = this.gridStartX + Math.round(x * this.step_width_in_pixel) + rescaleXOffset(Math.round(xoffset * width), this.game)
        const targetGridYMid = this.gridStartY + Math.round(y * this.step_height_in_pixel) + rescaleYOffset(Math.round(yoffset * height), this.game)
        this.drawSprite(targetGridXMid, targetGridYMid, key)
    }

    drawInteractionItemResources() {
        for (let i = 0; i < this.taskContext.interactionItems.length; i++) {
            let conf = this.taskContext.interactionItems[i]
            let interactionItem = this.game.add.button(this.resourceStartX, this.resourceStartY, conf.spriteSheetKey, this.addResource, {key: conf.spriteKey, xoffset: conf.xoffset, yoffset: conf.yoffset, interactive: true, state: this})
            rescaleObject(interactionItem, this.game, 1, 1)
            interactionItem.anchor.setTo(0.5, 0.5)
            this.resourceStartX += rescaleXOffset(interactionItem.width, this.game)
            this.resourceStartX += this.spacer
            this.resourcePool.push(interactionItem)
            this.setUpResource(conf.spriteSheetKey, conf.max, interactionItem)
        }
    }

    drawItemResources() {
        for (let i = 0; i < this.taskContext.items.length; i++) {
            let conf = this.taskContext.items[i]
            let item = this.game.add.button(this.resourceStartX, this.resourceStartY, conf.key, this.addResource, {key: conf.key, xoffset: conf.xoffset, yoffset: conf.yoffset, interactive: false, state: this})
            rescaleObject(item, this.game, 1, 1)
            item.anchor.setTo(0.5, 0.5)
            this.resourceStartX += rescaleXOffset(item.width, this.game)
            this.resourceStartX += this.spacer
            this.resourcePool.push(item)
            this.setUpResource(conf.key, conf.max, item)
        }
    }

    drawGridBoard() {
        let gridWidth = this.step_width_in_pixel
        let gridHeight = this.step_height_in_pixel
        let gridXSize = this.gameContext.grid_x_size
        let gridYSize = this.gameContext.grid_y_size
        logDebugInfo('Background width = ' + this.game.width + ' Background height = ' + this.game.height + ' GridStartX: ' + this.gridStartX + ' GridStartY = ' + this.gridStartY + ' GridWidth = ' + gridWidth + ' GridHeight = ' + gridHeight)
        logDebugInfo('Draw grid images.')
        for (let r = 0; r < gridYSize; r++) {
            for (let c = r % 2; c < gridXSize; c += 2) {
                let ix = Math.round(this.gridStartX + c * gridWidth)
                let iy = Math.round(this.gridStartY + r * gridHeight)
                logDebugInfo('Draw grid images at r = ' + r + ' c = ' + c + ' x = ' + ix + ' y = ' + iy)
                let gridButton = this.game.add.button(ix, iy, 'grid', this.selectGrid, {x: c, y: r, state: this})
                rescaleObject(gridButton, this.game, 1, 1)
                gridButton.anchor.setTo(0.5, 0.5)
            }
        }
    }

    preloadImages() {
        for (let i = 0; i < this.taskContext.items.length; i++) {
            let item = this.taskContext.items[i]
            this.game.load.image(item.key, item.image)
        }
    }

    setCurrentGameContexts() {
        this.gameContext = JSON.parse(this.game.cache.getText('gameContext'))
    }

    setCurrentTaskContext() {
        this.taskContext = JSON.parse(this.game.cache.getText('taskContext'))
    }

    init() {
        logDebugInfo('KnightAnimationBoard Init.')
        this.created = false
        this.spacer = rescaleXOffset(20, this.game)
        this.mainSpriteKey = 'MAIN_CHARACTER'
        this.spritePool = []
        this.resourcePool = []
    }

    preload() {
        logDebugInfo('KnightAnimationBoard Preload.')
        this.setCurrentGameContexts()
        this.setCurrentTaskContext()
    }

    loadAssets() {
        this.preloadImages()
        this.game.load.start()
    }

    create() {
        logDebugInfo('KnightAnimationBoard Create.')
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

    editInformationBoard() {
        let info = prompt('请输入关卡信息： ','控制骑士抵达战旗位置。')
        this.taskContext.info = info
    }

    hideInformationBoard() {
        this.infoBoard.visible = false
        this.info.visible = false
        this.closeButton.visible = false
    }

    onBackToTasks() {
        this.game.state.start('KnightStoryBoard')
    }

    loadComplete() {
        this.renderState()
        this.loadingText.destroy()
        this.created = true
    }

    editTitle() {
        let title = prompt('请输入游戏名称： ','骑士沙盘游戏')
        this.taskContext.title = title
    }

    addResource() {
        logDebugInfo('Add Resource: ' + this.key)
        if (this.key === this.state.mainSpriteKey) {
            this.state.taskContext.character_starting_grid_x = this.state.selectedX
            this.state.taskContext.character_starting_grid_y = this.state.selectedY
            this.state.drawMainCharacter(this.state.selectedX, this.state.selectedY, this.state.gameContext.spritesheets[0].key)
            this.state.decrementResource(this.state.mainSpriteKey)
        } else if (this.interactive) {
            for (let i = 0; i < this.state.taskContext.interactionItems.length; i++) {
                let interactiveItem = this.state.taskContext.interactionItems[i]
                if (interactiveItem.spriteKey === this.key) {
                    interactiveItem.coordinates.push({x: this.state.selectedX, y: this.state.selectedY, xoffset: this.xoffset, yoffset: this.yoffset})
                    let interactions = this.state.taskContext.passCondition.interactions
                    interactions.push({
                        sprite: this.key + interactions.length,
                        status: interactiveItem.statusPostAnimation
                    })
                    this.state.drawItem(this.state.selectedX, this.state.selectedY, this.xoffset, this.yoffset, interactiveItem.spriteSheetKey, interactiveItem.width, interactiveItem.height)
                    this.state.decrementResource(this.key)
                    break
                }
            }
        } else {
            for (let i = 0; i < this.state.taskContext.items.length; i++) {
                let item = this.state.taskContext.items[i]
                if (item.key === this.key) {
                    item.coordinates.push({x: this.state.selectedX, y: this.state.selectedY, xoffset: this.xoffset, yoffset: this.yoffset})
                    this.state.drawItem(this.state.selectedX, this.state.selectedY, this.xoffset, this.yoffset, this.key, item.width, item.height)
                    this.state.decrementResource(this.key)
                    if (this.key === 'victory') {
                        this.state.taskContext.passCondition.destinationXGrid = this.state.selectedX
                        this.state.taskContext.passCondition.destinationYGrid = this.state.selectedY
                    }
                    break
                }
            }
        }
        logDebugInfo(JSON.stringify(this.state.taskContext))
        for (let i = 0; i < this.state.resourcePool.length; i++) {
            let resource = this.state.resourcePool[i]
            resource.visible = false
        }
    }

    selectGrid() {
        logDebugInfo('Select Grid: ' + ' x: ' + this.x + ' y: ' + this.y)
        this.state.selectedX = this.x
        this.state.selectedY = this.y
        for (let i = 0; i < this.state.resourcePool.length; i++) {
            let resource = this.state.resourcePool[i]
            if (resource.max === -1 || resource.count < resource.max) {
                resource.visible = true
            }
        }
    }

    renderState() {
        this.calculateAndSetGridPositionAndStepSizesResponsively()
        this.drawBackground()
        this.drawBoardButtons()
        this.drawGridBoard()
        this.drawMainCharacterResource()
        this.drawItemResources()
        this.drawInteractionItemResources()
        for (let i = 0; i < this.resourcePool.length; i++) {
            let resource = this.resourcePool[i]
            resource.visible = false
        }
    }
}
