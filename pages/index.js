import React from 'react';
import factory from '../ethereum/factory';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import CampaignList from '../components/campaignList';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';

const MainGrid = styled(Grid)(({ theme }) => ({
  padding: '0rem 5rem',
}));

const Headline = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.custom.textWhite,
  width: '100%',
  marginTop: '3rem',
}));

const Divider = styled('div')(({ theme }) => ({
  border: `0.20rem solid ${theme.palette.custom.blueLight} `,
  width: '100%',
  marginTop: '0.4rem',
  marginBottom: '2rem',
  borderRadius: '0.15rem',
  opacity: 0.7,
}));

const Home = ({ summaryList }) => {
  return (
    <MainGrid>
      <Headline variant="h5">Open Campaigns</Headline>
      <Divider />
      <CampaignList summaryList={summaryList} />
    </MainGrid>
  );
};

export default Home;

// Server Side
export async function getStaticProps() {
  const campaignslist = await factory.methods.getDeployedCampaigns().call();
  const summariesArray = await Promise.all(
    Array(parseInt(campaignslist.length))
      .fill()
      .map((element, index) => {
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
