/**
 * @file part2.cpp
 * @author Justin Stevens (https://github.com/JSteve0)
 * @brief Day 3 part 2 of Advent of Code 2021 (https://adventofcode.com)
 * @version 1.0
 * @date 2022-10-09
*/

#include <iostream>
#include <fstream>
#include <string>
#include <sstream>
#include <math.h>

using std::ifstream;
using std::string;
using std::stoi;
using std::cout;

#define INPUT_WIDTH 12

int 
main () 
{
  ifstream file;
  file.open ("input.txt");
  
  if (file.is_open())
  {
    string line;
    int count = 0;
    int bitcount[ INPUT_WIDTH ] = {0};
    
    while ( getline (file, line) )
    {
      for (int i = 0; i < line.length(); ++i) 
      {
        int c = (line.at(i) - '0');
        if (c == 1) 
          ++bitcount[i];
      }
      ++count;
    }

    int gamma = 0;
    for (int i = 0; i < INPUT_WIDTH; ++i) 
    {
      if (bitcount[i] > (count / 2))
        gamma += pow(2, INPUT_WIDTH - 1 - i);
    }

    int epsilon = pow(2, INPUT_WIDTH) - 1 - gamma;

    cout << "Gamma:             " << gamma << "\n";
    cout << "Epsilon:           " << epsilon << "\n";
    cout << "Power Consumption: " << (gamma * epsilon) << "\n";
    
    file.close();
  }

  return 0;
}
