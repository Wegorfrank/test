const __level__ = +prompt("输入你希望AI可以计算的步数")

const infinity = 100000000

function computerMove() {
    // const start = +new Date()
    const bestMove = getBestMove()
    currentPiece = bestMove.target
    moveTo(currentPiece, bestMove.dest)
    // 当前选中的棋子置空
    currentPiece = null
    // const end = +new Date()
    // console.log(`在差额记分法中,电脑计算走法耗时为${end - start}`);
    // 电脑走完了之后就应该更新一下回合数了
    round++
}

function getBestMove() {
    // 真正的难点开始了
    const bestMove = {}
    const final = getMinScore(__level__, -infinity, bestMove)
    if (final === infinity) {
        alert("恭喜,你即将获胜,此后AI将不再计算走法");
    } else if (final === -infinity) {
        alert("你即将失败,此后AI将不再计算走法")
    }
    return bestMove
}

// 定义一下最大最小算法的相关函数
// 最大值
function getMaxScore(level, curMinScore, step = {}) {
    let max
    if (level) {
        max = -infinity
        for (let i = 0; i < redPieces.length; i++) {
            const piece = redPieces[i]
            if (piece.isAlive) {
                const prevRow = piece.row
                const prevCol = piece.col
                const possibleMoves = getPossibleMoves(piece)
                for (let j = 0; j < possibleMoves.length; j++) {
                    const location = possibleMoves[j]
                    const destRow = location.row
                    const destCol = location.col
                    piece.row = destRow
                    piece.col = destCol
                    pieces[prevRow][prevCol] = null
                    const enemy = pieces[destRow][destCol]
                    if (enemy) {
                        enemy.isAlive = false
                        score += scoreTable[enemy.innerText][9 - destRow][8 - destCol]
                    }
                    score -= scoreTable[piece.innerText][prevRow][prevCol]
                    score += scoreTable[piece.innerText][destRow][destCol]
                    pieces[destRow][destCol] = piece
                    try {
                        // 记分
                        const score = getMinScore(level - 1, max)
                        if (score >= curMinScore) {
                            return curMinScore
                        }
                        if (score > max) {
                            // 更新最大值信息
                            max = score
                            step.target = piece
                            step.dest = location
                        }
                    }
                    finally {
                        // 恢复原状
                        piece.row = prevRow
                        piece.col = prevCol
                        pieces[prevRow][prevCol] = piece
                        pieces[destRow][destCol] = enemy
                        if (enemy) {
                            enemy.isAlive = true
                            score -= scoreTable[enemy.innerText][9 - destRow][8 - destCol]
                        }
                        score += scoreTable[piece.innerText][prevRow][prevCol]
                        score -= scoreTable[piece.innerText][destRow][destCol]
                    }
                }
            }
        }
    } else {
        max = score
    }
    return max
}

// 最小值
function getMinScore(level, curMaxScore, step = {}) {
    let min
    if (level) {
        min = infinity
        for (let i = 0; i < blackPieces.length; i++) {
            const piece = blackPieces[i]
            if (piece.isAlive) {
                const prevRow = piece.row
                const prevCol = piece.col
                const possibleMoves = getPossibleMoves(piece)
                for (let j = 0; j < possibleMoves.length; j++) {
                    const location = possibleMoves[j]
                    const destRow = location.row
                    const destCol = location.col
                    piece.row = destRow
                    piece.col = destCol
                    pieces[prevRow][prevCol] = null
                    const enemy = pieces[destRow][destCol]
                    if (enemy) {
                        enemy.isAlive = false
                        score -= scoreTable[enemy.innerText][destRow][destCol]
                    }
                    score += scoreTable[piece.innerText][9 - prevRow][8 - prevCol]
                    score -= scoreTable[piece.innerText][9 - destRow][8 - destCol]
                    pieces[destRow][destCol] = piece
                    try {
                        // 记分
                        const score = getMaxScore(level - 1, min)
                        if (score <= curMaxScore) {
                            return curMaxScore
                        }
                        if (score < min) {
                            // 更新最小值信息
                            min = score
                            step.target = piece
                            step.dest = location
                        }
                    }
                    finally {
                        // 恢复原状
                        piece.row = prevRow
                        piece.col = prevCol
                        pieces[prevRow][prevCol] = piece
                        pieces[destRow][destCol] = enemy
                        if (enemy) {
                            enemy.isAlive = true
                            score += scoreTable[enemy.innerText][destRow][destCol]
                        }
                        score -= scoreTable[piece.innerText][9 - prevRow][8 - prevCol]
                        score += scoreTable[piece.innerText][9 - destRow][8 - destCol]
                    }
                }
            }
        }
    } else {
        min = score
    }
    return min
}

// 使用差值法计算局面分,提高效率
let score = 0