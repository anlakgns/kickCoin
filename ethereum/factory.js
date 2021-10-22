import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0xF9C4673dF9Ef6fb50e75a82275FDC0B6CE237120'
);

export default instance;
