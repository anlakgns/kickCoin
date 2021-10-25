import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0xb86536aC05933ff627cA22EEE50F949baf8B2C33'
);

export default instance;
