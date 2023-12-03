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

const isDigit = (char) => {
    return char >= '0' && char <= '9';
}

const part1 = () => {
    let redIndex = 0;
    let greenIndex = 1;
    let blueIndex = 2;
    let limits = [12, 13, 14];

    const data = readFile('./input.txt');

    const sum = data.reduce((acc, line) => {
        let gameID = parseInt(line.split(' ')[1].replaceAll(':', ''));
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

        let redMax = -1;
        let greenMax = -1;
        let blueMax = -1;

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
