function getPossibleMoves(piece) {
    // 现在来完成计算可走位置的屎山代码
    const possibleMoves = []
    switch (piece.innerText) {
        case "车":
            // 向上
            for (let row = piece.row - 1; row >= 0; row--) {
                if (!(pieces[row][piece.col])) {
                    // 空位
                    const location = new Location(row, piece.col);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                } else if (pieces[row][piece.col].side === piece.side) {
                    // 我方占据的位置
                    break
                } else {
                    // 对方占据的位置
                    const location = new Location(row, piece.col);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                    break
                }
            }
            // 向下
            for (let row = piece.row + 1; row <= 9; row++) {
                if (!(pieces[row][piece.col])) {
                    // 空位
                    const location = new Location(row, piece.col);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                } else if (pieces[row][piece.col].side === piece.side) {
                    // 我方占据的位置
                    break
                } else {
                    // 对方占据的位置
                    const location = new Location(row, piece.col);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                    break
                }
            }
            // 向左
            for (let col = piece.col - 1; col >= 0; col--) {
                if (!(pieces[piece.row][col])) {
                    // 空位
                    const location = new Location(piece.row, col);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                } else if (pieces[piece.row][col].side === piece.side) {
                    // 我方占据的位置
                    break
                } else {
                    // 对方占据的位置
                    const location = new Location(piece.row, col);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                    break
                }
            }
            // 向右
            for (let col = piece.col + 1; col <= 8; col++) {
                if (!(pieces[piece.row][col])) {
                    // 空位
                    const location = new Location(piece.row, col);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                } else if (pieces[piece.row][col].side === piece.side) {
                    // 我方占据的位置
                    break
                } else {
                    // 对方占据的位置
                    const location = new Location(piece.row, col);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                    break
                }
            }
            break;
        case "马":
            // 向上
            if (piece.row >= 2 && !(pieces[piece.row - 1][piece.col])) {
                // 没有蹩脚
                if (piece.col >= 1 && (!(pieces[piece.row - 2][piece.col - 1]) || pieces[piece.row - 2][piece.col - 1].side != piece.side)) {
                    const location = new Location(piece.row - 2, piece.col - 1);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (piece.col <= 7 && (!(pieces[piece.row - 2][piece.col + 1]) || pieces[piece.row - 2][piece.col + 1].side != piece.side)) {
                    const location = new Location(piece.row - 2, piece.col + 1);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            }
            // 向下
            if (piece.row <= 7 && !(pieces[piece.row + 1][piece.col])) {
                // 没有蹩脚
                if (piece.col >= 1 && (!(pieces[piece.row + 2][piece.col - 1]) || pieces[piece.row + 2][piece.col - 1].side != piece.side)) {
                    const location = new Location(piece.row + 2, piece.col - 1);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (piece.col <= 7 && (!(pieces[piece.row + 2][piece.col + 1]) || pieces[piece.row + 2][piece.col + 1].side != piece.side)) {
                    const location = new Location(piece.row + 2, piece.col + 1);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            }
            // 向左
            if (piece.col >= 2 && !(pieces[piece.row][piece.col - 1])) {
                // 没有蹩脚
                if (piece.row >= 1 && (!(pieces[piece.row - 1][piece.col - 2]) || pieces[piece.row - 1][piece.col - 2].side != piece.side)) {
                    const location = new Location(piece.row - 1, piece.col - 2);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (piece.row <= 8 && (!(pieces[piece.row + 1][piece.col - 2]) || pieces[piece.row + 1][piece.col - 2].side != piece.side)) {
                    const location = new Location(piece.row + 1, piece.col - 2);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            }
            // 向右
            if (piece.col <= 6 && !(pieces[piece.row][piece.col + 1])) {
                // 没有蹩脚
                if (piece.row >= 1 && (!(pieces[piece.row - 1][piece.col + 2]) || pieces[piece.row - 1][piece.col + 2].side != piece.side)) {
                    const location = new Location(piece.row - 1, piece.col + 2);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (piece.row <= 8 && (!(pieces[piece.row + 1][piece.col + 2]) || pieces[piece.row + 1][piece.col + 2].side != piece.side)) {
                    const location = new Location(piece.row + 1, piece.col + 2);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            }
            break
        case "炮":
            // 定义一个变量表示有没有"翻山"
            let over = false
            // 向上
            for (let row = piece.row - 1; row >= 0; row--) {
                if (over) {
                    // 出于统一性考虑,不修改if-else代码结构
                    if (!(pieces[row][piece.col])) {
                        // 空位
                    } else if (pieces[row][piece.col].side === piece.side) {
                        // 我方占据的位置
                        break
                    } else {
                        // 对方占据的位置
                        const location = new Location(row, piece.col);
                        if (!sendKing(piece, location)) {
                            possibleMoves.push(location);
                        }
                        break
                    }
                } else {
                    if (pieces[row][piece.col]) {
                        // 有障碍物!
                        over = true
                    } else {
                        // 空位
                        const location = new Location(row, piece.col);
                        if (!sendKing(piece, location)) {
                            possibleMoves.push(location);
                        }
                    }
                }
            }
            over = false
            // 向下
            for (let row = piece.row + 1; row <= 9; row++) {
                if (over) {
                    // 出于统一性考虑,不修改if-else代码结构
                    if (!(pieces[row][piece.col])) {
                        // 空位
                    } else if (pieces[row][piece.col].side === piece.side) {
                        // 我方占据的位置
                        break
                    } else {
                        // 对方占据的位置
                        const location = new Location(row, piece.col);
                        if (!sendKing(piece, location)) {
                            possibleMoves.push(location);
                        }
                        break
                    }

                } else {
                    if (pieces[row][piece.col]) {
                        // 有障碍物!
                        over = true
                    } else {
                        // 空位
                        const location = new Location(row, piece.col);
                        if (!sendKing(piece, location)) {
                            possibleMoves.push(location);
                        }
                    }
                }
            }
            over = false
            // 向左
            for (let col = piece.col - 1; col >= 0; col--) {
                if (over) {
                    // 出于统一性考虑,不修改if-else代码结构
                    if (!(pieces[piece.row][col])) {
                        // 空位
                    } else if (pieces[piece.row][col].side === piece.side) {
                        // 我方占据的位置
                        break
                    } else {
                        // 对方占据的位置
                        const location = new Location(piece.row, col);
                        if (!sendKing(piece, location)) {
                            possibleMoves.push(location);
                        }
                        break
                    }

                } else {
                    if (pieces[piece.row][col]) {
                        // 有障碍物!
                        over = true
                    } else {
                        // 空位
                        const location = new Location(piece.row, col);
                        if (!sendKing(piece, location)) {
                            possibleMoves.push(location);
                        }
                    }
                }
            }
            over = false
            // 向右
            for (let col = piece.col + 1; col <= 8; col++) {
                if (over) {
                    // 出于统一性考虑,不修改if-else代码结构
                    if (!(pieces[piece.row][col])) {
                        // 空位
                    } else if (pieces[piece.row][col].side === piece.side) {
                        // 我方占据的位置
                        break
                    } else {
                        // 对方占据的位置
                        const location = new Location(piece.row, col);
                        if (!sendKing(piece, location)) {
                            possibleMoves.push(location);
                        }
                        break
                    }

                } else {
                    if (pieces[piece.row][col]) {
                        // 有障碍物!
                        over = true
                    } else {
                        // 空位
                        const location = new Location(piece.row, col);
                        if (!sendKing(piece, location)) {
                            possibleMoves.push(location);
                        }
                    }
                }
            }
            break
        case "兵":
            if (piece.row <= 4) {
                // 已经过河了
                if (piece.col >= 1 && (!(pieces[piece.row][piece.col - 1]) || !(pieces[piece.row][piece.col - 1].side))) {
                    // 向左
                    const location = new Location(piece.row, piece.col - 1);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (piece.col <= 7 && (!(pieces[piece.row][piece.col + 1]) || !(pieces[piece.row][piece.col + 1].side))) {
                    // 向右
                    const location = new Location(piece.row, piece.col + 1);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (piece.row >= 1 && (!(pieces[piece.row - 1][piece.col]) || !(pieces[piece.row - 1][piece.col].side))) {
                    // 前进
                    const location = new Location(piece.row - 1, piece.col);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else {
                // 还没有过河
                if (piece.row >= 1 && (!(pieces[piece.row - 1][piece.col]) || !(pieces[piece.row - 1][piece.col].side))) {
                    // 前进
                    const location = new Location(piece.row - 1, piece.col);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            }
            break
        case "卒":
            if (piece.row >= 5) {
                // 已经过河了
                if (piece.col >= 1 && (!(pieces[piece.row][piece.col - 1]) || (pieces[piece.row][piece.col - 1].side))) {
                    // 向左
                    const location = new Location(piece.row, piece.col - 1);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (piece.col <= 7 && (!(pieces[piece.row][piece.col + 1]) || (pieces[piece.row][piece.col + 1].side))) {
                    // 向右
                    const location = new Location(piece.row, piece.col + 1);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (piece.row <= 8 && (!(pieces[piece.row + 1][piece.col]) || (pieces[piece.row + 1][piece.col].side))) {
                    // 前进
                    const location = new Location(piece.row + 1, piece.col);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else {
                // 还没有过河
                if (piece.row <= 8 && (!(pieces[piece.row + 1][piece.col]) || (pieces[piece.row + 1][piece.col].side))) {
                    // 前进
                    const location = new Location(piece.row + 1, piece.col);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            }
            break
        case "相":
            // 穷举法
            if (piece.row === 9 && piece.col === 2) {
                // 左相
                if (!(pieces[8][1]) && (!(pieces[7][0]) || !(pieces[7][0].side))) {
                    // 相七进九
                    const location = new Location(7, 0);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[8][3]) && (!(pieces[7][4]) || !(pieces[7][4].side))) {
                    // 相七进五
                    const location = new Location(7, 4);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else if (piece.row === 9 && piece.col === 6) {
                // 右相
                if (!(pieces[8][7]) && (!(pieces[7][8]) || !(pieces[7][8].side))) {
                    // 相三进一
                    const location = new Location(7, 8);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[8][5]) && (!(pieces[7][4]) || !(pieces[7][4].side))) {
                    // 相三进五
                    const location = new Location(7, 4);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else if (piece.row === 7 && piece.col === 4) {
                // 中相
                if (!(pieces[6][3]) && (!(pieces[5][2]) || !(pieces[5][2].side))) {
                    // 相五进七
                    const location = new Location(5, 2);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[6][5]) && (!(pieces[5][6]) || !(pieces[5][6].side))) {
                    // 相五进三
                    const location = new Location(5, 6);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[8][3]) && (!(pieces[9][2]) || !(pieces[9][2].side))) {
                    // 相五退七
                    const location = new Location(9, 2);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[8][5]) && (!(pieces[9][6]) || !(pieces[9][6].side))) {
                    // 相五退三
                    const location = new Location(9, 6);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else if (piece.row === 5 && piece.col === 2) {
                // 左高相
                if (!(pieces[6][1]) && (!(pieces[7][0]) || !(pieces[7][0].side))) {
                    // 相七退九
                    const location = new Location(7, 0);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[6][3]) && (!(pieces[7][4]) || !(pieces[7][4].side))) {
                    // 相七退五
                    const location = new Location(7, 4);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else if (piece.row === 5 && piece.col === 6) {
                // 右高相
                if (!(pieces[6][7]) && (!(pieces[7][8]) || !(pieces[7][8].side))) {
                    // 象相退一
                    const location = new Location(7, 8);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[6][5]) && (!(pieces[7][4]) || !(pieces[7][4].side))) {
                    // 相三退五
                    const location = new Location(7, 4);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else if (piece.row === 7 && piece.col === 0) {
                // 左边相
                if (!(pieces[6][1]) && (!(pieces[5][2]) || !(pieces[5][2].side))) {
                    // 相九进七
                    const location = new Location(5, 2);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[8][1]) && (!(pieces[9][2]) || !(pieces[9][2].side))) {
                    // 相九退七
                    const location = new Location(9, 2);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else if (piece.row === 7 && piece.col === 8) {
                // 右边相
                if (!(pieces[6][7]) && (!(pieces[5][6]) || !(pieces[5][6].side))) {
                    // 相一进三
                    const location = new Location(5, 6);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[8][7]) && (!(pieces[9][6]) || !(pieces[9][6].side))) {
                    // 相一退三
                    const location = new Location(9, 6);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            }
            break
        case "象":
            // 穷举法
            if (piece.row === 0 && piece.col === 2) {
                // 左象
                if (!(pieces[1][1]) && (!(pieces[2][0]) || (pieces[2][0].side))) {
                    // 象3进1
                    const location = new Location(2, 0);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[1][3]) && (!(pieces[2][4]) || (pieces[2][4].side))) {
                    // 象3进5
                    const location = new Location(2, 4);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else if (piece.row === 0 && piece.col === 6) {
                // 右象
                if (!(pieces[1][7]) && (!(pieces[2][8]) || (pieces[2][8].side))) {
                    // 象7进9
                    const location = new Location(2, 8);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[1][5]) && (!(pieces[2][4]) || (pieces[2][4].side))) {
                    // 象7进5
                    const location = new Location(2, 4);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else if (piece.row === 2 && piece.col === 4) {
                // 中象
                if (!(pieces[3][3]) && (!(pieces[4][2]) || (pieces[4][2].side))) {
                    // 象5进3
                    const location = new Location(4, 2);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[3][5]) && (!(pieces[4][6]) || (pieces[4][6].side))) {
                    // 象5进7
                    const location = new Location(4, 6);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[1][3]) && (!(pieces[0][2]) || (pieces[0][2].side))) {
                    // 象5退3
                    const location = new Location(0, 2);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[1][5]) && (!(pieces[0][6]) || (pieces[0][6].side))) {
                    // 象5退7
                    const location = new Location(0, 6);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else if (piece.row === 4 && piece.col === 2) {
                // 左高象
                if (!(pieces[3][1]) && (!(pieces[2][0]) || (pieces[2][0].side))) {
                    // 象3退1
                    const location = new Location(2, 0);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[3][3]) && (!(pieces[2][4]) || (pieces[2][4].side))) {
                    // 象3退5
                    const location = new Location(2, 4);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else if (piece.row === 4 && piece.col === 6) {
                // 右高象
                if (!(pieces[3][7]) && (!(pieces[2][8]) || (pieces[2][8].side))) {
                    // 象7退9
                    const location = new Location(2, 8);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[3][5]) && (!(pieces[2][4]) || (pieces[2][4].side))) {
                    // 象7退5
                    const location = new Location(2, 4);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else if (piece.row === 2 && piece.col === 0) {
                // 左边象
                if (!(pieces[3][1]) && (!(pieces[4][2]) || (pieces[4][2].side))) {
                    // 象1进3
                    const location = new Location(4, 2);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[1][1]) && (!(pieces[0][2]) || (pieces[0][2].side))) {
                    // 象1退3
                    const location = new Location(0, 2);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else if (piece.row === 2 && piece.col === 8) {
                // 右边象
                if (!(pieces[3][7]) && (!(pieces[4][6]) || (pieces[4][6].side))) {
                    // 象9进7
                    const location = new Location(4, 6);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[1][7]) && (!(pieces[0][6]) || (pieces[0][6].side))) {
                    // 象9退7
                    const location = new Location(0, 6);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else {
                throw Error("象的走法出现了未定义的情形")
            }
            break
        case "仕":
            if ((piece.row === 9 || piece.row === 7) && (piece.col === 3 || piece.col === 5)) {
                if (!(pieces[8][4]) || !(pieces[8][4].side)) {
                    const location = new Location(8, 4);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else if (piece.row === 8 && piece.col === 4) {
                if (!(pieces[9][3]) || !(pieces[9][3].side)) {
                    const location = new Location(9, 3);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[9][5]) || !(pieces[9][5].side)) {
                    const location = new Location(9, 5);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[7][3]) || !(pieces[7][3].side)) {
                    const location = new Location(7, 3);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[7][5]) || !(pieces[7][5].side)) {
                    const location = new Location(7, 5);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else {
                throw new Error("仕的走法出现了未定义的情形")
            }
            break
        case "士":
            if ((piece.row === 0 || piece.row === 2) && (piece.col === 3 || piece.col === 5)) {
                if (!(pieces[1][4]) || (pieces[1][4].side)) {
                    const location = new Location(1, 4);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else if (piece.row === 1 && piece.col === 4) {
                if (!(pieces[0][3]) || (pieces[0][3].side)) {
                    const location = new Location(0, 3);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[0][5]) || (pieces[0][5].side)) {
                    const location = new Location(0, 5);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[2][3]) || (pieces[2][3].side)) {
                    const location = new Location(2, 3);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[2][5]) || (pieces[2][5].side)) {
                    const location = new Location(2, 5);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else {
                throw new Error("仕的走法出现了未定义的情形")
            }
            break
        case "帅":
            // 仍然穷举
            if (piece.row === 9 && piece.col === 4) {
                if (!(pieces[9][3]) || !(pieces[9][3].side)) {
                    const location = new Location(9, 3);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[9][5]) || !(pieces[9][5].side)) {
                    const location = new Location(9, 5);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[8][4]) || !(pieces[8][4].side)) {
                    const location = new Location(8, 4);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else if (piece.row === 9 && piece.col === 3) {
                if (!(pieces[9][4]) || !(pieces[9][4].side)) {
                    const location = new Location(9, 4);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[8][3]) || !(pieces[8][3].side)) {
                    const location = new Location(8, 3);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else if (piece.row === 9 && piece.col === 5) {
                if (!(pieces[9][4]) || !(pieces[9][4].side)) {
                    const location = new Location(9, 4);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[8][5]) || !(pieces[8][5].side)) {
                    const location = new Location(8, 5);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else if (piece.row === 8 && piece.col === 4) {
                if (!(pieces[8][3]) || !(pieces[8][3].side)) {
                    const location = new Location(8, 3);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[8][5]) || !(pieces[8][5].side)) {
                    const location = new Location(8, 5);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[9][4]) || !(pieces[9][4].side)) {
                    const location = new Location(9, 4);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[7][4]) || !(pieces[7][4].side)) {
                    const location = new Location(7, 4);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else if (piece.row === 8 && piece.col === 3) {
                if (!(pieces[8][4]) || !(pieces[8][4].side)) {
                    const location = new Location(8, 4);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[7][3]) || !(pieces[7][3].side)) {
                    const location = new Location(7, 3);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[9][3]) || !(pieces[9][3].side)) {
                    const location = new Location(9, 3);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else if (piece.row === 8 && piece.col === 5) {
                if (!(pieces[8][4]) || !(pieces[8][4].side)) {
                    const location = new Location(8, 4);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[7][5]) || !(pieces[7][5].side)) {
                    const location = new Location(7, 5);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[9][5]) || !(pieces[9][5].side)) {
                    const location = new Location(9, 5);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else if (piece.row === 7 && piece.col === 4) {
                if (!(pieces[7][3]) || !(pieces[7][3].side)) {
                    const location = new Location(7, 3);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[7][5]) || !(pieces[7][5].side)) {
                    const location = new Location(7, 5);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[8][4]) || !(pieces[8][4].side)) {
                    const location = new Location(8, 4);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else if (piece.row === 7 && piece.col === 3) {
                if (!(pieces[7][4]) || !(pieces[7][4].side)) {
                    const location = new Location(7, 4);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[8][3]) || !(pieces[8][3].side)) {
                    const location = new Location(8, 3);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else if (piece.row === 7 && piece.col === 5) {
                if (!(pieces[7][4]) || !(pieces[7][4].side)) {
                    const location = new Location(7, 4);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[8][5]) || !(pieces[8][5].side)) {
                    const location = new Location(8, 5);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else {
                throw new Error("帅的走法出现了未定义的情形")
            }
            break
        case "将":
            // 仍然穷举
            if (piece.row === 0 && piece.col === 4) {
                if (!(pieces[0][3]) || (pieces[0][3].side)) {
                    const location = new Location(0, 3);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[0][5]) || (pieces[0][5].side)) {
                    const location = new Location(0, 5);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[1][4]) || (pieces[1][4].side)) {
                    const location = new Location(1, 4);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else if (piece.row === 0 && piece.col === 3) {
                if (!(pieces[0][4]) || (pieces[0][4].side)) {
                    const location = new Location(0, 4);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[1][3]) || (pieces[1][3].side)) {
                    const location = new Location(1, 3);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else if (piece.row === 0 && piece.col === 5) {
                if (!(pieces[0][4]) || (pieces[0][4].side)) {
                    const location = new Location(0, 4);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[1][5]) || (pieces[1][5].side)) {
                    const location = new Location(1, 5);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else if (piece.row === 1 && piece.col === 4) {
                if (!(pieces[1][3]) || (pieces[1][3].side)) {
                    const location = new Location(1, 3);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[1][5]) || (pieces[1][5].side)) {
                    const location = new Location(1, 5);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[0][4]) || (pieces[0][4].side)) {
                    const location = new Location(0, 4);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[2][4]) || (pieces[2][4].side)) {
                    const location = new Location(2, 4);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else if (piece.row === 1 && piece.col === 3) {
                if (!(pieces[1][4]) || (pieces[1][4].side)) {
                    const location = new Location(1, 4);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[2][3]) || (pieces[2][3].side)) {
                    const location = new Location(2, 3);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[0][3]) || (pieces[0][3].side)) {
                    const location = new Location(0, 3);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else if (piece.row === 1 && piece.col === 5) {
                if (!(pieces[1][4]) || (pieces[1][4].side)) {
                    const location = new Location(1, 4);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[2][5]) || (pieces[2][5].side)) {
                    const location = new Location(2, 5);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[0][5]) || (pieces[0][5].side)) {
                    const location = new Location(0, 5);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else if (piece.row === 2 && piece.col === 4) {
                if (!(pieces[2][3]) || (pieces[2][3].side)) {
                    const location = new Location(2, 3);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[2][5]) || (pieces[2][5].side)) {
                    const location = new Location(2, 5);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[1][4]) || (pieces[1][4].side)) {
                    const location = new Location(1, 4);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else if (piece.row === 2 && piece.col === 3) {
                if (!(pieces[2][4]) || (pieces[2][4].side)) {
                    const location = new Location(2, 4);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[1][3]) || (pieces[1][3].side)) {
                    const location = new Location(1, 3);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else if (piece.row === 2 && piece.col === 5) {
                if (!(pieces[2][4]) || (pieces[2][4].side)) {
                    const location = new Location(2, 4);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
                if (!(pieces[1][5]) || (pieces[1][5].side)) {
                    const location = new Location(1, 5);
                    if (!sendKing(piece, location)) {
                        possibleMoves.push(location);
                    }
                }
            } else {
                throw new Error("将的走法出现了未定义的情形")
            }
            break
        default:
            throw new Error("棋子兵种不正确")
            break;
    }
    return possibleMoves
}

function sendKing(piece, location) {// 第一个参数为待走的棋子,第二个参数是可能的目的地
    const destRow = location.row
    const destCol = location.col
    // 先尝试走一下
    // 保存原来位置
    const prevRow = piece.row
    const prevCol = piece.col
    // 保存一下目标位置的可能的其他棋子
    const enemy = pieces[destRow][destCol]
    if (enemy) {
        enemy.isAlive = false
    }
    // 开始移动
    pieces[prevRow][prevCol] = null
    pieces[destRow][destCol] = piece
    piece.row = destRow
    piece.col = destCol
    // 以下开始判断有没有被将军
    let kingRow, kingCol
    // 出于代码可读性以及避免过多if嵌套的需要,使用匿名函数
    let res = (function () {
        let flag = true
        if (piece.side) {
            // 记录一下红帅的位置
            kingRow = redKing.row
            kingCol = redKing.col
            // 红方判定有没有黑方将军
            // 黑车
            try {
                if (blackLeftRook.isAlive && blackLeftRook.row === kingRow) {
                    if (blackLeftRook.col > kingCol) {
                        // 黑车在帅右边
                        for (let col = kingCol + 1; col < blackLeftRook.col; col++) {
                            if (pieces[kingRow][col]) {
                                flag = false
                                break
                            }
                        }
                    } else {
                        // 黑车在帅左边
                        for (let col = kingCol - 1; col > blackLeftRook.col; col--) {
                            if (pieces[kingRow][col]) {
                                flag = false
                                break
                            }
                        }
                    }
                } else if (blackLeftRook.isAlive && blackLeftRook.col === kingCol) {
                    if (blackLeftRook.row > kingRow) {
                        for (let row = kingRow + 1; row < blackLeftRook.row; row++) {
                            if (pieces[row][kingCol]) {
                                flag = false
                                break
                            }
                        }
                    } else {
                        for (let row = kingRow - 1; row > blackLeftRook.row; row--) {
                            if (pieces[row][kingCol]) {
                                flag = false
                                break
                            }
                        }
                    }
                } else {
                    flag = false
                }
            } catch (error) {
                if (error.message === "blackLeftRook is not defined") {
                    flag = false
                } else {
                    throw error
                }
            }

            if (flag) {
                // 说明中间没有任何障碍物
                return true
            }
            flag = true
            try {
                if (blackRightRook.isAlive && blackRightRook.row === kingRow) {
                    if (blackRightRook.col > kingCol) {
                        // 黑车在帅右边
                        for (let col = kingCol + 1; col < blackRightRook.col; col++) {
                            if (pieces[kingRow][col]) {
                                flag = false
                                break
                            }
                        }
                    } else {
                        // 黑车在帅左边
                        for (let col = kingCol - 1; col > blackRightRook.col; col--) {
                            if (pieces[kingRow][col]) {
                                flag = false
                                break
                            }
                        }
                    }
                } else if (blackRightRook.isAlive && blackRightRook.col === kingCol) {
                    if (blackRightRook.row > kingRow) {
                        for (let row = kingRow + 1; row < blackRightRook.row; row++) {
                            if (pieces[row][kingCol]) {
                                flag = false
                                break
                            }
                        }
                    } else {
                        for (let row = kingRow - 1; row > blackRightRook.row; row--) {
                            if (pieces[row][kingCol]) {
                                flag = false
                                break
                            }
                        }
                    }
                } else {
                    flag = false
                }
            } catch (error) {
                if (error.message === "blackRightRook is not defined") {
                    flag = false
                } else {
                    throw error
                }
            }
            if (flag) {
                return true
            }

            try {
                const leftKnightRow = blackLeftKnight.row
                const leftKnightCol = blackLeftKnight.col
                if ((blackLeftKnight.isAlive && ((leftKnightRow - kingRow === -2 && leftKnightCol - kingCol === 1 && !(pieces[leftKnightRow + 1][leftKnightCol])) ||
                    (leftKnightRow - kingRow === -2 && leftKnightCol - kingCol === -1 && !(pieces[leftKnightRow + 1][leftKnightCol])) ||
                    (leftKnightRow - kingRow === 2 && leftKnightCol - kingCol === 1 && !(pieces[leftKnightRow - 1][leftKnightCol])) ||
                    (leftKnightRow - kingRow === 2 && leftKnightCol - kingCol === -1 && !(pieces[leftKnightRow - 1][leftKnightCol])) ||
                    (leftKnightRow - kingRow === 1 && leftKnightCol - kingCol === 2 && !(pieces[leftKnightRow][leftKnightCol - 1])) ||
                    (leftKnightRow - kingRow === -1 && leftKnightCol - kingCol === 2 && !(pieces[leftKnightRow][leftKnightCol - 1])) ||
                    (leftKnightRow - kingRow === 1 && leftKnightCol - kingCol === -2 && !(pieces[leftKnightRow][leftKnightCol + 1])) ||
                    (leftKnightRow - kingRow === -1 && leftKnightCol - kingCol === -2 && !(pieces[leftKnightRow][leftKnightCol + 1]))))
                ) {
                    return true
                }
            } catch (error) {
                // console.log(error.message);
                if (error.message != "blackLeftKnight is not defined") {
                    throw error
                }
            }
            try {
                const rightKnightRow = blackRightKnight.row
                const rightKnightCol = blackRightKnight.col
                if (blackRightKnight.isAlive && ((rightKnightRow - kingRow === -2 && rightKnightCol - kingCol === 1 && !(pieces[rightKnightRow + 1][rightKnightCol])) ||
                    (rightKnightRow - kingRow === -2 && rightKnightCol - kingCol === -1 && !(pieces[rightKnightRow + 1][rightKnightCol])) ||
                    (rightKnightRow - kingRow === 2 && rightKnightCol - kingCol === 1 && !(pieces[rightKnightRow - 1][rightKnightCol])) ||
                    (rightKnightRow - kingRow === 2 && rightKnightCol - kingCol === -1 && !(pieces[rightKnightRow - 1][rightKnightCol])) ||
                    (rightKnightRow - kingRow === 1 && rightKnightCol - kingCol === 2 && !(pieces[rightKnightRow][rightKnightCol - 1])) ||
                    (rightKnightRow - kingRow === -1 && rightKnightCol - kingCol === 2 && !(pieces[rightKnightRow][rightKnightCol - 1])) ||
                    (rightKnightRow - kingRow === 1 && rightKnightCol - kingCol === -2 && !(pieces[rightKnightRow][rightKnightCol + 1])) ||
                    (rightKnightRow - kingRow === -1 && rightKnightCol - kingCol === -2 && !(pieces[rightKnightRow][rightKnightCol + 1])))) {
                    return true
                }
            } catch (error) {
                if (error.message != "blackRightKnight is not defined") {
                    throw error
                }
            }

            // 炮
            flag = true
            try {
                if (blackLeftCannon.isAlive && blackLeftCannon.row === kingRow) {
                    let over = false
                    if (blackLeftCannon.col > kingCol) {
                        // 黑炮在帅右边
                        for (let col = kingCol + 1; col < blackLeftCannon.col; col++) {
                            if (over) {
                                if (pieces[kingRow][col]) {
                                    flag = false
                                    break
                                }
                            } else {
                                if (pieces[kingRow][col]) {
                                    over = true
                                }
                            }
                        }
                        if (!over) {
                            flag = false
                        }
                    } else {
                        // 黑炮在帅左边
                        for (let col = kingCol - 1; col > blackLeftCannon.col; col--) {
                            if (over) {
                                if (pieces[kingRow][col]) {
                                    flag = false
                                    break
                                }
                            } else {
                                if (pieces[kingRow][col]) {
                                    over = true
                                }
                            }
                        }
                        if (!over) {
                            flag = false
                        }
                    }
                } else if (blackLeftCannon.isAlive && blackLeftCannon.col === kingCol) {
                    let over = false
                    if (blackLeftCannon.row > kingRow) {
                        // 黑炮在帅下边
                        for (let row = kingRow + 1; row < blackLeftCannon.row; row++) {
                            if (over) {
                                if (pieces[row][kingCol]) {
                                    flag = false
                                    break
                                }
                            } else {
                                if (pieces[row][kingCol]) {
                                    over = true
                                }
                            }
                        }
                        if (!over) {
                            flag = false
                        }
                    } else {
                        // 黑炮在帅上边
                        for (let row = kingRow - 1; row > blackLeftCannon.row; row--) {
                            if (over) {
                                if (pieces[row][kingCol]) {
                                    flag = false
                                    break
                                }
                            } else {
                                if (pieces[row][kingCol]) {
                                    over = true
                                }
                            }
                        }
                        if (!over) {
                            flag = false
                        }
                    }
                } else {
                    // console.log("黑方左炮没有对红帅将军");
                    flag = false
                }
            } catch (error) {
                if (error.message === "blackLeftCannon is not defined") {
                    flag = false
                } else {
                    throw error
                }
            }
            if (flag) {
                return true
            }

            flag = true
            try {
                if (blackRightCannon.isAlive && blackRightCannon.row === kingRow) {
                    let over = false
                    if (blackRightCannon.col > kingCol) {
                        // 黑炮在帅右边
                        for (let col = kingCol + 1; col < blackRightCannon.col; col++) {
                            if (over) {
                                if (pieces[kingRow][col]) {
                                    flag = false
                                    break
                                }
                            } else {
                                if (pieces[kingRow][col]) {
                                    over = true
                                }
                            }
                        }
                        if (!over) {
                            flag = false
                        }
                    } else {
                        // 黑炮在帅左边
                        for (let col = kingCol - 1; col > blackRightCannon.col; col--) {
                            if (over) {
                                if (pieces[kingRow][col]) {
                                    flag = false
                                    break
                                }
                            } else {
                                if (pieces[kingRow][col]) {
                                    over = true
                                }
                            }
                        }
                        if (!over) {
                            flag = false
                        }
                    }
                } else if (blackRightCannon.isAlive && blackRightCannon.col === kingCol) {
                    let over = false
                    if (blackRightCannon.row > kingRow) {
                        // 黑炮在帅下边
                        for (let row = kingRow + 1; row < blackRightCannon.row; row++) {
                            if (over) {
                                if (pieces[row][kingCol]) {
                                    flag = false
                                    break
                                }
                            } else {
                                if (pieces[row][kingCol]) {
                                    over = true
                                }
                            }
                        }
                        if (!over) {
                            flag = false
                        }
                    } else {
                        // 黑炮在帅上边
                        for (let row = kingCol - 1; row > blackRightCannon.col; row--) {
                            if (over) {
                                if (pieces[row][kingCol]) {
                                    flag = false
                                    break
                                }
                            } else {
                                if (pieces[row][kingCol]) {
                                    over = true
                                }
                            }
                        }
                        if (!over) {
                            flag = false
                        }
                    }
                } else {
                    flag = false
                }
            } catch (error) {
                if (error.message === "blackRightCannon is not defined") {
                    flag = false
                } else {
                    throw error
                }
            }
            if (flag) {
                return true
            }
            flag = true
            // 卒
            // 因为黑卒有五个,所以遍历起来效率低下,使用直接判断法
            if ((pieces[kingRow][kingCol - 1] && pieces[kingRow][kingCol - 1].isAlive && pieces[kingRow][kingCol - 1].innerText === "卒") ||
                (pieces[kingRow][kingCol + 1] && pieces[kingRow][kingCol + 1].isAlive && pieces[kingRow][kingCol + 1].innerText === "卒") ||
                (pieces[kingRow - 1][kingCol] && pieces[kingRow - 1][kingCol].isAlive && pieces[kingRow - 1][kingCol].innerText === "卒")) {
                return true
            }
        } else {
            // 记录一下黑将的位置
            kingRow = blackKing.row
            kingCol = blackKing.col
            // 黑方判定有没有红方帅军
            // 红车
            try {
                if (redLeftRook.isAlive && redLeftRook.row === kingRow) {
                    if (redLeftRook.col > kingCol) {
                        // 红车在将右边
                        for (let col = kingCol + 1; col < redLeftRook.col; col++) {
                            if (pieces[kingRow][col]) {
                                flag = false
                                break
                            }
                        }
                    } else {
                        // 红车在将左边
                        for (let col = kingCol - 1; col > redLeftRook.col; col--) {
                            if (pieces[kingRow][col]) {
                                flag = false
                                break
                            }
                        }
                    }
                } else if (redLeftRook.isAlive && redLeftRook.col === kingCol) {
                    if (redLeftRook.row > kingRow) {
                        for (let row = kingRow + 1; row < redLeftRook.row; row++) {
                            if (pieces[row][kingCol]) {
                                flag = false
                                break
                            }
                        }
                    } else {
                        for (let row = kingRow - 1; row > redLeftRook.row; row--) {
                            if (pieces[row][kingCol]) {
                                flag = false
                                break
                            }
                        }
                    }
                } else {
                    flag = false
                }
            } catch (error) {
                if (error.message === "redLeftRook is not defined") {
                    flag = false
                } else {
                    throw error
                }
            }

            if (flag) {
                // 说明中间没有任何障碍物
                return true
            }
            flag = true
            try {
                if (redRightRook.isAlive && redRightRook.row === kingRow) {
                    if (redRightRook.col > kingCol) {
                        // 红车在将右边
                        for (let col = kingCol + 1; col < redRightRook.col; col++) {
                            if (pieces[kingRow][col]) {
                                flag = false
                                break
                            }
                        }
                    } else {
                        // 红车在将左边
                        for (let col = kingCol - 1; col > redRightRook.col; col--) {
                            if (pieces[kingRow][col]) {
                                flag = false
                                break
                            }
                        }
                    }
                } else if (redRightRook.isAlive && redRightRook.col === kingCol) {
                    if (redRightRook.row > kingRow) {
                        for (let row = kingRow + 1; row < redRightRook.row; row++) {
                            if (pieces[row][kingCol]) {
                                flag = false
                                break
                            }
                        }
                    } else {
                        for (let row = kingRow - 1; row > redRightRook.row; row--) {
                            if (pieces[row][kingCol]) {
                                flag = false
                                break
                            }
                        }
                    }
                } else {
                    flag = false
                }
            } catch (error) {
                if (error.message === "redRightRook is not defined") {
                    flag = false
                } else {
                    throw error
                }
            }
            if (flag) {
                return true
            }

            try {
                const leftKnightRow = redLeftKnight.row
                const leftKnightCol = redLeftKnight.col
                if ((redLeftKnight.isAlive && ((leftKnightRow - kingRow === -2 && leftKnightCol - kingCol === 1 && !(pieces[leftKnightRow + 1][leftKnightCol])) ||
                    (leftKnightRow - kingRow === -2 && leftKnightCol - kingCol === -1 && !(pieces[leftKnightRow + 1][leftKnightCol])) ||
                    (leftKnightRow - kingRow === 2 && leftKnightCol - kingCol === 1 && !(pieces[leftKnightRow - 1][leftKnightCol])) ||
                    (leftKnightRow - kingRow === 2 && leftKnightCol - kingCol === -1 && !(pieces[leftKnightRow - 1][leftKnightCol])) ||
                    (leftKnightRow - kingRow === 1 && leftKnightCol - kingCol === 2 && !(pieces[leftKnightRow][leftKnightCol - 1])) ||
                    (leftKnightRow - kingRow === -1 && leftKnightCol - kingCol === 2 && !(pieces[leftKnightRow][leftKnightCol - 1])) ||
                    (leftKnightRow - kingRow === 1 && leftKnightCol - kingCol === -2 && !(pieces[leftKnightRow][leftKnightCol + 1])) ||
                    (leftKnightRow - kingRow === -1 && leftKnightCol - kingCol === -2 && !(pieces[leftKnightRow][leftKnightCol + 1]))))
                ) {
                    return true
                }
            } catch (error) {
                if (error.message != "redLeftKnight is not defined") {
                    throw error
                }
            }
            try {
                const rightKnightRow = redRightKnight.row
                const rightKnightCol = redRightKnight.col
                if (redRightKnight.isAlive && ((rightKnightRow - kingRow === -2 && rightKnightCol - kingCol === 1 && !(pieces[rightKnightRow + 1][rightKnightCol])) ||
                    (rightKnightRow - kingRow === -2 && rightKnightCol - kingCol === -1 && !(pieces[rightKnightRow + 1][rightKnightCol])) ||
                    (rightKnightRow - kingRow === 2 && rightKnightCol - kingCol === 1 && !(pieces[rightKnightRow - 1][rightKnightCol])) ||
                    (rightKnightRow - kingRow === 2 && rightKnightCol - kingCol === -1 && !(pieces[rightKnightRow - 1][rightKnightCol])) ||
                    (rightKnightRow - kingRow === 1 && rightKnightCol - kingCol === 2 && !(pieces[rightKnightRow][rightKnightCol - 1])) ||
                    (rightKnightRow - kingRow === -1 && rightKnightCol - kingCol === 2 && !(pieces[rightKnightRow][rightKnightCol - 1])) ||
                    (rightKnightRow - kingRow === 1 && rightKnightCol - kingCol === -2 && !(pieces[rightKnightRow][rightKnightCol + 1])) ||
                    (rightKnightRow - kingRow === -1 && rightKnightCol - kingCol === -2 && !(pieces[rightKnightRow][rightKnightCol + 1])))) {
                    return true
                }
            } catch (error) {
                if (error.message != "redRightKnight is not defined") {
                    throw error
                }
            }

            // 炮
            flag = true
            try {
                if (redLeftCannon.isAlive && redLeftCannon.row === kingRow) {
                    let over = false
                    if (redLeftCannon.col > kingCol) {
                        // 红炮在将右边
                        for (let col = kingCol + 1; col < redLeftCannon.col; col++) {
                            if (over) {
                                if (pieces[kingRow][col]) {
                                    flag = false
                                    break
                                }
                            } else {
                                if (pieces[kingRow][col]) {
                                    over = true
                                }
                            }
                        }
                        if (!over) {
                            flag = false
                        }
                    } else {
                        // 红炮在将左边
                        for (let col = kingCol - 1; col > redLeftCannon.col; col--) {
                            if (over) {
                                if (pieces[kingRow][col]) {
                                    flag = false
                                    break
                                }
                            } else {
                                if (pieces[kingRow][col]) {
                                    over = true
                                }
                            }
                        }
                        if (!over) {
                            flag = false
                        }
                    }
                } else if (redLeftCannon.isAlive && redLeftCannon.col === kingCol) {
                    let over = false
                    if (redLeftCannon.row > kingRow) {
                        // 红炮在将下边
                        for (let row = kingRow + 1; row < redLeftCannon.row; row++) {
                            if (over) {
                                if (pieces[row][kingCol]) {
                                    flag = false
                                    break
                                }
                            } else {
                                if (pieces[row][kingCol]) {
                                    over = true
                                }
                            }
                        }
                        if (!over) {
                            flag = false
                        }
                    } else {
                        // 红炮在将上边
                        for (let row = kingRow - 1; row > redLeftCannon.row; row--) {
                            if (over) {
                                if (pieces[row][kingCol]) {
                                    flag = false
                                    break
                                }
                            } else {
                                if (pieces[row][kingCol]) {
                                    over = true
                                }
                            }
                        }
                        if (!over) {
                            flag = false
                        }
                    }
                } else {
                    // console.log("红方左炮没有对黑将帅军");
                    flag = false
                }
            } catch (error) {
                if (error.message === "redLeftCannon is not defined") {
                    flag = false
                } else {
                    throw error
                }
            }
            if (flag) {
                return true
            }

            flag = true
            try {
                if (redRightCannon.isAlive && redRightCannon.row === kingRow) {
                    let over = false
                    if (redRightCannon.col > kingCol) {
                        // 红炮在将右边
                        for (let col = kingCol + 1; col < redRightCannon.col; col++) {
                            if (over) {
                                if (pieces[kingRow][col]) {
                                    flag = false
                                    break
                                }
                            } else {
                                if (pieces[kingRow][col]) {
                                    over = true
                                }
                            }
                        }
                        if (!over) {
                            flag = false
                        }
                    } else {
                        // 红炮在将左边
                        for (let col = kingCol - 1; col > redRightCannon.col; col--) {
                            if (over) {
                                if (pieces[kingRow][col]) {
                                    flag = false
                                    break
                                }
                            } else {
                                if (pieces[kingRow][col]) {
                                    over = true
                                }
                            }
                        }
                        if (!over) {
                            flag = false
                        }
                    }
                } else if (redRightCannon.isAlive && redRightCannon.col === kingCol) {
                    let over = false
                    if (redRightCannon.row > kingRow) {
                        // 红炮在将下边
                        for (let row = kingRow + 1; row < redRightCannon.row; row++) {
                            if (over) {
                                if (pieces[row][kingCol]) {
                                    flag = false
                                    break
                                }
                            } else {
                                if (pieces[row][kingCol]) {
                                    over = true
                                }
                            }
                        }
                        if (!over) {
                            flag = false
                        }
                    } else {
                        // 红炮在将上边
                        for (let row = kingCol - 1; row > redRightCannon.col; row--) {
                            if (over) {
                                if (pieces[row][kingCol]) {
                                    flag = false
                                    break
                                }
                            } else {
                                if (pieces[row][kingCol]) {
                                    over = true
                                }
                            }
                        }
                        if (!over) {
                            flag = false
                        }
                    }
                } else {
                    flag = false
                }
            } catch (error) {
                if (error.message === "redRightCannon is not defined") {
                    flag = false
                } else {
                    throw error
                }
            }
            if (flag) {
                return true
            }
            flag = true
            // 兵
            // 因为红兵有五个,所以遍历起来效率低下,使用直接判断法
            if ((pieces[kingRow][kingCol - 1] && pieces[kingRow][kingCol - 1].isAlive && pieces[kingRow][kingCol - 1].innerText === "兵") ||
                (pieces[kingRow][kingCol + 1] && pieces[kingRow][kingCol + 1].isAlive && pieces[kingRow][kingCol + 1].innerText === "兵") ||
                (pieces[kingRow + 1][kingCol] && pieces[kingRow + 1][kingCol].isAlive && pieces[kingRow + 1][kingCol].innerText === "兵")) {
                return true
            }
        }
        // 处理白脸将问题:将帅不能碰面
        // 这个问题对于两边都适用,所以写到外面
        if (redKing.col === blackKing.col) {
            // 将肯定在帅的上面,不用分类讨论
            // 就从红方开始数格子吧,没有别的意思
            for (let row = redKing.row - 1; row > blackKing.row; row--) {
                if (pieces[row][redKing.col]) {
                    flag = false
                    break
                }
            }
        } else {
            // console.log("将帅不同列");
            flag = false
        }
        if (flag) {
            return true
        }
        return false
    })()
    // 判断有没有被将军结束
    // 恢复原状
    piece.row = prevRow
    piece.col = prevCol
    pieces[prevRow][prevCol] = piece
    pieces[destRow][destCol] = enemy
    if (enemy) {
        enemy.isAlive = true
    }
    return res
}