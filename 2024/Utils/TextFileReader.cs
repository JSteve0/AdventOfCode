using System;
using System.IO;

namespace _2024.Utils;

public static class TextFileReader {
    /// <summary>
    /// Reads the content of a text file and returns it as a string.
    /// </summary>
    /// <param name="filePath">The full path of the text file to read.</param>
    /// <returns>The content of the text file as a string.</returns>
    /// <exception cref="FileNotFoundException">Thrown if the file does not exist.</exception>
    /// <exception cref="IOException">Thrown if there is an error reading the file.</exception>
    public static string ReadFileToString(string filePath) {
        if (string.IsNullOrWhiteSpace(filePath)) {
            throw new ArgumentException("File path cannot be null or whitespace.", nameof(filePath));
        }

        if (!File.Exists(filePath)) {
            throw new FileNotFoundException($"The file '{Path.GetFullPath(filePath)}' does not exist.", filePath);
        }

        try {
            return File.ReadAllText(filePath);
        } catch (Exception ex) {
            throw new IOException($"An error occurred while reading the file '{filePath}'.", ex);
        }
    }
}
