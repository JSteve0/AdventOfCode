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
  string line;
  file.open ("input.txt");
  
  if (file.is_open())
  {

    int prev = 0;
    int curr = 0;
    int count = 0;

    while ( getline (file, line) )
    {
      curr = stoi(line);
      if (prev == 0) {
        prev = curr;
        continue;
      }

      if (curr > prev)
      {
        ++count;
      }

      prev = curr;
    }

    cout << count << "\n";
    file.close();
  }

  return 0;

}