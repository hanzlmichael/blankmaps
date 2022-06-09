function dropdown() {
  document
    .querySelectorAll(".wrap")
    .forEach((el) => el.addEventListener("click", showDropdown))

  document
    .querySelectorAll(".dropdown-options > *")
    .forEach((el) => el.addEventListener("click", selectShape))

  document.addEventListener("click", removeActiveDropdown)

  function showDropdown(e) {
    if (e.target.closest(".wrap")) {
      let ancestor = e.target.closest(".wrap");
      let toChange = ancestor.nextElementSibling;
      toChange.classList.toggle("dropdown-active");
    }
  }

  function selectShape(e) {
    let parent = e.target.closest(".wrapper");
    let select = parent.children[0].children[0];
    select.innerHTML = e.target.innerHTML;
    select.setAttribute("data-value", e.target.dataset.value);
  }

  function removeActiveDropdown(e) {
    let container = document.querySelectorAll(".wrap");
    let options = document.querySelectorAll(".dropdown-options");

    for (let i = 0; i < container.length; i++) {
      if (!container[i].contains(e.target)) {
        options[i].classList.remove("dropdown-active");
      }
    }
  }

  /**
   * Vyplní údaje v komponentu dropdown
   * @param {string} dropdown Jméno třídy typu dropdownu
   * @param {string} str Hodnota data atributu
   */
  function fillDropdown(dropdown, str) {
    let shape = document.querySelector(`.${dropdown} [data-value='${str}']`);
    shape.click();
  }

  /**
   * Získá vybranou hodnotu v komponentu dropdown
   * @param {string} dropdown Jméno třídy typu dropdownu
   * @return {string} Vybranou hodnotu v komponentu dropdown
   */

  function getSelectedDropdownValue(dropdown) {
    let elem = document.querySelector(`#selected-${dropdown}`);
    return elem.dataset.value;
  }
}
