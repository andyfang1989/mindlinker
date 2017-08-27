export function setScaleAndAnchorForObject(obj, sX, sY, aX, aY) {
    obj.scale.setTo(sX, sY)
    obj.anchor.setTo(aX, aY)
}

export function hideBlock() {
    document.getElementById('block').style.display = 'none'

}

export function showBlock() {
    document.getElementById('block').style.display = 'block'
}

export function createLoadingText(game) {
    let loadingText = game.add.text(game.world.centerX, game.world.centerY, '努力加载中...', { font: "65px Arial", fill: "#F3FF33", align: "center" })
    loadingText.anchor.set(0.5)
    return loadingText
}

export function loadStart() {
    this.loadingText.setText("努力加载中 ...")
}

export function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
    this.loadingText.setText("已完成: " + progress + '%')
}

