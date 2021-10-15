const HdWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaingFactory.json')

const provider = new HdWalletProvider(
  process.env.NEXT_PUBLIC_ACCOUNT_WORDS,
  process.env.NEXT_PUBLIC_INFURA_PROVIDER
);

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
