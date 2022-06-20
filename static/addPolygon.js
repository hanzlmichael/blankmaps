import { canvas } from "./script.js"
import { turnOfControls } from "./globalPrototypeSetting.js"

var arr = []
let start
let clicks = 0
let afterFirstClick = false
let startCircle

export function startAddingPolygons() {
  console.log(2)
  deletePolygon()
  resetValues()
  let isDrawing = true
  fabric.Object.prototype.moveCursor = "default"
  fabric.Object.prototype.hoverCursor = "default"

  /* let arr = []
  let start
  let clicks = 0
  let afterFirstClick = false
  let startCircle
  resetValues() */


  /* function turnOfControls(obj) {
    let controls = ["tl", "tr", "br", "bl", "ml", "mt", "mr", "mb", "mtr"]
    controls.forEach((control) => obj.setControlVisible(control, false))
    obj.hasBorders = false
  } */



  function drawCircleWhenDragging(coords) {    
    startCircle = new fabric.Circle({
      radius: "2",
      fill: "rgba(255,0,0,0.75)",
      top: coords.y - 2,
      left: coords.x - 2,
      id: "permanent",
      startPoint: true,
    })
    turnOfControls(startCircle)
    startCircle.hasBorders = false
    canvas.add(startCircle)
    start = coords
  }

  canvas.on("mouse:move", function (options) {
    if (isDrawing) {
      if (afterFirstClick) {
        arr[clicks] = getCoords(options)
        deletePolygon()
        drawPolygon("temporary", "rgba(255,0,0,0.5)")

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
  })

  canvas.on("mouse:down", function (options) {
    if (isDrawing) {
      afterFirstClick = true
      arr.push(getCoords(options))
      drawPolygon("temporary", "rgba(255,0,0,0.5)")
      clicks++

      if (
        isPointInCircle(canvas.getPointer("mouse:down", false)) &&
        clicks > 2
      ) {
        deletePolygon()
        deleteStartPoint()
        arr[clicks] = start
        arr[clicks - 1] = start

        isDrawing = false        
        drawFinalPolygonTest()
        //resetValues()
        //"#F5423D" red color stejna jako close icon
      }
    }
  })

  function resetValues() {
    clicks = 0
    afterFirstClick = false
    arr.length = 0
    startCircle = null
  }


  function getCoords(options) {
    return canvas.getPointer(options.e, false)
  }
  function drawPolygon(type, color) {
    let polygon = new fabric.Polyline(arr, {
      fill: color,
      stroke: "red",
      strokeLineJoin: "round",
      strokeWidth: 1,
      id: type,
    })
    turnOfControls(polygon)
    polygon.hasBorders = false
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
        o.set("fill", "rgba(255,0,0,0.75)")
      }
    })
  }

  function drawFinalPolygonTest() {
    var poly = new fabric.Polyline(
      arr,
      {
        fill: "rgba(255,0,0,0.75)",
        stroke: "red",
        id: "permament"
      }
    )
    console.log(arr)
    poly.borderColor = "red"
    poly.borderDashArray = [5]
    poly.padding = 5
    turnOfControls(poly)
    canvas.add(poly)
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
