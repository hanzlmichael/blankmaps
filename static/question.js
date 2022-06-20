/* přidání nové otázky */
export function addQuestion() {
  let parent = document.querySelector('.questions')
  let count = document.querySelectorAll('.q-wrap').length
  let child = `<div class="q-wrap">
  <div class="question">${count+1}</div>
  <span class="question-remove">&#10006;</span>
 </div>`
  parent.insertAdjacentHTML('beforeend', child)  
  document.querySelector('.q-wrap:last-of-type').click() 
}

/* Prirazeni akci ke konkretni udalosti */
export function manageQuestion(e) {
  if (e.target.matches('.question-remove')) {
    deleteQuestion(e)
  }
  if (e.target.matches('.q-wrap')) {
    setActiveQuestion(e)
  }
}

/* Smazání otázky */
function deleteQuestion(e) {
  e.target.parentNode.remove()
  updateQuestionNumbers()
  let existActive = document.querySelector('.q-wrap-active') ? true : false
  if (!existActive) {
    let setActive = document.querySelector('.questions .q-wrap:last-child')
    if (setActive) setActive.classList.add('q-wrap-active')
  }  
}

/* Aktualizace čísel otázek po smazání */
function updateQuestionNumbers() {
  let num = 1
  let question = document.querySelectorAll('.q-wrap')  
  question.forEach(el => el.children[0].innerHTML = num++)
}

/* Nastavení aktivní otázky */
function setActiveQuestion(e) {
  if (document.querySelector('.q-wrap-active')) {
    document.querySelector('.q-wrap-active').classList.remove('q-wrap-active')
  }
  e.target.classList.add('q-wrap-active')
}

