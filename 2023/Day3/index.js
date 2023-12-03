/**
 * @file index.js
 * @author Justin Stevens (https://github.com/JSteve0)
 * @brief Day 3 of Advent of Code 2023 (https://adventofcode.com)
 * @date 2023-12-03
 */

const fs = require('fs');

const main = () => {
    part1();
    part2();
}

const isDigit = (char) => {
    return char >= '0' && char <= '9';
}

const readFile = (fileName) => {
    return fs.readFileSync(fileName, 'utf8').split('\r\n');
}

const part1 = () => {
    const data = readFile('./input.txt');
    const numbers = [];
    data.forEach((element, index) => {
        let startIndex = -1;
        let endIndex = -1;
        for (let i = 0; i < element.length; i++) {
            if (isDigit(element[i])) {
                if (startIndex === -1) startIndex = i;
                endIndex = i;
            }
            if ((startIndex !== -1 && !isDigit(element[i])) || (startIndex !== -1 && endIndex === element.length -1 && i === element.length - 1 && isDigit(element[i]))) {
                let added = false;
                for (let j = Math.max(0, index - 1); j <= Math.min(index + 1, data.length - 1); j++) {
                    for (let k = Math.max(0, startIndex - 1); k <= Math.min(endIndex + 1, element.length - 1); k++) {
                        if (!isDigit(data[j][k]) && data[j][k] !== '.' && !added) {
                            numbers.push(parseInt(element.substring(startIndex, endIndex + 1)));
                            added = true;
                        }
                    }
                }
                startIndex = -1;
                endIndex = -1;
            }
        }
    });

    let sum = numbers.reduce((acc, element) => acc + element, 0);

    console.log(sum);
}

const part2 = () => {
    const data = readFile('./input.txt');

    let sum = 0;
    data.forEach((element, index) => {
        for (let i = 0; i < element.length; i++) {
            if (element[i] === '*') {
                let foundNumbers = [];

                foundNumbers.push(processDirection(data, index, i - 1)); // Left
                foundNumbers.push(processDirection(data, index, i + 1));  // Right

                let up = processDirection(data, index - 1, i);
                let down = processDirection(data, index + 1, i);

                if (up) {
                    foundNumbers.push(up);
                } else {
                    foundNumbers.push(processDirection(data, index - 1, i - 1)); // Diagonal Up Left
                    foundNumbers.push(processDirection(data, index - 1, i + 1));  // Diagonal Up Right
                }

                if (down) {
                    foundNumbers.push(down);
                } else {
                    foundNumbers.push(processDirection(data, index + 1, i - 1));  // Diagonal Down Left
                    foundNumbers.push(processDirection(data, index + 1, i + 1)); // Diagonal Down Right
                }

                foundNumbers = foundNumbers.filter((element) => element !== null && !isNaN(element) && element !== undefined).filter(function(item, pos) {
                    return foundNumbers.indexOf(item) === pos;
                });

                if (foundNumbers.length > 1) {
                    sum += foundNumbers.reduce((acc, element) => acc * element, 1);
                }
            }
        }
    });

    console.log(sum);
}

function processDirection(array, rowIndex, colIndex) {
    if (isDigit(array[rowIndex][colIndex])) {
        return searchBidirectional(array[rowIndex], colIndex);
    }
}

searchBidirectional = (string, startIndex) => {
    let start = startIndex;
    let end = startIndex;
    while (start !== 0 && isDigit(string[start - 1])) {
        start--;
    }
    while (end !== string.length && isDigit(string[end + 1])) {
        end++;
    }

    return parseInt(string.substring(start, end + 1));
}

main();
