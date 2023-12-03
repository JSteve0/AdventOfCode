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
        let startIndex = -1;
        let endIndex = -1;
        for (let i = 0; i < element.length; i++) {
            if (element[i] === '*') {
                let number1 = null;
                let number2 = null;
                //left case
                if (i !== 0 && isDigit(element[i - 1])) {
                    if (number1 === null) {
                        number1 = searchBidirectional(element, i - 1);
                    } else if (number2 === null){
                        number2 = searchBidirectional(element, i - 1);
                    }
                }
                //right case
                if (i !== element.length && isDigit(element[i + 1])) {
                    if (number1 === null) {
                        number1 = searchBidirectional(element, i + 1);
                    } else if (number2 === null){
                        number2 = searchBidirectional(element, i + 1);
                    }
                }
                //up case
                if (index !== 0 && isDigit(data[index - 1][i])) {
                    if (number1 === null) {
                        number1 = searchBidirectional(data[index - 1], i);
                    } else if (number2 === null){
                        number2 = searchBidirectional(data[index - 1], i);
                    }
                }
                //down case
                if (index !== data.length && isDigit(data[index + 1][i])) {
                    if (number1 === null) {
                        number1 = searchBidirectional(data[index + 1], i);
                    } else if (number2 === null){
                        number2 = searchBidirectional(data[index + 1], i);
                    }
                }
                //diagonal up left case
                if (index !== 0 && i !== 0 && isDigit(data[index - 1][i - 1]) && !isDigit(data[index - 1][i])) {
                    if (number1 === null) {
                        number1 = searchBidirectional(data[index - 1], i - 1);
                    } else if (number2 === null){
                        number2 = searchBidirectional(data[index - 1], i - 1);
                    }
                }
                //diagonal up right case
                if (index !== 0 && i !== element.length && isDigit(data[index - 1][i + 1]) && !isDigit(data[index - 1][i])) {
                    if (number1 === null) {
                        number1 = searchBidirectional(data[index - 1], i + 1);
                    } else if (number2 === null){
                        number2 = searchBidirectional(data[index - 1], i + 1);
                    }
                }
                //diagonal down left case
                if (index !== data.length && i !== 0 && isDigit(data[index + 1][i - 1]) && !isDigit(data[index + 1][i])) {
                    if (number1 === null) {
                        number1 = searchBidirectional(data[index + 1], i - 1);
                    } else if (number2 === null){
                        number2 = searchBidirectional(data[index + 1], i - 1);
                    }
                }
                //diagonal down right case
                if (index !== data.length && i !== element.length && isDigit(data[index + 1][i + 1]) && !isDigit(data[index + 1][i])) {
                    if (number1 === null) {
                        number1 = searchBidirectional(data[index + 1], i + 1);
                    } else if (number2 === null){
                        number2 = searchBidirectional(data[index + 1], i + 1);
                    }
                }

                if (number1 !== null && number2 !== null) {
                    sum += number1 * number2;
                }
            }
        }
    });

    console.log(sum);
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
