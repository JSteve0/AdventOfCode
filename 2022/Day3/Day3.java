package Day3;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;

public class Day3 {

    public static void main(String[] args) throws FileNotFoundException {
        File file = new File("./2022/Day3/input.txt");
        Scanner console = new Scanner(file);

        String line;
        int sum1 = 0;
        int sum2 = 0;
        int count = 0;
        String[] inputs = new String[3];
        while (console.hasNextLine()) {
            if (count == 3) {
                count = 0;
            }
            line = console.nextLine();
            sum1 += value(intersection(line.substring(0, line.length() / 2), line.substring(line.length() / 2)));
            inputs[count % 3] = line;

            if (count == 2) {
                String s = intersections(inputs[0], inputs[1]);
                sum2 += value(intersection(s, inputs[2]));
            }

            ++count;
        }

        System.out.println("Part 1: " + sum1);
        System.out.println("Part 2: " + sum2);
    }

    public static int value(char a) {
        if (a >= 'a')
            return (int) (a - 'a' + 1);
        else
            return (int) (a - 'A' + 27);
    }

    public static char intersection(String s1, String s2) {
        for (int i = 0; i < s1.length(); ++i) {
            for (int j = 0; j < s2.length(); j++) {
                if (s1.charAt(i) == s2.charAt(j)) {
                    return s1.charAt(i);
                }
            }
        }

        return ' ';
    }

    public static String intersections(String s1, String s2) {
        StringBuilder intersection = new StringBuilder();
        for (int i = 0; i < s1.length(); ++i) {
            for (int j = 0; j < s2.length(); j++) {
                if (s1.charAt(i) == s2.charAt(j)) {
                    intersection.append(s1.charAt(i));
                }
            }
        }

        return intersection.toString();
    }

}
