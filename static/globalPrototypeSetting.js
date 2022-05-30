function setDefaultCursor() {
  fabric.Object.prototype.moveCursor = "default"
  fabric.Object.prototype.hoverCursor = "default"
}

function turnOfControls(obj) {
  let controls = ["tl", "tr", "br", "bl", "ml", "mt", "mr", "mb", "mtr"]
  controls.forEach((control) => obj.setControlVisible(control, false))
  obj.hasBorders = false;
}

export { setDefaultCursor, turnOfControls }