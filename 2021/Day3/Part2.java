/**
 * @file part2.java
 * @author Justin Stevens (https://github.com/JSteve0)
 * @brief Day 3 part 2 of Advent of Code 2021 (https://adventofcode.com)
 * @version 1.0
 * @date 2022-11-10
 */

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;

public class Part2 {

    public static void main(String[] args) throws FileNotFoundException {
        System.out.println(new File("2021/Day3/input.txt").getAbsolutePath());
        File file = new File("2021/Day3/input.txt");
        Scanner console = new Scanner(file);
        ArrayList<String> input1 = new ArrayList<>();
        ArrayList<String> input2 = new ArrayList<>();

        int width = 0;

        while (console.hasNext())
        {
            input1.add(console.nextLine());
            input2.add(input1.get(input1.size() - 1));
        }

        width = input1.get(0).length();

        for (int i = 0; i < width; i++)
        {
            if (input1.size() <= 1)
                break;
            char bit = leastCommonBit(input1, i);
            for (int j = input1.size() - 1; j >= 0; j--)
            {
                if (input1.get(j).charAt(i) == bit)
                {
                    input1.remove(j);
                }
            }
        }

        for (int i = 0; i < width; i++)
        {
            if (input2.size() <= 1)
                break;
            char bit = mostSignificantBit(input2, i);
            for (int j = input2.size() - 1; j >= 0; j--)
            {
                if (input2.get(j).charAt(i) == bit)
                {
                    input2.remove(j);
                }
            }
        }

        int oxygenGeneratorRating = base2ToBase10(input1.get(0));
        int CO2ScrubberRating = base2ToBase10(input2.get(0));

        int lifeSupportRating = oxygenGeneratorRating * CO2ScrubberRating;

        System.out.println("Oxygen Generator Rating: " + oxygenGeneratorRating);
        System.out.println("CO2 Scrubber Rating: " + CO2ScrubberRating);
        System.out.println("Life Support Rating: " + lifeSupportRating);

        console.close();
    }

    private static char leastCommonBit(ArrayList<String> input, int pos) {
        int offBits = 0;
        int onBits = 0;

        for (String s : input) {
            if (s.charAt(pos) == '0')
            {
                offBits++;
            }
            else if (s.charAt(pos) == '1')
            {
                onBits++;
            }
            else {
                System.out.println(s);
            }
        }

        return onBits < offBits ? '1' : '0';
    }

    private static char mostSignificantBit(ArrayList<String> input, int pos)
    {
        return leastCommonBit(input, pos) == '1' ? '0' : '1';
    }

    private static int base2ToBase10 (String s)
    {
        int sum = 0;

        for (int i = 0; i < s.length(); i++)
        {
            int index = s.length() - 1 - i;
            if (s.charAt(index) == '1')
            {
                sum += Math.pow(2, i);
            }
        }

        return sum;
    }

}
