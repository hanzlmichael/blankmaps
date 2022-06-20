function loadPoints() {
  document.querySelector("#dec-point").addEventListener("click", decPoint);
  document.querySelector("#inc-point").addEventListener("click", incPoint);

  function decPoint() {
    let num = document.querySelector("#point").innerHTML;
    let temp = num;
    if (--temp == 0) return;
    document.querySelector("#point").innerHTML = --num;
  }

  function incPoint() {
    let num = document.querySelector("#point").innerHTML;
    let temp = num;
    if (temp == 10) return;
    document.querySelector("#point").innerHTML = ++num;
  }
}

export { loadPoints }