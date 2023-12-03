/**
 * @file index.js
 * @author Justin Stevens (https://github.com/JSteve0)
 * @brief Day 4 of Advent of Code 2021 (https://adventofcode.com)
 * @date 2023-12-02
 */

const fs = require('fs');

const main = () => {
    part1();
    part2();
}

const readFile = (fileName) => {
    return fs.readFileSync(fileName, 'utf8').split('\n');
}

const createBoard = () => {
    return Array.from(Array(5), () => [false, false, false, false, false]);
}

const isWinner = (board) => {
    // Check rows
    if (board.some((row) => row.every((element) => element === true))) {
        return true;
    }

    // Check columns
    for (let i = 0; i < board.length; i++) {
        let column = board.map((row) => row[i]);
        if (column.every((element) => element === true)) {
            return true;
        }
    }

    return false;
};

const part1 = () => {
    const data = fs.readFileSync('input.txt', 'utf8').split('\r\n\r\n');
    const bingoNumbers = data[0].split(',');
    data.splice(0, 1);

    const bingoStates = data.map((element) => createBoard());

    const boards = data.map((element) =>
        element.split('\r\n').map((line) =>
            line.split(' ').filter((number) => number !== '')
        )
    );

    let winnerIndex = -1;
    let lastBingoNumber = -1;

    for (let currentBingoIndex = 0; currentBingoIndex < bingoNumbers.length; currentBingoIndex++) {
        if (winnerIndex !== -1) break;
        let currentBingoNumber = bingoNumbers[currentBingoIndex];
        for (let currentBoardIndex = 0; currentBoardIndex < boards.length; currentBoardIndex++) {
            if (winnerIndex !== -1) break;
            let currentBoard = boards[currentBoardIndex];
            for (let row = 0; row < currentBoard.length; row++) {
                if (winnerIndex !== -1) break;
                for (let col = 0; col < currentBoard[row].length; col++) {
                    if (currentBingoNumber === currentBoard[row][col]) {
                        bingoStates[currentBoardIndex][row][col] = true;
                        if (isWinner(bingoStates[currentBoardIndex])) {
                            winnerIndex = currentBoardIndex;
                            lastBingoNumber = currentBingoNumber;
                            break;
                        }
                    }
                }
            }
        }
    }

    let sum = 0;
    bingoStates[winnerIndex].forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (!cell) {
                sum += parseInt(boards[winnerIndex][rowIndex][colIndex]);
            }
        });
    });
    console.log(sum * lastBingoNumber)
}

const part2 = () => {
    const data = fs.readFileSync('input2.txt', 'utf8').split('\r\n\r\n');
    const bingoNumbers = data[0].split(',');
    data.splice(0, 1);

    const bingoStates = data.map((element) => createBoard());

    const boards = data.map((element) =>
        element.split('\r\n').map((line) =>
            line.split(' ').filter((number) => number !== '')
        )
    );

    let winners = [];
    let lastBingoNumber = -1;

    for (let currentBingoIndex = 0; currentBingoIndex < bingoNumbers.length; currentBingoIndex++) {
        let currentBingoNumber = bingoNumbers[currentBingoIndex];
        for (let currentBoardIndex = 0; currentBoardIndex < boards.length; currentBoardIndex++) {
            let currentBoard = boards[currentBoardIndex];
            for (let row = 0; row < currentBoard.length; row++) {
                for (let col = 0; col < currentBoard[row].length; col++) {
                    if (currentBingoNumber === currentBoard[row][col] && !winners.includes(currentBoardIndex)) {
                        bingoStates[currentBoardIndex][row][col] = true;
                        if (isWinner(bingoStates[currentBoardIndex]) && !winners.includes(currentBoardIndex)) {
                            winners.push(currentBoardIndex);
                            lastBingoNumber = currentBingoNumber;
                        }
                    }
                }
            }
        }
    }

    let lastWinnerIndex = winners[winners.length - 1];

    let sum = 0;
    bingoStates[lastWinnerIndex].forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (!cell) {
                sum += parseInt(boards[lastWinnerIndex][rowIndex][colIndex]);
            }
        });
    });
    console.log(sum * lastBingoNumber)
}

main();
