/**
 * @file part1.cpp
 * @author Justin Stevens (https://github.com/JSteve0)
 * @brief Day 2 part 1 of Advent of Code 2021 (https://adventofcode.com)
 * @version 1.0
 * @date 2022-10-06
*/

#include <iostream>
#include <fstream>
#include <string>
#include <sstream>

using std::ifstream;
using std::istringstream;
using std::string;
using std::cout;

int 
main () 
{
  ifstream file;
  file.open ("input.txt");
  
  if (file.is_open())
  {
    int distance, depth, horizontal = 0;
    string line, command;

    while ( getline (file, line) )
    {
      istringstream ss(line);
      ss >> command;
      ss >> distance;

      if (command.compare ("forward") == 0)
        horizontal += distance;

      else if (command.compare ("up") == 0)
        depth -= distance;

      else if (command.compare ("down") == 0)
        depth += distance;

      else 
        cout << "command not recognized\n";

    }

    cout << "Horizontal: " << horizontal << "\n";
    cout << "Depth:      " << depth << "\n";
    cout << "Product:    " << horizontal * depth << "\n";
    
    file.close();
  }

  return 0;
}
