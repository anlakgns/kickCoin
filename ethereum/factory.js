import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0xf36B3e380324c9Cc76204C20B845Fb8afcC6bf10'
);

export default instance;
