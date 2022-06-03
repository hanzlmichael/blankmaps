function setDefaultCursor() {
  fabric.Object.prototype.moveCursor = "default"
  fabric.Object.prototype.hoverCursor = "default"
}

function turnOfControls(obj) {
  console.log('heyyy')
  let controls = ["tl", "tr", "br", "bl", "ml", "mt", "mr", "mb", "mtr"]
  controls.forEach((control) => obj.setControlVisible(control, false))
}

export { setDefaultCursor, turnOfControls }