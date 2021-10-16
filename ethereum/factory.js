import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x6B3514c5aC9F396d5ABe1AF0d4545c9626461800"
);

export default instance;
