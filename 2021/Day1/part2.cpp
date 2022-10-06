/**
 * @file part2.cpp
 * @author Justin Stevens (https://github.com/JSteve0)
 * @brief Day 1 part 2 of Advent of Code 2021 (https://adventofcode.com)
 * @version 1.0
 * @date 2022-10-06
*/

#include <iostream>
#include <fstream>
#include <string>

using std::ifstream;
using std::string;
using std::cout;

int 
main () 
{
  ifstream file;
  file.open ("input.txt");
  
  if (file.is_open())
  {
    int curr, count, curr_window = 0;
    string line;

    getline (file, line);
    int oldest = stoi (line);

    getline (file, line);
    int old = stoi (line);

    getline (file, line);
    int prev = stoi (line);

    int prev_window = oldest + old + prev;

    while ( getline (file, line) )
    {
      curr = stoi(line);

      int curr_window = curr + prev + old;

      if (curr_window > prev_window)
        ++count;

      prev_window = curr_window;
      old = prev;
      prev = curr;
    }

    cout << count << "\n";
    file.close();
  }

  return 0;
}
