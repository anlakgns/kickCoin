import React from 'react';
import factory from '../ethereum/factory';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import CampaignList from '../components/campaignList';

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

const Home = ({deployedCampaignsList}) => {
  return (
    <MainGrid>
      <Headline variant="h5">Open Campaigns</Headline>
      <Divider />
      <CampaignList deployedCampaignsList={deployedCampaignsList} />
    </MainGrid>
  );
};

export default Home;

// Server Side
export async function getStaticProps() {
  const campaignslist = await factory.methods.getDeployedCampaigns().call();

  return {
    props: {
      deployedCampaignsList: campaignslist,
    },
  };
}
