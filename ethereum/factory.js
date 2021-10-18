import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x8e7C1cab380AF5D82a3e16B1A567C5C82eD58747"
);

export default instance;
