package Day1;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Scanner;

public class Day1 {

    public static void main(String[] args) throws FileNotFoundException {
        File file = new File("./2022/Day1/input.txt");
        Scanner console = new Scanner(file);

        ArrayList<Integer> cal = new ArrayList<>();

        int max = 0;
        int curr = 0;
        while (console.hasNextLine())
        {
            String temp = console.nextLine();
            if (temp.equalsIgnoreCase(""))
            {
                cal.add(curr);
                curr = 0;
            } else {
                curr += Integer.parseInt(temp);
            }
        }

        cal.sort(Collections.reverseOrder());
        System.out.println(cal.get(0));
        System.out.println(cal.get(2) + cal.get(1) + cal.get(0));

    }

}
