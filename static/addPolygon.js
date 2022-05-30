import { canvas } from "./script.js";

export function startAddingPolygons() {
  let isDrawing = true
  fabric.Object.prototype.moveCursor = "default"
  fabric.Object.prototype.hoverCursor = "default"

  let arr = []
  let start
  let clicks = 0
  let afterFirstClick = false
  let startCircle

  function turnOfControls(obj) {
    let controls = ["tl", "tr", "br", "bl", "ml", "mt", "mr", "mb", "mtr"]
    controls.forEach((control) => obj.setControlVisible(control, false))
    obj.hasBorders = false;
  }

  function drawCircleWhenDragging(coords) {
    startCircle = new fabric.Circle({
      radius: "2",
      fill: "tomato",
      top: coords.y - 2,
      left: coords.x - 2,
      id: "permanent",
      startPoint: true,
    })
    turnOfControls(startCircle);
    canvas.add(startCircle);
    start = coords
  }

  canvas.on("mouse:move", function (options) {
    if (isDrawing) {
      if (afterFirstClick) {
        arr[clicks] = getCoords(options)
        deletePolygon()
        drawPolygon("temporary", "rgba(240,240,240,0.5)")

        if (
          isPointInCircle(canvas.getPointer("mouse:over", false)) &&
          clicks > 2
        ) {
          getTemporaryPolygon()
          canvas.renderAll()
        }
      } else {
        deleteStartPoint()
        let coords = getCoords(options)
        drawCircleWhenDragging(coords)
      }
    }
  });

  canvas.on("mouse:down", function (options) {
    if (isDrawing) {
      afterFirstClick = true
      arr.push(getCoords(options))
      drawPolygon("temporary", "rgba(240,240,240,0.5)")
      clicks++

      if (
        isPointInCircle(canvas.getPointer("mouse:down", false)) &&
        clicks > 2
      ) {
        deletePolygon()
        deleteStartPoint()
        arr[clicks] = start
        arr[clicks - 1] = start
        drawPolygon("permament", "tomato")
        isDrawing = false
        resetValues()
      }
    }
  })

  function resetValues() {
    clicks = 0
    afterFirstClick = false
    arr = []
  }

  function getCoords(options) {
    return canvas.getPointer(options.e, false)
  }
  function drawPolygon(type, color) {
    let polygon = new fabric.Polyline(arr, {
      fill: color,
      stroke: "tomato",
      strokeLineJoin: "round",
      strokeWidth: 1,
      id: type,
    })

    turnOfControls(polygon);
    canvas.add(polygon)
  }
  function deletePolygon() {
    canvas.getObjects().forEach(function (o) {
      if (o.id === "temporary") {
        canvas.remove(o)
      }
    })
  }
  function getTemporaryPolygon() {
    canvas.getObjects().forEach(function (o) {
      if (o.id === "temporary") {
        o.set("fill", "tomato")
      }
    })
  }
  function deleteStartPoint() {
    canvas.getObjects().forEach(function (o) {
      if (o.startPoint === true) {
        canvas.remove(o)
      }
    })
  }

  function isPointInCircle(point) {
    return (
      Math.sqrt(
        Math.pow(point.x - arr[0].x, 2) + Math.pow(point.y - arr[0].y, 2)
      ) <= 4
    )
  }
}
