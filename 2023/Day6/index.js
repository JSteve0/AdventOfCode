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

const readFile = (fileName) => {
    return fs.readFileSync(fileName, 'utf8').split('\r\n');
}

const part1 = () => {
    const data = readFile('./input.txt');
    const times = data[0].split(' ').filter((element) => !isNaN(parseInt(element))).map((element) => parseInt(element));
    const distances = data[1].split(' ').filter((element) => !isNaN(parseInt(element))).map((element) => parseInt(element));
    const sum = times.reduce((acc, element, index) => {
        let count = 0;
        for (let speed = 1; speed < element; speed++) {
            const distanceTraveled = speed * (element - speed);
            if (distanceTraveled > distances[index]) count++;
        }
        return acc * count;
    }, 1);
    console.log(sum);
}

const part2 = () => {
    const data = readFile('./input.txt');
    const time = parseInt(data[0].split('').filter((element) => !isNaN(parseInt(element))).join(''));
    const distance = parseInt(data[1].split('').filter((element) => !isNaN(parseInt(element))).join(''));

    let count = 0;
    let flag = false;
    for (let speed = 1; speed < time; speed++) {
        const distanceTraveled = speed * (time - speed);
        if (distanceTraveled > distance) {
            if (!flag) {
                flag = true;
            }
            count++;
        } else if (flag) {
            break;
        }
    }

    console.log(count);
}

main();
