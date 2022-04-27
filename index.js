//구구단 출력
function getTable() {
    const main = document.querySelector(".main");
    for (let i = 1; i < 10; i++) {
        let div = document.createElement("div");
        main.append(div);
        let h5 = document.createElement("h5");
        h5.innerText = i + "단";
        div.append(h5);
        let ul = document.createElement("ul");
        div.append(ul);
        for (let a = 1; a < 10; a++) {
            let li = document.createElement("li");
            li.innerText = `${i} * ${a} = ${i * a}`;
            ul.append(li);
        }
    }
}
getTable();

//prompt 함수를 이용하여 구구단 출력하기
function postTable() {
    let inputString = prompt("구구단을 입력하세요.");
    let table = [];
    if (!isNaN(Number(inputString)) && inputString !== "") {
        for (var i = 1; i < 10; i++) {
            table.push(inputString + "*" + i + "=" + inputString * i + "\n");
        }
        alert(table);
    } else {
        alert("숫자를 입력해주세요.");
    }
}
const button = document.querySelector(".button");
button.addEventListener("click", postTable);
