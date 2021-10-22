import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0x4de46c076542931b606506Ea1aA2Eb3496f607aB'
);

export default instance;
