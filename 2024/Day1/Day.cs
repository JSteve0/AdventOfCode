using _2024.Utils;

namespace _2024.Day1;

/**
 * @Author: Justin Stevens
 * @Date: 2024-12-13
 * @Link: https://adventofcode.com/2024/day/1
 */
public class Day : IDay {

    /**
     * I'm going to do a simple but slow solution for this one.
     * 1. Read in the input into two lists
     * 2. Sort the two lists
     * 3. Zip the two lists together and sum the absolute differences between each pair
     */
    public string Part1() {
        string[] lines = TextFileReader.ReadFileToString("./Day1/input.txt").Split("\n");
        
        List<int> leftList = []; 
        List<int> rightList = []; 

        foreach (string line in lines) {
            if (string.IsNullOrWhiteSpace(line)) {
                continue;
            }
            
            (int first, int second) = ParseTwoNumbers(line);
            
            leftList.Add(first);
            rightList.Add(second);
        }
        
        leftList.Sort();
        rightList.Sort();
        
        int sumOfDifferences = leftList.Zip(rightList).Sum(pair => Math.Abs(pair.First - pair.Second));

        return sumOfDifferences.ToString();
    }

    /**
     * This is also a simple but slow solution as well.
     */
    public string Part2() {
        string[] lines = TextFileReader.ReadFileToString("./Day1/input.txt").Split("\n");
        
        List<int> leftList = []; 
        
        // Key: number from input, Value: number of times it appears
        Dictionary<int, int> rightList = []; 

        foreach (string line in lines) {
            if (string.IsNullOrWhiteSpace(line)) {
                continue;
            }
            
            (int first, int second) = ParseTwoNumbers(line);
            
            leftList.Add(first);
            
            if (!rightList.TryAdd(second, 1)) {
                rightList[second]++;
            }
        }

        int sum = leftList.Sum(num => num * rightList.GetValueOrDefault(num, 0));

        return sum.ToString();
    }
    
    /// <summary>
    /// Parses a string containing two numbers separated by 3 spaces into a tuple of integers.
    /// </summary>
    /// <param name="input">The input string to parse.</param>
    /// <returns>A tuple containing the two parsed integers.</returns>
    /// <exception cref="ArgumentException">Thrown if the input format is invalid.</exception>
    private static (int First, int Second) ParseTwoNumbers(string input) {
        if (string.IsNullOrWhiteSpace(input)) {
            throw new ArgumentException("Input cannot be null or whitespace.", nameof(input));
        }

        string[] parts = input.Split(["   "], StringSplitOptions.RemoveEmptyEntries);
        
        if (parts.Length != 2 || !int.TryParse(parts[0].Trim(), out int first) || !int.TryParse(parts[1].Trim(), out int second)) {
            throw new ArgumentException("Input must contain two valid integers separated by exactly 3 spaces.");
        }

        return (first, second);
    }

}
