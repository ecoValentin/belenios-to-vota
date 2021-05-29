const fs = require('fs');
const { argv } = require('process');

console.log('Starting conversion...')

if(process.argv.length !== 5) {
    console.log('Usage: node . [beleniosResultsFile] [candidatesFile] [outputFile]');
    return;
}

fs.readFile(process.argv[2], 'utf8', (resultError, results) => {
    if(resultError) {
        console.log('Could not open results file: ');
        console.error(resultError);
        return;
    }

    fs.readFile(process.argv[3], 'utf8', (candidatesError, candidates) => {
        if(candidatesError) {
            console.log('Could not open results file: ');
            console.error(candidatesError);
            return;
        }

        const csvResults = convertResults(results, candidates);

        fs.writeFile(process.argv[4], csvResults, err => {
            if(err) {
                console.log('Error writing to output file: ');
                console.error(err);
                return;
            }

            console.log('Successfully converted results!')
        });
    });
});

function convertResults(results, candidates) {
    const resultData = JSON.parse(results);
    const candidatesData = parseCandidates(candidates);

    let resultCsv = '';
    candidatesData.forEach(candidate => {
        resultCsv += ';' + candidate;
    });
    resultCsv += '\r\n';
   
    resultData.forEach((ballot, index) => {
        resultCsv += 'Ballot' + index;
        ballot.forEach(vote => {
            resultCsv += ';' + (vote === 0 ? '' : vote);
        });
        resultCsv += '\r\n';
    }); 

    return resultCsv;
}

function parseCandidates(candidates) {
    try {
        return JSON.parse(candidates);
    } catch (err) {
        let candidatesData = [];
	if (candidates.search('\r\n')){
	    candidatesLines = candidates.split('\r\n');
	}
	else{
	    candidatesLines = candidates.split('\n');
	}
        candidatesLines.forEach(line => {
            const semicolonIdx = line.indexOf(';');
            candidatesData.push(line.substr(0, semicolonIdx));
        });

        return candidatesData;
    }
}
