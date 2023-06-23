const board = document.querySelector(".board")
for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 8; col++) {
        const div = document.createElement("div")
        div.className = "cell"
        div.style.left = 60 * col + "px"
        div.style.top = 60 * row + "px"
        board.appendChild(div)
    }
}
// 处理楚河汉界的问题
// 最左边的元素
const divLeft = document.createElement("div")
divLeft.className = "river"
divLeft.style.left = "0px"
divLeft.style.borderLeft = "1px solid #000"
board.appendChild(divLeft)
// 最右边的元素
const divRight = document.createElement("div")
divRight.className = "river"
divRight.style.left = "420px"
divRight.style.borderRight = "1px solid #000"
board.appendChild(divRight)
// 中间的界河
for (let col = 1; col < 7; col++) {
    const div = document.createElement("div")
    div.className = "river"
    div.style.left = 60 * col + "px"
    board.appendChild(div)
}
board.appendChild(divLeft)
for (let row = 5; row < 9; row++) {
    for (let col = 0; col < 8; col++) {
        const div = document.createElement("div")
        div.className = "cell"
        div.style.left = 60 * col + "px"
        div.style.top = 60 * row + "px"
        board.appendChild(div)
    }
}