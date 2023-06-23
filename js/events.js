// 这个函数用于构造一个具有行列属性的对象,它是一个接口
function Location(row, col) {
    this.row = row
    this.col = col
}

function moveTo(piece, location) {
    // console.log(`正常情况下,steps.length=${steps.length},round=${round}`);
    if (steps.length != 2 * round && steps.length != 2 * round + 1) {
        console.log("----------------------------");
        console.log(`清除数据,${piece.side},清除数据之前,steps.length=${steps.length},round=${round}`);
        // 清除掉所有本回合之后的数据
        const length = steps.length
        for (let i = 0; i < length - 2 * round; i++) {
            steps.pop()
        }
        console.log(`数据清除完毕之后,steps.length=${steps.length},round=${round}`);
        console.log("-----------------------------");
    }
    const destRow = location.row
    const destCol = location.col
    // 清理临时可走点
    for (let i = 0; i < availables.length; i++) {
        board.removeChild(availables[i])
    }
    availables = []
    // 更新分数
    if (piece.side) {
        score -= scoreTable[piece.innerText][piece.row][piece.col]
        score += scoreTable[piece.innerText][destRow][destCol]
    } else {
        score += scoreTable[piece.innerText][9 - piece.row][8 - piece.col]
        score -= scoreTable[piece.innerText][9 - destRow][8 - destCol]
    }
    // 删除棋盘数组相关元素
    pieces[piece.row][piece.col] = null
    // 用一个临时变量保存这一步,注意必须在row和col属性变化之前,不然悔棋时找不到之前从哪里过来的
    const step = {
        target: piece,
        origin: {
            row: piece.row,
            col: piece.col
        },
        dest: location
    }
    // 正式移动棋子
    piece.row = destRow
    piece.col = destCol
    // 在棋盘上画出移动结果
    piece.style.left = 60 * destCol - 24 + "px"
    piece.style.top = 60 * destRow - 24 + "px"
    // 判定有没有吃子
    const enemy = pieces[piece.row][piece.col]
    step.enemy = enemy
    if (enemy) {
        board.removeChild(enemy)
        enemy.isAlive = false
        if (enemy.side) {
            score -= scoreTable[enemy.innerText][destRow][destCol]
        } else {
            score += scoreTable[enemy.innerText][9 - destRow][8 - destCol]
        }
    }
    // 更新棋盘数组信息
    pieces[piece.row][piece.col] = piece
    // 保存到棋谱(注意现在还不需要更新回合数,等到黑方走完了才更新)
    steps.push(step)
    // 转让走子权
    currentSide = !currentSide
    // 现在如果是黑方走子,那就需要调用AI算法了
    if (!currentSide) {
        // 黑方走子代码
        setTimeout(computerMove, 100)
    }
}

function addAvailable(location) {
    // console.log(`添加一个可走位置:${location.row},${location.col}`);
    const available = document.createElement("div")
    available.className = "available"
    available.style.top = 60 * location.row - 5 + "px"
    available.style.left = 60 * location.col - 5 + "px"
    available.row = location.row
    available.col = location.col
    availables.push(available)
    // 添加到棋盘上
    board.appendChild(available)
    // 事件监听
    available.addEventListener("click", function (event) {
        moveTo(currentPiece, this)
    })
}

function selected() {
    // console.log(`currentSide=${currentSide},currentPiece=`);
    // console.log(currentPiece);
    if (currentSide && currentPiece != this) {
        // console.log("成功进入了摸子代码");
        // 如果之前点过其他红子,那需要清理掉
        if (currentPiece) {
            for (let i = 0; i < availables.length; i++) {
                board.removeChild(availables[i])
            }
            availables = []
        }
        currentPiece = this
        // 计算可走位置,并依次设置标记
        const possibleMoves = getPossibleMoves(this)
        // console.log("即将打印possibleMoves:");
        // console.log(possibleMoves);
        // console.log("打印possibleMoves完毕");
        for (let i = 0; i < possibleMoves.length; i++) {
            addAvailable(possibleMoves[i])
        }
    }
}

