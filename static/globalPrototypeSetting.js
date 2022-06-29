function setDefaultCursor() {
  fabric.Object.prototype.moveCursor = "default"
  fabric.Object.prototype.hoverCursor = "default"
}

function turnOfControls(obj) {
  let controls = ["tl", "tr", "br", "bl", "ml", "mt", "mr", "mb", "mtr"]
  /* controls.forEach((control) => obj.setControlVisible(control, false)) */
  controls.forEach(control => fabric.Object.prototype.setControlVisible(control, false))
  fabric.Object.prototype.moveCursor = "default"
  //fabric.Object.prototype.hoverCursor = "default"
  fabric.Object.prototype.hoverCursor = "default"
}

export { setDefaultCursor, turnOfControls }