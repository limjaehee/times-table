const buttonBox = document.querySelector(".calculator-btn-box");
const result = document.querySelector(".calculator-result");

function calculator(e) {
    const data = e.target.dataset.set;

    if (!data) {
        return;
    }

    result.innerText = data;
}

buttonBox.addEventListener("click", calculator);
