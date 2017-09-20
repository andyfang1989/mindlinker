/**
 * Created by kfang on 7/11/17.
 */
import Phaser from 'phaser'
import KnightBootState from './knight/KnightBoot'
import PrincessBootState from './princess/PrincessBoot'
import TooltipBuilder from '../util/TooltipBuilder'
import {setScaleAndAnchorForObject, hideBlock, createLoadingText, loadStart, fileComplete} from '../UIUtil'
import {logDebugInfo} from '../Logger'

export default class extends Phaser.State {
    init() {
        logDebugInfo('Main Menu Init.')
        this.endIndex = 1
    }

    preload() {
        logDebugInfo('Main Menu Preload.')
        this.rootContext = JSON.parse(this.game.cache.getText('rootContext'))
    }

    loadAssets() {
        let spriteSheets = this.rootContext.spritesheets
        this.game.load.image('mainBackground', this.rootContext.main_background_image)
        for (let i = 0; i < spriteSheets.length; i++) {
            let spriteSheet = spriteSheets[i]
            logDebugInfo('Load spritesheet: ' + spriteSheet.spritesheet + ' as ' + spriteSheet.key + ' with data file: ' + spriteSheet.datafile)
            this.game.load.atlasJSONArray(spriteSheet.key, spriteSheet.spritesheet, spriteSheet.datafile)
        }
        this.storyKey = 'Stories'
        this.game.load.start()
    }

    renderBackground() {
        logDebugInfo('Game width: ' + this.game.width + ' Game Height: ' + this.game.height)
        this.game.add.sprite(0, 0, 'mainBackground').scale.setTo(this.game.width/1440, this.game.height/900)
    }

    renderMenu() {
        let logo = this.game.add.sprite(200, 200, 'logo')
        logo.anchor.setTo(0.5, 0.5)
        logo.scale.setTo(0.3,0.3)
        let stories = this.rootContext.stories
        let padding = this.game.width - Math.round((this.game.width - 700) / 2)
        let x = padding
        let y = Math.round(this.game.height * 0.55)
        /**let nextButton = this.game.add.button(x, y, 'nextImage', this.onClickNext, this)
        setScaleAndAnchorForObject(nextButton, -0.5, 0.5, 0.5, 0.5)
        TooltipBuilder(this.game, nextButton, '下一页', 'bottom')**/
        for (let i = 0; i < 2; i++) {
            let story = stories[this.endIndex - i]
            let storyButton = this.game.add.button(x, y, this.storyKey, this.onClickStory, {game: this.game, story: story, index: this.endIndex - i}, story.storyHoverImageKey, story.storyNormalImageKey, story.storyClickImageKey, story.storyDisabledImageKey)
            setScaleAndAnchorForObject(storyButton, 1, 1, 0.5, 0.5)
            TooltipBuilder(this.game, storyButton, story.storyName, 'bottom')
            x -= 400
        }
        /**let prevButton = this.game.add.button(x, y, 'nextImage', this.onClickPrevious, this)
        setScaleAndAnchorForObject(prevButton, 0.5, 0.5, 0.5, 0.5)
        TooltipBuilder(this.game, prevButton, '上一页', 'bottom')**/

        /**
         hide block in main menu
         **/
        hideBlock()
    }

    create() {
        logDebugInfo('Main Menu Create.')
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

    /**
    onClickPrevious() {
        this.endIndex -= 2
        if (this.endIndex < 1) {
            this.endIndex = 1
        }
        this.renderMenu()
    }

    onClickNext() {
        this.endIndex += 2
        if (this.endIndex >= this.storyCount) {
            this.endIndex = this.storyCount - 1
        }
        this.renderMenu()
    }**/

    onClickStory() {
        logDebugInfo('On Click Story.')
        this.game.global.currentStoryConfig = this.story.storyConf
        if (this.index === 0) {
            this.game.state.add('KnightBoot', KnightBootState, false)
        } else {
            this.game.state.add('PrincessBoot', PrincessBootState, false)
        }
        logDebugInfo('About to start the story: ' + this.story.storyState)
        this.game.state.start(this.story.storyState)
    }

    loadComplete() {
        this.renderState()
        this.loadingText.destroy()
        this.created = true
    }

    renderState() {
        this.renderBackground()
        this.renderMenu()
    }
}