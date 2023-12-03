/**
 * @file index.js
 * @author Justin Stevens (https://github.com/JSteve0)
 * @brief Day 2 of Advent of Code 2023 (https://adventofcode.com)
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

const part1 = () => {
    const redIndex = 0, greenIndex = 1, blueIndex = 2;
    const limits = [12, 13, 14];

    const data = readFile('./input.txt');

    const sum = data.reduce((acc, line) => {
        const gameID = parseInt(line.split(' ')[1].replaceAll(':', ''));
        let validGame = true;

        line.split(':')[1].split(';').forEach((element) => {
            element.split(',').forEach((color) => {
                if (color.includes('red') && parseInt(color.replace(' red', '')) > limits[redIndex]) {
                    validGame = false;
                } else if (color.includes('green') && parseInt(color.replace(' green', '')) > limits[greenIndex]) {
                    validGame = false;
                } else if (color.includes('blue') && parseInt(color.replace(' blue', '')) > limits[blueIndex]) {
                    validGame = false;
                }
            });
        });

        return acc + (validGame ? gameID : 0)
    }, 0);

    console.log(sum);
}

const part2 = () => {

    const data = readFile('./input2.txt');

    const sum = data.reduce((acc, line) => {

        let redMax = -1, greenMax = -1, blueMax = -1;

        line.split(':')[1].split(';').forEach((element) => {
            element.split(',').forEach((color) => {
                if (color.includes('red')) {
                    let redCount = parseInt(color.replace(' red', ''));
                    redMax = redCount > redMax ? redCount : redMax;
                } else if (color.includes('green')) {
                    let greenCount = parseInt(color.replace(' green', ''));
                    greenMax = greenCount > greenMax ? greenCount : greenMax;
                } else if (color.includes('blue')) {
                    let blueCount = parseInt(color.replace(' blue', ''));
                    blueMax = blueCount > blueMax ? blueCount : blueMax;
                }
            });
        });

        return acc + (redMax * greenMax * blueMax)
    }, 0);

    console.log(sum);
}

main();
