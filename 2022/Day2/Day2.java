package Day2;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class Day2 {

    public static void main(String[] args) throws FileNotFoundException {
        File file = new File("./2022/Day2/input.txt");
        Scanner console = new Scanner(file);

        int score1 = 0;
        int score2 = 0;
        while (console.hasNextLine()) {
            String line = console.nextLine();
            char opp = line.charAt(0);
            char me = line.charAt(2);

            score1 += check1(opp, me);
            score2 += check2(opp, me);

        }

        System.out.println(score1);
        System.out.println(score2);

    }

    private static int check1(char o, char me) {
        int score = 0;

        // Draw
        if ((o == 'A' && me == 'X') || (o == 'B' && me == 'Y') || (o == 'C' && me == 'Z')) {
            score += 3;
        } else if ((o == 'A' && me == 'Y') || (o == 'B' && me == 'Z') || (o == 'C' && me == 'X')) {
            score += 6;
        }

        if (me == 'X') {
            ++score;
        } else if (me == 'Y') {
            score += 2;
        } else {
            score += 3;
        }

        return score;
    }

    private static int check2(char o, char me) {
        int score = 0;

        if (me == 'Y')
            score += check1(o, (char) (o + 23));
        else if (me == 'X') {
            if (o == 'A') score += check1(o, 'Z');
            else if (o == 'B') score += check1(o, 'X');
            else score += check1(o, 'Y');
        } else {
            if (o == 'A') score += check1(o, 'Y');
            else if (o == 'B') score += check1(o, 'Z');
            else score += check1(o, 'X');
        }

        return score;
    }

}
