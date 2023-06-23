// 定义计算可走位的工具函数结束
function createPiece(side, arms, row, col) {
    const piece = document.createElement("div")
    piece.row = row
    piece.col = col
    piece.side = side
    piece.className = "piece"
    // 设置相关资料
    piece.style.left = 60 * col - 24 + "px"
    piece.style.top = 60 * row - 24 + "px"
    piece.innerText = arms
    piece.isAlive = true
    // 放到棋盘上
    board.appendChild(piece)
    // 放到数组里面
    pieces[row][col] = piece
    // 添加事件监听(selected方法之后再补上,由于是动态语言.不再使用selectedForMove这个标识符了)
    if (side) {
        // 写死,因为是人机,所以只有红方会绑定事件
        piece.style.color = "red"
        piece.addEventListener("click", selected)
        redPieces.push(piece)
    } else {
        piece.style.color = "black"
        blackPieces.push(piece)
    }
    return piece
}

// 把双方32个棋子全部放进去
// 所有棋子保存下来,以空间换时间
// 红子
const redLeftRook = createPiece(true, "车", 9, 0)
const redLeftKnight = createPiece(true, "马", 9, 1)
createPiece(true, "相", 9, 2)
createPiece(true, "仕", 9, 3)
const redKing = createPiece(true, "帅", 9, 4)
createPiece(true, "仕", 9, 5)
createPiece(true, "相", 9, 6)
const redRightKnight = createPiece(true, "马", 9, 7)
const redRightRook = createPiece(true, "车", 9, 8)
createPiece(true, "兵", 6, 0)
createPiece(true, "兵", 6, 2)
createPiece(true, "兵", 6, 4)
createPiece(true, "兵", 6, 6)
createPiece(true, "兵", 6, 8)
const redLeftCannon = createPiece(true, "炮", 7, 1)
const redRightCannon = createPiece(true, "炮", 7, 7)
// 黑子
const blackLeftRook = createPiece(false, "车", 0, 0)
const blackLeftKnight = createPiece(false, "马", 0, 1)
createPiece(false, "象", 0, 2)
createPiece(false, "士", 0, 3)
const blackKing = createPiece(false, "将", 0, 4)
createPiece(false, "士", 0, 5)
createPiece(false, "象", 0, 6)
const blackRightKnight = createPiece(false, "马", 0, 7)
const blackRightRook = createPiece(false, "车", 0, 8)
createPiece(false, "卒", 3, 0)
createPiece(false, "卒", 3, 2)
createPiece(false, "卒", 3, 4)
createPiece(false, "卒", 3, 6)
createPiece(false, "卒", 3, 8)
const blackLeftCannon = createPiece(false, "炮", 2, 1)
const blackRightCannon = createPiece(false, "炮", 2, 7)

// 调试用:
// blackPawns = [createPiece(false, "卒", 3, 0)]