function toggleElement(elemId) {
  let elem = document.querySelector(`#${elemId}`)
  if (elem.style.display === "none") {
    elem.style.display = "block"
  } else {
    elem.style.display = "none"
  }
}

export { toggleElement }