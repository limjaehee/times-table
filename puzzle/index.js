const YLEN = 2, // y축
    XLEN = 2, // x축
    BLANK = 0, //빈칸 값
    boardEl = document.querySelector("#puzzleTable"),
    buttonEl = document.querySelector(".button"),
    clearMessage = document.querySelector(".clear-message");

let board = [], //보드 배열
    blank = YLEN * XLEN - 1; //빈칸위치

//퍼즐 Array 생성
function initPuzzle() {
    for (let y = 0; y < YLEN; y++) {
        board[y] = []; //y열 배열 생성

        for (let x = 0; x < XLEN; x++) {
            let idx = y * XLEN + x;
            if (idx < blank) board[y][x] = idx + 1;
            else board[y][x] = BLANK;
        }
    }

    //이동방향
    var moves = ["r", "l", "d", "u"];
    
    //랜덤으로 섞기
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
            if (board[y][x] !== BLANK) html += '<td class="puzzle-item">' + board[y][x] + "</td>";
            else html += '<td class="puzzle-item blank">&nbsp;</td>';
        }

        html += "</tr>";
    }

    boardEl.innerHTML = html;
}

function moveTo(to) {
    board[parseInt(blank / YLEN, 10)][blank % XLEN] = board[parseInt(to / YLEN, 10)][to % XLEN];
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

    if (human) isEnd();
}

initPuzzle();

//새로 시작하기 버튼
buttonEl.addEventListener("click", () => {
    reset();
    initPuzzle();
});

window.onkeydown = (e) => {
    if (!clearMessage.innerText) {
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
    }
};

//게임 종료
function isEnd() {
    for (let y = 0; y < YLEN; y++) {
        for (let x = 0; x < XLEN; x++) {
            const expect = y * XLEN + x + 1;

            if (y * XLEN + x < YLEN * XLEN - 1) {
                if (board[y][x] !== expect) return;
            }
        }

    }
    clear("Clear✨");
}

//성공 메시지
function clear(text) {
    clearMessage.innerText = text;
    clearMessage.style.display = "block";
}

//다시 시작하기
function reset() {
    board = []; //보드 배열 리셋
    blank = YLEN * XLEN - 1; //빈칸 위치 리셋
    clearMessage.innerText = null;
    clearMessage.style.display = "none";
}
