import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0x591d61f1f5280f715700B8102759fc87759e9faE'
);

export default instance;
