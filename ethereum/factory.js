import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0x1122D2Bad078f412685C3E99f128EfcF12E8d262'
);

export default instance;
