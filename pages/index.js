import React from 'react';
import factory from '../ethereum/factory';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import CampaignList from '../components/campaignList';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import Headline from '../components/sharedUI/Headline'

const MainGrid = styled(Grid)(({ theme }) => ({
  padding: '0rem 5rem',
  '@media (max-width: 1000px)': {
    padding: '1rem 3rem',
  },
}));

const Home = ({ summaryList }) => {
  return (
    <MainGrid>
      <Headline headlineText="Open Campaigns"/>
      <CampaignList summaryList={summaryList} />
    </MainGrid>
  );
};

export default Home;

// Server Side
export async function getServerSideProps() {
  const campaignslist = await factory.methods.getDeployedCampaigns().call();
  const summariesArray = await Promise.all(
    Array(parseInt(campaignslist.length))
      .fill()
      .map((_, index) => {
        return Campaign(campaignslist[index]).methods.getSummary().call();
      })
  );

  return {
    props: {
      summaryList: summariesArray.map((campaignSummary, index) => {
        return {
          minimumContribution: web3.utils.fromWei(campaignSummary[0], 'ether'),
          balance: web3.utils.fromWei(campaignSummary[1], 'ether'),
          requestsCount: campaignSummary[2],
          supportersCount: campaignSummary[3],
          manager: campaignSummary[4],
          projectName: campaignSummary[5],
          projectAim: campaignSummary[6],
          financialAim: web3.utils.fromWei(campaignSummary[7], 'ether'),
          imageURL: campaignSummary[8],
          address: campaignslist[index],
        };
      }),
    },
  };
}
