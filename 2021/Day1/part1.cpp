/**
 * @file part1.cpp
 * @author Justin Stevens (https://github.com/JSteve0)
 * @brief Day 1 part 1 of Advent of Code 2021 (https://adventofcode.com)
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
    int curr, count = 0;
    string line;

    getline (file, line);
    int prev = stoi (line);

    while ( getline (file, line) )
    {
      curr = stoi(line);

      if (curr > prev)
        ++count;

      prev = curr;
    }

    cout << count << "\n";
    file.close();
  }

  return 0;
}
