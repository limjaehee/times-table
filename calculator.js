const buttonBox = document.querySelector(".calculator-btn-box");
const result = document.querySelector(".calculator-result");
const errorMessage = document.querySelector(".error-message");
let numberClicked = null;

//eval 대신 계산
function looseJsonParse(obj) {
    return Function('"use strict";return (' + obj + ")")();
}

//에러메시지
function error(text) {
    errorMessage.innerText = text;
    errorMessage.style.display = "block";

    setTimeout(() => {
        errorMessage.style.display = "none";
    }, 1500);
}

function calculator(e) {
    const data = e.target.dataset.set;

    if (!data) {
        return;
    }

    if (data === "ac") {
        //값 비움
        result.value = null;
        numberClicked = false;
    } else if (data === "enter") {
        //값이 없을 때
        if (!result.value || !numberClicked) {
            error("완성되지 않은 수식입니다.");
            return;
        }

        //계산
        result.value = looseJsonParse(result.value);
        numberClicked = true;
    } else if (isNaN(data)) {
        //값이 없을 때
        if (!result.value) {
            return;
        }

        //수식 추가
        if (numberClicked === false) {
            const value = result.value.slice(0, -1);
            result.value = value + data;
        } else {
            result.value = result.value + data;
        }
        numberClicked = false;
    } else {
        //숫자일 때
        result.value = result.value + data;
        numberClicked = true;
    }
}

buttonBox.addEventListener("click", calculator);
