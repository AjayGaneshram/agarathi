const fs = require('fs');
const path = require('path');

function generateOutput() {
    const inputFile = path.resolve(__dirname, '../src/input.json');  // Adjust path
    const outputFile = path.resolve(__dirname, '../src/Output.jsx');

    if (!fs.existsSync(inputFile)) {
        console.error(`❌ Error: input.json not found at ${inputFile}`);
        process.exit(1);
    } else {
        console.log(`✅ Found input.json at ${inputFile}`);
    }

    console.log('🔍 Reading input.json...');
    const inputData = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));

    const outputData = {
        eachWord: {},
        firstLetterWords: {},
        firstLetterList: [], // ✅ Added missing key
    };

    inputData.forEach(word => {
        const firstLetter = word.firstLetter;

        if (!outputData.firstLetterWords[firstLetter]) {
            outputData.firstLetterWords[firstLetter] = [];
        }
        outputData.firstLetterWords[firstLetter].push(word.word);

        // ✅ Add the first letter only if it's not already in the list
        if (!outputData.firstLetterList.includes(firstLetter)) {
            outputData.firstLetterList.push(firstLetter);
        }

        // ✅ Add word details
        outputData.eachWord[word.word] = {
            word: word.word,
            detail: word.detail,
            firstLetter: firstLetter,
        };
    });

    const jsContent = `const jsonData = ${JSON.stringify(outputData, null, 2)};
export default jsonData;`;

    fs.writeFileSync(outputFile, jsContent, 'utf-8');

    console.log(`✅ Output successfully written at ${outputFile}`);
}

generateOutput();
