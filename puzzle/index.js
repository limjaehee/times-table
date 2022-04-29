const YLEN = 3, // y축
    XLEN = 3, // x축
    BLANK = 0,
    boardEl = document.querySelector("#puzzleTable"),
    buttonEl = document.querySelector(".button");

let board = [],
    blank = YLEN * XLEN - 1;

//퍼즐 Array 생성
function initPuzzle() {
    board = [];
    blank = YLEN * XLEN - 1;
    for (let y = 0; y < YLEN; y++) {
        board[y] = [];
        for (let x = 0; x < XLEN; x++) {
            let idx = y * XLEN + x;
            if (idx < blank) board[y][x] = idx + 1;
            else board[y][x] = BLANK;
        }
    }

    //이동방향
    var moves = ["r", "l", "d", "u"];
    for (let z = 0; z < 500; z++) {
        move(moves[parseInt(Math.random() * 4, 10)], false);
    }

    updateBoard();
}

//Node에 Array심기
function updateBoard() {
    //자식 노드 찾기
    while (boardEl.hasChildNodes()) {
        //자식 노드 모두 지우기
        boardEl.removeChild(boardEl.firstChild);
    }

    let html = "";
    for (let y = 0; y < YLEN; y++) {
        html += "<tr>";
        for (let x = 0; x < XLEN; x++) {
            if (board[y][x] !== BLANK)
                html += '<td class="puzzle-item">' + board[y][x] + "</td>";
            else html += '<td class="puzzle-item blank">&nbsp;</td>';
        }

        html += "</tr>";
    }

    boardEl.innerHTML = html;
}

function moveTo(to) {
    board[parseInt(blank / YLEN, 10)][blank % XLEN] =
        board[parseInt(to / YLEN, 10)][to % XLEN];
    board[parseInt(to / YLEN, 10)][to % XLEN] = BLANK;
    blank = to;
    updateBoard();
}

function move(d, human) {
    switch (d) {
        case "r":
            if (blank % XLEN > 0) moveTo(blank - 1);
            break;
        case "l":
            if (blank % XLEN < XLEN - 1) moveTo(blank + 1);
            break;
        case "d":
            if (parseInt(blank / YLEN, 10) > 0) moveTo(blank - XLEN);
            break;
        case "u":
            if (parseInt(blank / YLEN, 10) < YLEN - 1) moveTo(blank + XLEN);
            break;
    }
}

initPuzzle();

//새로 시작하기 버튼
buttonEl.addEventListener("click", initPuzzle);

window.onkeydown = (e) => {
    switch (e.which) {
        case 37:
            move("l", true);
            break;
        case 38:
            move("u", true);
            break;
        case 39:
            move("r", true);
            break;
        case 40:
            move("d", true);
            break;
    }
};

function keyDownEvt(e) {
    console.log(e);
}
