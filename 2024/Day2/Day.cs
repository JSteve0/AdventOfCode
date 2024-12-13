using System.Diagnostics.Contracts;
using _2024.Utils;

namespace _2024.Day2;

/**
 * @Author: Justin Stevens
 * @Date: 2024-12-13
 * @Link: https://adventofcode.com/2024/day/2
 */
public class Day : IDay {
    
    private enum ListType {
        Increasing,
        Decreasing,
        Neither
    }

    public string Part1() {
        string lines = TextFileReader.ReadFileToString("./Day2/input.txt");
        var numbers = ParseNumbers(lines);
        
        int sum = numbers.Count(IsSafe);

        return sum.ToString();
    }

    // Bruteforce solution
    public string Part2() {
        string lines = TextFileReader.ReadFileToString("./Day2/input.txt");
        var numbers = ParseNumbers(lines);

        int sum = numbers.Count(IsSafeWithOneMistake);

        return sum.ToString();
    }
    
    [Pure]
    private static bool IsSafeWithOneMistake(List<int> row) {
        if (IsSafe(row)) {
            return true;
        }
        
        // Brute force solution
        for (var i = 0; i < row.Count; i++) {
            List<int> copy = [..row];
            copy.RemoveAt(i);
            
            if (IsSafe(copy)) {
                return true;
            }
        }

        return false;
    }

    [Pure]
    private static bool IsSafe(List<int> row) {
        var type = ListType.Neither;
        for (var i = 0; i < row.Count - 1; i++) {
            int currNum = row[i];
            int nextNum = row[i + 1];

            if (Math.Abs(currNum - nextNum) < 1 || Math.Abs(currNum - nextNum) > 3) {
                return false;
            }
                
            if (currNum < nextNum) { // Increasing
                if (type == ListType.Decreasing) {
                    return false;
                }
                type = ListType.Increasing;
            } else if (currNum > nextNum) { // Decreasing
                if (type == ListType.Increasing) {
                    return false;
                }
                type = ListType.Decreasing;
            } else { // Same number case, should be covered by if above, but just incase
                return false;
            }
        }

        return true;
    }
    
    private static List<List<int>> ParseNumbers(string lines) {
        List<List<int>> numbers = [];
        
        foreach (string line in lines.Split("\n")) {
            if (string.IsNullOrWhiteSpace(line)) {
                continue;
            }
            
            List<int> numbersInLine = [];
            foreach (string num in line.Split(" ")) {
                if (string.IsNullOrWhiteSpace(num)) {
                    continue;
                }
                numbersInLine.Add(int.Parse(num));
            }
            
            if (numbersInLine.Count > 0) {
                numbers.Add(numbersInLine);
            }
        }
        
        return numbers;
    }

}
