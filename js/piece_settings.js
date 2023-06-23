// true表示红方,false表示黑方,暂不考虑"临时走位"的问题
let currentSide = true
let currentPiece
let availables = []
const pieces = [], blackPieces = [], redPieces = []
// 保存之前移动状况与回合数的变量
const steps = []
let round = 0
// 棋子数组初始化
for (let row = 0; row < 10; row++) {
    pieces.push([])
    for (let col = 0; col < 9; col++) {
        pieces[row].push(null)
    }
}