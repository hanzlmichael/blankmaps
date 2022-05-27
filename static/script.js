/* Inicializace ContentEditableModulu */
maxlengthContentEditableModule.maxlengthContentEditable();

/* Inicializace Fabric canvas */
let canvas = new fabric.Canvas('canvas')

/* Select pro výběr tvaru posloucha na kliknuti */ 
document.querySelectorAll('.try-select-wrapper').forEach(el => el.addEventListener('click', showOptions, false))
/* Select pro výběr tvaru po kliknuti na možnost */
document.querySelectorAll('.opt').forEach(el => el.addEventListener('click', selectOption))

/* Zobrazi div s možnostmi options*/
function showOptions(e) {
  let closest = e.target.closest('.try-select-wrapper').id
  closest = closest.substring(0, closest.length - 5)
  document.querySelector(`#${closest}`).classList.add('opt-active')
}
/* odebere */
function hideOptions() {
  document.querySelector('.opt-active').classList.remove('opt-active')
}

/* */
function selectOption(e) {
  let text = e.target.innerHTML
  let closest = e.target.closest('.w-select')
  closest = closest.childNodes[1].id
  changeSelectedText(text, closest)  
}
/* změní vybraný text v elementu select */
function changeSelectedText(selectedOption, id) {
  document.querySelector(`#${id} .tryselect`).innerHTML = selectedOption
  hideOptions()
}

function setTypeShape(type) {
  let change = document.querySelector('#type-shape-wrap > div')
  let html = document.querySelector(`[data-shape="${type}"]`).innerHTML
  change.innerHTML = html
}
function setQuestionType(type) {
  let change = document.querySelector('#type-question-wrap > div')
  let html = document.querySelector(`[data-value="${type}"]`).innerHTML
  change.innerHTML = html
}

/* Symbol + v bloku pri přidání otázky poslouchá na kliknutí */
document.querySelector('#add-question').addEventListener('click', addQuestion)

/* přidání nové otázky */
function addQuestion() {
  let parent = document.querySelector('#questions')
  let count = document.querySelectorAll('.q-wrap').length
  let child = `<div class="q-wrap">
  <div class="question">${count+1}</div>
  <span onclick="deleteQuestion(this)">&#10006;</span>
 </div>`
  parent.insertAdjacentHTML('beforeend', child)
  document.querySelector('.q-wrap:last-of-type').addEventListener('click', setActiveQuestion) 
}
/* smazání otázky */
function deleteQuestion(e) {
 document.querySelector('.q-wrap:last-of-type').remove()
}
/* TODO : Hover a focus po vybrání otázky */
function setActiveQuestion(e) {
  if (document.querySelector('.q-wrap-active')) {
    document.querySelector('.q-wrap-active').classList.remove('q-wrap-active')
  }
  e.target.classList.add('q-wrap-active')
}


/* Test title Setting*/


/* Kliknuti na input yobrayi modry okraj */
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
document.querySelectorAll('.editable').forEach(el => el.addEventListener('keypress', (e) => {
  console.log(e)
  if (e.which === 13) {
      e.preventDefault();
  }
}))

function createOption(e) {
  console.log(document.querySelector('#add-option-input').innerHTML)
}

/* Point fieldset povolit jen čísla */
document.querySelector("#points-input").addEventListener('keypress', function(e) {
  console.log(1)
  if (isNaN(String.fromCharCode(e.which))) 
    e.preventDefault();
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
      oImg.hoverCursor = "pointer" 
      canvas.sendToBack(oImg)
      canvas.renderAll()
      //createQuestion()
      //createResizeIcon()
      //displayQuestionBlock()        
    })
  }
  reader.readAsDataURL(file) 
})
createResizeIcon()
    /* Vytvorit ikonku pro resize */
function createResizeIcon() {
  let svg = '<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" class="resize-icon"><g><rect fill="none" height="24" width="24"/></g><g><g><g><path d="M15,3l2.3,2.3l-2.89,2.87l1.42,1.42L18.7,6.7L21,9V3H15z M3,9l2.3-2.3l2.87,2.89l1.42-1.42L6.7,5.3L9,3H3V9z M9,21 l-2.3-2.3l2.89-2.87l-1.42-1.42L5.3,17.3L3,15v6H9z M21,15l-2.3,2.3l-2.87-2.89l-1.42,1.42l2.89,2.87L15,21h6V15z"/></g></g></g></svg>'
  document.querySelector('.canvas-container').insertAdjacentHTML('beforeend', svg)
  document.querySelector('.resize-icon').addEventListener('click', resetZoom)
}

/* Zoomovani nad mapou */
canvas.on('mouse:wheel', function(opt) {
  var delta = opt.e.deltaY
  var zoom = canvas.getZoom()
  zoom *= 0.999 ** delta
  if (zoom > 20) zoom = 20
  if (zoom < 0.01) zoom = 0.01
  canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom)
  opt.e.preventDefault()
  opt.e.stopPropagation()
  /* createResizeIconOnCanvas() */
})

/* Resetovani zoomu do puvodni pozice mapy */
function resetZoom() {
  canvas.setViewportTransform([1,0,0,1,0,0])
}

/* Nastaveni aktivni otazky */