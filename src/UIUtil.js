export function setScaleAndAnchorForObject(obj, sX, sY, aX, aY) {
    obj.scale.setTo(sX, sY)
    obj.anchor.setTo(aX, aY)
}

export function hideBlock() {
    document.getElementById('block').style.visibility = "hidden"

}

export function showBlock() {
    document.getElementById('block').style.visibility = "visible"
}

