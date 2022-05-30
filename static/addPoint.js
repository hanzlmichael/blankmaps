import { canvas } from "./script.js";

export function startAddingPoints() {
  let isDrawing = true;

  function deletePoint() {
    canvas.getObjects().forEach(function (o) {
      if (o.id === "delete") {
        canvas.remove(o);
      }
    })
  }

  canvas.on("mouse:move", function (options) {
    if (isDrawing) {
      deletePoint();
      let obj = canvas.getPointer(options.e, false);
      canvas.add(
        new fabric.Circle({
          radius: "7",
          fill: "red",
          top: obj.y - 15,
          left: obj.x - 15,
          id: "delete",
        })
      );
    }
  });

  let createdPoint = true;

  canvas.on("mouse:down", function (options) {
    isDrawing = false;
    if (createdPoint) {
      let obj = canvas.getPointer(options.e, false);

      let newObj = new fabric.Circle({
        radius: "7",
        fill: "red",
        top: obj.y - 15,
        left: obj.x - 15,
      });
      newObj.borderColor = "red";
      newObj.borderDashArray = [5];
      newObj.padding = 5;
      
      deletePoint();
      canvas.add(newObj);
      createdPoint = false;
      let controls = ['tl', 'tr', 'br', 'bl', 'ml', 'mt', 'mr', 'mb', 'mtr']
      controls.forEach(control => newObj.setControlVisible(control, false))      
      
      let objectCount = canvas.getObjects().length
      canvas.setActiveObject(canvas.item(objectCount-1))
    }
  })  
}




