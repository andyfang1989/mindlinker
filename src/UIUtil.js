export function setScaleAndAnchorForObject(obj, sX, sY, aX, aY) {
    obj.scale.setTo(sX, sY)
    obj.anchor.setTo(aX, aY)
}

export function hideBlock() {
    document.getElementById('block').style.visibility = 'hidden'

}

export function showBlock() {
    document.getElementById('block').style.visibility = 'visible'
}

export function createLoadingText(game) {
    let loadingText = game.add.text(game.world.centerX, game.world.centerY, 'Loading...', { font: "65px Arial", fill: "#F3FF33", align: "center" })
    loadingText.anchor.set(0.5)
    return loadingText
}

