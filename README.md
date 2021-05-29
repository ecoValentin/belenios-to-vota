# belenios-to-vota
Converts ballot data from Belenios JSON format to Vota CSV format

Vota (see https://gitlab.com/mtausig/vota ) is the ballot counting tool used by the Green Party in Vienna. It takes a CSV file containing all
ballots and a CSV file containing all candidates and calculates the results of an election.

Belenios (see https://gitlab.inria.fr/belenios/belenios ) is a verifiable voting system, also used by the Green Party in Austria. Belenios
produces its results in a JSON format.

This tool converts the JSON file produced by Belenios into a CSV file that can be used by Vota. In order to run it, you need Node.js. Clone the 
repository and run 

```
node . [results.json] [canidates.csv] [out.csv]
```

Where results.json is the result file produced by Belenios. candidates.csv is the candidates file in the format needed by Vota, and out.csv 
will contain the CSV data that can be fed into Vota.

You can find sample files for all of the files in this repository. You may also use a JSON-format for the candidates file.

# Important
**Please make sure that the order of candidates in the canidates.csv file is the same as the order of candidates on the ballots in Belenios! Belenios does not include the candidate names in the output!**


# Quick execution under Linux [Requires Vota on the same machine]
 * Edit candidates.csv file
   * Females get a 1 in the second column 
 * Edit input file
   * Paste votes from belenios
 * run exec.sh
   * sh exec.sh [ElectionType] [number of seats]
 * Candidates are presented on the terminal 
 * A tar archive of all election data is created in the current directory

