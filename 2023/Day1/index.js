/**
 * @file index.js
 * @author Justin Stevens (https://github.com/JSteve0)
 * @brief Day 1 of Advent of Code 2023 (https://adventofcode.com)
 * @date 2023-12-02
 */

const fs = require('fs');

const main = () => {
    part1();
    part2();
}

const part1 = () => {
    const data = fs.readFileSync('./input.txt', 'utf8');
    const sum = data.split('\n').reduce((acc, line) => {
        return acc + parseInt(parseCalibrationString(line));
    }, 0);

    // part 1
    console.log(sum);
}

const part2 = () => {
    const data = fs.readFileSync('./input2.txt', 'utf8');
    const sum = data.split('\n').reduce((acc, line) => {
        return acc + parseInt(parseCalibrationString(line));
    }, 0);

    // part 1
    console.log(sum);
}

const isDigit = (char) => {
    return char >= '0' && char <= '9';
}

const data = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9',
    numbers: [
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'nine'
    ]
};


const parseCalibrationString = (calibrationString) => {
    let firstDigit = null;
    let lastDigit = null;

    function handleDigitOrNumber(char, possibleNumbers) {
        if (isDigit(char) || data.numbers.includes(possibleNumbers[0]) ||
            data.numbers.includes(possibleNumbers[1]) ||
            data.numbers.includes(possibleNumbers[2])) {
            let number = isDigit(char) ? char : data[possibleNumbers.find(num => data.numbers.includes(num))];
            if (firstDigit === null) {
                firstDigit = number;
            }
            lastDigit = number;
        }
    }

    for (let i = 0; i < calibrationString.length; i++) {
        let char = calibrationString[i];
        let possibleNumbers = [
            calibrationString.substring(i, i + 3),
            calibrationString.substring(i, i + 4),
            calibrationString.substring(i, i + 5)
        ];
        handleDigitOrNumber(char, possibleNumbers);
    }

    return firstDigit + lastDigit;
}

main();

