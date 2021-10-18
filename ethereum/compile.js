const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

// delete current build folder for newer
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

// compile it.
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

var input = {
  language: 'Solidity',
  sources: {
    'Campaign.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));

// create a folder or ensure there is a path like that.
fs.ensureDirSync(buildPath);

// pipe outputs to the folder.
for (let contract in output.contracts['Campaign.sol']) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract + '.json'),
    output.contracts['Campaign.sol'][contract]
  );
}
