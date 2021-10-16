const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json')

const provider = new HDWalletProvider({
  mnemonic: "grunt nurse cycle addict snake wood join wife winter fame borrow page",
  providerOrUrl: "https://rinkeby.infura.io/v3/8403a1ae62ed409c99c4aa814f985006"
});

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attemting to deploy from account ', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', gasPrice: '500000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();
