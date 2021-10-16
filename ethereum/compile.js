const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

// delete current build folder for newer
const buildPath = path.resolve(__dirname, 'build' );
fs.removeSync(buildPath);


// compile it.
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source,1).contracts;

// create a folder or ensure there is a path like that.
fs.ensureDirSync(buildPath);

// pipe outputs to the folder.
for(let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output[contract]
  )
}