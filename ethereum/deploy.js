const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const CampaignFactory = require('./build/CampaignFactory.json');

// There is a problem with gas amount and prices so can't deploy here


const provider = new HDWalletProvider({
  mnemonic:
    'grunt nurse cycle addict snake wood join wife winter fame borrow page',
  providerOrUrl:
    'https://rinkeby.infura.io/v3/8403a1ae62ed409c99c4aa814f985006',
});

const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log('Attemting to deploy from account ', accounts[0]);

    const result = await new web3.eth.Contract(CampaignFactory.abi)

      .deploy({ data: CampaignFactory.evm.bytecode.object })
      .send({ gas: '3000000', gasPrice: '50000000000', from: accounts[0] });

    console.log('Contract deployed to', result.options.address);
  } catch (err) {
    console.log(err);
  }
};
deploy();