// 悔棋的处理机制
function redo() {
    // 悔棋不调用moveTo函数,单独写一个函数
    // 现在还做不到网站式的栈结构
    // 只有红方走的时候才能悔棋
    if (currentSide) {
        // 清理临时可走点
        for (let i = 0; i < availables.length; i++) {
            board.removeChild(availables[i])
        }
        availables = []
        // 被选中的棋子也要置空
        currentPiece = null
        // 虽然只有两次,但是还是使用for循环
        for (let i = 0; i < 2; i++) {
            const lastStep = steps[2 * round - 1 - i]
            // 获取信息
            const piece = lastStep.target
            const enemy = lastStep.enemy
            const origin = lastStep.origin
            const originRow = origin.row
            const originCol = origin.col
            // 回去
            // 撤销相应的分数变化
            if (piece.side) {
                score -= scoreTable[piece.innerText][piece.row][piece.col]
                score += scoreTable[piece.innerText][originRow][originCol]
            } else {
                score += scoreTable[piece.innerText][9 - piece.row][8 - piece.col]
                score -= scoreTable[piece.innerText][9 - originRow][8 - originCol]
            }
            // 撤销棋盘数组上的这个棋子
            pieces[piece.row][piece.col] = null
            // 如果要被吃掉的棋子,也需要拿回来
            if (enemy) {
                board.appendChild(enemy)
                enemy.isAlive = true
                pieces[enemy.row][enemy.col] = enemy
                if (enemy.side) {
                    score += scoreTable[enemy.innerText][piece.row][piece.col]
                } else {
                    score -= scoreTable[enemy.innerText][9 - piece.row][8 - piece.col]
                }
            }
            // 移动回去
            piece.row = originRow
            piece.col = originCol
            // 原来的位置上要有这个棋子
            pieces[piece.row][piece.col] = piece
            // 在棋盘上画出悔棋结果
            piece.style.left = 60 * originCol - 24 + "px"
            piece.style.top = 60 * originRow - 24 + "px"
        }
        // 回合数-1
        round--
    }
}

// 给悔棋按钮添加事件监听
const divRedo = document.querySelector(".redo")
divRedo.addEventListener("click", redo)

// 悔棋"悔多了"的处理机制
// 虽然有很多代码与moveTo函数雷同,但是仍然单独写作一个函数
function next() {
    // 清理临时可走点
    for (let i = 0; i < availables.length; i++) {
        board.removeChild(availables[i])
    }
    availables = []
    for (let i = 0; i < 2; i++) {
        const nextStep = steps[2 * round + i]
        // 获取信息
        const piece = nextStep.target
        const enemy = nextStep.enemy
        const dest = nextStep.dest
        const destRow = dest.row
        const destCol = dest.col
        // 更新分数
        if (piece.side) {
            score -= scoreTable[piece.innerText][piece.row][piece.col]
            score += scoreTable[piece.innerText][destRow][destCol]
        } else {
            score += scoreTable[piece.innerText][9 - piece.row][8 - piece.col]
            score -= scoreTable[piece.innerText][9 - destRow][8 - destCol]
        }
        // 删除棋盘数组相关元素
        pieces[piece.row][piece.col] = null
        // 正式移动棋子
        piece.row = destRow
        piece.col = destCol
        // 在棋盘上画出移动结果
        piece.style.left = 60 * destCol - 24 + "px"
        piece.style.top = 60 * destRow - 24 + "px"
        if (enemy) {
            board.removeChild(enemy)
            enemy.isAlive = false
            if (enemy.side) {
                score -= scoreTable[enemy.innerText][destRow][destCol]
            } else {
                score += scoreTable[enemy.innerText][9 - destRow][8 - destCol]
            }
        }
        // 更新棋盘数组信息
        pieces[piece.row][piece.col] = piece
    }
    // 回合数+1
    round++
}

// 添加事件监听
const divNext = document.querySelector(".next")
divNext.addEventListener("click", next)