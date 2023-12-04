/**
 * @file index.js
 * @author Justin Stevens (https://github.com/JSteve0)
 * @brief Day 4 of Advent of Code 2023 (https://adventofcode.com)
 * @date 2023-12-04
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
    const sum = data.reduce((acc, element) => {
        const numbers = element.split(':')[1].split('|');
        const winningNumbers = numbers[0].split(' ').filter((number) => number !== '');
        const cardNumbers = numbers[1].split(' ').filter((number) => number !== '');

        const count = winningNumbers.reduce((acc, number) => {
            return cardNumbers.includes(number) ? acc + 1 : acc;
        }, 0);

        return acc + (count === 0 ? 0 : Math.pow(2, count - 1));
    }, 0);

    console.log(sum);
}

const part2 = () => {
    const data = readFile('./input.txt');
    const cardCount = Array(data.length).fill(1);
    const count = data.reduce((acc, element, currentIndex) => {
        const numbers = element.split(':')[1].split('|');
        const winningNumbers = numbers[0].split(' ').filter((number) => number !== '');
        const cardNumbers = numbers[1].split(' ').filter((number) => number !== '');

        const count = winningNumbers.reduce((acc, number) => {
            return cardNumbers.includes(number) ? acc + 1 : acc;
        }, 0);

        for (let i = currentIndex + 1; i < Math.min(currentIndex + count + 1, data.length); i++) {
            cardCount[i] += cardCount[currentIndex];
        }

        return acc + cardCount[currentIndex];
    }, 0);

    console.log(count);
}

main();
