import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0x4F883583310854116CFa2F42B2B41E671D7AF9aE'
);

export default instance;
