import { canvas } from "./script.js"
import { turnOfControls } from "./globalPrototypeSetting.js"

export function startDrawingCurve() {
  turnOfControls()
  activateSettings() 
  canvas.isDrawingMode = !canvas.isDrawingMode;
  let brush = canvas.freeDrawingBrush;
  brush.color = '#0080FF';
  brush.width = 1.5;
}

function activateSettings() {
  fabric.Object.prototype.padding = 10;
  fabric.Object.prototype.borderColor = "rgb(211,33,45)"
  fabric.Object.prototype.borderDashArray = [5]
}