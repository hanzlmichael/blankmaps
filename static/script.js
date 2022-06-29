import { startAddingPoints } from './addPoint.js'
import { initObjectDeleteIcon, initMapIcons } from './initIcon.js'
import { start } from './addPolygon.js'
import { startDrawingCurve } from './addCurve.js'
import { addQuestion, manageQuestion } from './question.js'
import { activateZooming } from './map.js'
import { loadPoints } from './points.js'
import { dropdown, getSelectedDropdownValue } from './dropdown.js'

/* Inicializace Fabric canvas */
export let canvas = new fabric.Canvas('canvas')
activateZooming()
initObjectDeleteIcon()
loadPoints() 

/* Inicializace ContentEditableModulu */
maxlengthContentEditableModule.maxlengthContentEditable();

/* Prirazeni listeneru pro blok otazek */
document.querySelector('.questions').addEventListener('click', manageQuestion)
/* Symbol + v bloku pri přidání otázky poslouchá na kliknutí */
document.querySelector('#add-question').addEventListener('click', addQuestion)


/* Test title Setting*/


/* Kliknuti na input zobrazi modry okraj */
document.addEventListener('click', checkForInputs)
let lastActive = false

function checkForInputs(e) {  
  if (e.target.parentNode.classList.contains('field-input')) {
    if (lastActive) {
      findAndDeleteActive()
    }    
    e.target.parentNode.classList.add('field--active')
    e.target.parentNode.childNodes[1].classList.add('legend--active')
    lastActive = true   
  } else {
    findAndDeleteActive()
    lastActive = false
  }
}

function findAndDeleteActive() {
  if (findActive()) {
    document.querySelector('.field--active').classList.remove('field--active')
    document.querySelector('.legend--active').classList.remove('legend--active')
  }
}

function findActive() {
  return document.querySelector('.field--active')
}

/* Kliknuti na + přidat odpověď */
document.querySelector('#add-option').addEventListener('click', createOption)
//document.querySelector('#add-option-input').addEventListener('keydown', createOption)

/* zabranit odsazeni radku enterem */
document.querySelector('#add-option-input').addEventListener('keypress', (e) => {
  
  if (e.which === 13) {
      e.preventDefault();
      createOption()
  }
})

/* Přidávání možností | odpovědi */
//document.querySelectorAll('.option label').forEach(el => el.addEventListener('click', setActiveOption))
function setActiveOption(e) {
  if (document.querySelector('.option-active')) document.querySelector('.option-active').classList.remove('option-active')
  e.target.parentNode.classList.add('option-active')
}
    /* vytvoří novou možnost, přidá do DOMU a označí jako option-active */
function createOption() {
  let optValue = document.querySelector('#add-option-input').innerHTML
  let parent = document.querySelector('.option-wrapper')
  let length = document.querySelectorAll('.option').length + 1
  let newNode = `<div class="option">
    <input type="radio" id="option${length}" name="options">
    <label for="option${length}">${optValue}</label>
    <span>&#10006;</span>      
    </div>`
  parent.insertAdjacentHTML('beforeend', newNode)
  console.log(document.querySelector('.option-wrapper .option:last-child label'))
  document.querySelector('.option-wrapper .option:last-child label').addEventListener('click', setActiveOption)
  document.querySelector('.option-wrapper .option:last-child span').addEventListener('click', deleteOption)
  document.querySelector('.option-wrapper .option:first-child label').click()
  document.querySelector('#add-option-input').innerHTML = ""
}
   /* Tlačítko add-option poslouchá na kliknutí */
document.querySelector('#add-option').addEventListener('click', createOption)

/* Smazat odpověď */
function deleteOption(e) {
  let elem = e.target.closest('.option')
  elem.remove()
}

/* NAHRATI MAPY A UPRAVENI VELIKOSTI */

document.querySelector('#add-map').addEventListener("change", function(e) {
  //displayCanvasBlock()
  canvas.clear()
  var file = e.target.files[0]
  var reader = new FileReader()

  reader.onload = function(f) {
    var data = f.target.result  

    fabric.Image.fromURL(data, function(img) {
      var oImg = img.set({
        left: 0,
        top: 0,
      })
      console.log(oImg.getScaledHeight(), oImg.getScaledWidth())
      //oImg.scaleToWidth(500, false)
      oImg.scaleToHeight(700,false)
      if (oImg.getScaledWidth() > 1000) oImg.scaleToWidth(1000,false)
      canvas.setWidth(oImg.getScaledWidth())
      canvas.setHeight(oImg.getScaledHeight())
      canvas.add(oImg);
      oImg.selectable = false
      oImg.hoverCursor = "default" 
      canvas.sendToBack(oImg)
      canvas.renderAll()      
    })
  }
  reader.readAsDataURL(file) 
})

/* INICIALIZACE IKON V MAP CANVASU */
initMapIcons()

/* INICIALZICE DROPDOWNU */

dropdown()

export function startDraw() {
  let typeShape = getSelectedDropdownValue('shape')

  if (typeShape == 'point') {
    startAddingPoints()
  }
  if (typeShape == 'curve') {
    startDrawingCurve()
  }
  if (typeShape == 'polygon') {
    start()
  }
}



/* function setTypeShape(type) {
  let change = document.querySelector('#type-shape-wrap > div')
  console.log('here')
  console.log( document.querySelector(`[data-shape="${type}"]`).innerHTML)
  let html = document.querySelector(`[data-shape="${type}"]`).innerHTML
  let shapeType = document.querySelector(`[data-shape="${type}"]`)
  let result = shapeType.dataset.shape
  change.innerHTML = html
  change.setAttribute('data-shape', result)
}

function getTypeShape() {
  console.log(document.querySelector('.tryselect'))
  return document.querySelector('.tryselect').dataset.shape
} */

//TODO
function activateAddingShape() {  
}
//TODO
function setCorrectAnswer() {
  /* let elems = canvas.getObjects()
  console.log(elems)
  elems.forEach(el => {
    if (!el.isType('image')) {
      canvas.remove(el)
    }
  }) */
  /* canvas.remove(canvas.getActiveObject()) */

  console.log("objs ", canvas.getObjects())
  let len = canvas.getObjects.length
}

