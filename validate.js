const fs = require('fs');
const { argv } = require('process');

console.log('Starting analysis...')

if(process.argv.length < 3) {
    console.log('Usage: node . [csvFile] [minCount] [maxCount]');
    return;
}

const minCount = process.argv.length > 3 ? parseInt(process.argv[3]) : 0;
const maxCount = process.argv.length > 4 ? parseInt(process.argv[4]) : 100;

fs.readFile(process.argv[2], 'utf8', (resultError, results) => {
    if(resultError) {
        console.log('Could not open results file: ');
        console.error(resultError);
        return;
    }

    let invalidCount = 0;

    const lines = results.split(/\r?\n/).slice(1);
    lines.forEach(line => {
        const values = line.split(';')
            .slice(1)
            .filter(v => !!v)
            .map(v => parseInt(v))
            .sort((a, b) => a - b);

        values.every((value, idx) => {
           if(idx + 1 !== value) {
               console.log('\x1b[43m\x1b[30mInvalid line found:\x1b[0m\t' + line);
               invalidCount++;
               return false;
           }

           return true;
        });
    });

    if(invalidCount) {
        console.log('\r\n', '\x1b[31m', invalidCount + ' invalid lines found. Please correct them!', '\x1b[0m')
    } else {
        console.log('\r\n', '\x1b[32m', 'All lines seem to be valid!', '\x1b[0m');
    }
})