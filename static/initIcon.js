import {resetZoom} from './map.js'
import {startDraw} from './script.js'

export function initObjectDeleteIcon() {
  let deleteIcon =
    "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

  let deleteImg = document.createElement("img");
  deleteImg.src = deleteIcon;

  function renderIcon(icon) {
    return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
      let size = this.cornerSize;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
      ctx.drawImage(icon, -size / 2, -size / 2, size, size);
      ctx.restore();
    };
  }

  fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetY: -16,
    offsetX: 16,
    cursorStyle: "pointer",
    mouseUpHandler: deleteObject,
    render: renderIcon(deleteImg),
    cornerSize: 24,
  });

  function deleteObject(eventData, transform) {
    let target = transform.target;
    let canvas = target.canvas;
    canvas.remove(target);
    canvas.requestRenderAll();
  }
}

export function initMapIcons() {
  createResizeIcon()
  createAddIcon()
  createTickIcon()
  createGroupIcon()
  createDeleteIcon()
}

function createResizeIcon() {
  let svg = '<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="32" viewBox="0 0 24 24" width="32" class="resize-icon"><g><rect fill="none" height="24" width="24"/></g><g><g><g><path d="M15,3l2.3,2.3l-2.89,2.87l1.42,1.42L18.7,6.7L21,9V3H15z M3,9l2.3-2.3l2.87,2.89l1.42-1.42L6.7,5.3L9,3H3V9z M9,21 l-2.3-2.3l2.89-2.87l-1.42-1.42L5.3,17.3L3,15v6H9z M21,15l-2.3,2.3l-2.87-2.89l-1.42,1.42l2.89,2.87L15,21h6V15z"/></g></g></g></svg>'
  document.querySelector('.canvas-container').insertAdjacentHTML('beforeend', svg)
  document.querySelector('.resize-icon').addEventListener('click', resetZoom)
}

function createAddIcon() {
  let svg = '<svg xmlns="http://www.w3.org/2000/svg" class="add-icon" height="32" viewBox="0 0 24 24" width="32"><rect style="fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.37795275;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" id="rect1418" width="12.940678" height="12.050847"x="5.3135595" y="5.7966104"/><path d="M0 0h24v24H0z" fill="none" /><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" style="fill:#0091ea;fill-opacity:1" /></svg>'
  //let svg = '<svg xmlns="http://www.w3.org/2000/svg" class="add-icon" height="32" viewBox="0 0 24 24" width="32"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>'
  document.querySelector('.canvas-container').insertAdjacentHTML('beforeend', svg)
  document.querySelector('.add-icon').addEventListener('click', startDraw)
}

function createTickIcon() {
  let svg = '<svg xmlns="http://www.w3.org/2000/svg" height="32" class="tick-icon" viewBox="0 0 24 24" width="32"><rect style="fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.37795275;stroke-it:4;stroke-dasharray:none;stroke-opacity:1" id="rect5738" width="15.661017" height="15.152542" x="4.3728814" y="4.4745765" /><path d="M0 0h24v24H0z" fill="none"/><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" style="fill:#0091ea;fill-opacity:1"/></svg>'
   document.querySelector('.canvas-container').insertAdjacentHTML('beforeend', svg)
   document.querySelector('.tick-icon').addEventListener('click', setCorrectAnswer)
 }
 
 function createGroupIcon() {
   let svg = '<svg xmlns="http://www.w3.org/2000/svg" class="group-icon" height="32"viewBox="0 0 24 24" width="32"><rect style="fill:#0091ea;fill-opacity:1;stroke:none;stroke-width:0.37795275;stroke-4;stroke-dasharray:none;stroke-opacity:1" width="12.940678" height="12.050847"x="5.6949153"y="6.1016955"/><path d="M0 0h24v24H0z" fill="none"/><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" style="fill:#0091ea;fill-opacity:1"/><path d="m 5.4722879,5.736627 v 2.324279 h 0.9033254 v 8.134977 H 5.4722879 v 2.324279 h 2.4088678 v -0.871605 h 8.4310383 v 0.871605 h 2.408868 V 16.195883 H 17.817736 V 8.060906 h 0.903326 V 5.736627 H 16.312194 V 6.6082316 H 7.8811557 V 5.736627 Z M 7.8811557,7.1893013 H 16.312194 V 8.060906 h 0.903325 v 8.134977 h -0.903325 v 0.871605 H 7.8811557 V 16.195883 H 6.9778304 V 8.060906 H 7.8811557 Z M 8.4833727,8.641976 V 13 H 13 V 8.641976 Z m 5.1188443,2.32428 V 13.58107 H 10.89224 v 2.033743 h 4.817737 v -4.648557 z" style="fill:#ffffff;fill-opacity:1;stroke-width:0.29577443"/></svg>'
   document.querySelector('.canvas-container').insertAdjacentHTML('beforeend', svg)
   document.querySelector('.group-icon').addEventListener('click', setCorrectAnswer)
 }

 function createDeleteIcon() {
   let svg = '<svg xmlns="http://www.w3.org/2000/svg" class="delete-icon" height="32" viewBox="0 0 24 24" width="32"><rect style="fill:#0091ea;fill-opacity:1;stroke:none;stroke-width:0.37795275;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" width="12.940678" height="12.050847" x="5.6949153" y="6.1016955"/><path d="M0 0h24v24H0z" fill="none"/><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"style="fill:#0091ea;fill-opacity:1" /><path d="m 7.2807991,17.083764 c 0,0.801619 0.7174701,1.457489 1.5943782,1.457489 H 15.25269 c 0.876908,0 1.594378,-0.65587 1.594378,-1.457489 V 8.3388285 H 7.2807991 Z M 17.644257,6.1525946 H 14.854096 L 14.056906,5.4238499 H 10.07096 L 9.2737717,6.1525946 H 6.48361 v 1.4574892 h 11.160647 z" style="fill:#ffffff;fill-opacity:1;stroke-width:0.76219898"/></svg>'
   document.querySelector('.canvas-container').insertAdjacentHTML('beforeend', svg)
   document.querySelector('.delete-icon').addEventListener('click', setCorrectAnswer)
 }

 function setCorrectAnswer() {
   //TODO
 }