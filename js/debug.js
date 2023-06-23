/**
 * 这个文件里面的函数都是集成调试工具
 * 因为黑子没有绑定事件,不能直观看到走法正不正确,所以写了一个函数用于控制台调试
 */

function debugBlack() {
    for (let i = 0; i < blackPieces.length; i++) {
        const blackPiece = blackPieces[i]
        console.log(`黑方${blackPiece.row},${blackPiece.col}的${blackPiece.innerText}可以走的位置是:`);
        console.log(getPossibleMoves(blackPiece));
        console.log("---------------");
    }
}