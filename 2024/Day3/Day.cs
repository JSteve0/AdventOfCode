using _2024.Utils;
using System.Text.RegularExpressions;

namespace _2024.Day3;

/**
 * @Author: Justin Stevens
 * @Date: 2024-12-13
 * @Link: https://adventofcode.com/2024/day/3
 */
public class Day : IDay {

    // I'm not going to manually parse that input, using regex instead
    public string Part1() {
        string[] lines = TextFileReader.ReadFileToString("./Day3/input.txt").Split("\n");
        const string pattern = @"mul\(\d{1,3},\d{1,3}\)";

        var allMatches = GetAllMatches(lines, pattern);

        var sum = 0;
        foreach (string match in allMatches.Where(match => !string.IsNullOrWhiteSpace(match))) {
            (int first, int second) = ParseMatch(match);
            sum += first * second;
        }
        
        return sum.ToString();
    }

    public string Part2() {
        string[] lines = TextFileReader.ReadFileToString("./Day3/input.txt").Split("\n");
        const string pattern = @"mul\(\d{1,3},\d{1,3}\)|do\(\)|don\'t\(\)";

        var allMatches = GetAllMatches(lines, pattern);

        var sum = 0;
        var enabled = true;
        foreach (string match in allMatches.Where(match => !string.IsNullOrWhiteSpace(match))) {
            if (match.Equals("don't()", StringComparison.OrdinalIgnoreCase)) {
                enabled = false;
                continue;
            }
            
            if (match.Equals("do()", StringComparison.OrdinalIgnoreCase)) {
                enabled = true;
                continue;
            }
            
            if (!enabled) continue;
            
            (int first, int second) = ParseMatch(match);
            sum += first * second;
        }
        
        return sum.ToString();
    }
    
    private static List<string> GetAllMatches(string[] lines, string pattern) {
        List<string> allMatches = [];
        // ReSharper disable once LoopCanBeConvertedToQuery
        foreach (string line in lines) {
            // Find all matches
            MatchCollection matches = Regex.Matches(line, pattern);

            foreach (Match match in matches) {
                allMatches.Add(match.Value);
            }
        }

        return allMatches;
    }
    
    private static (int, int) ParseMatch(string line) {
        int length = "mul(".Length;
        string[] nums = line.Substring(length, line.Length - length - 1).Split(',');
            
        if (nums.Length != 2 || !int.TryParse(nums[0].Trim(), out int first) || !int.TryParse(nums[1].Trim(), out int second)) {
            throw new ArgumentException("Input is invalid. Input: " + line);
        }

        return (first, second);
    }

}
