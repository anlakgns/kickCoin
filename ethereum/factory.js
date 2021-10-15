import web3 from './web3';
import CampaingFactory from './build/CampaingFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaingFactory.interface),
  process.env.NEXT_PUBLIC_DEPLOYED_CONTRACT_ADDRESS
);

export default instance;
