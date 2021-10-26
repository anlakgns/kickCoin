import Campaign from '../../../ethereum/campaign';
import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import web3 from '../../../ethereum/web3';
import ContributeForm from '../../../components/contributeForm';
import { styled } from '@mui/material/styles';
import OverviewList from '../../../components/overviewList';
import Headline from '../../../components/sharedUI/Headline';

const MainGrid = styled(Grid)(({ theme }) => ({
  padding: '0rem 5rem',
  '@media (min-width: 0px) and (max-width: 1000px)': {
    marginBottom: '5rem',
    padding: '0rem 3rem',
  },
}));
const SubHeadline = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.custom.blueLight,
  width: '100%',
  marginTop: '3rem',
  marginBottom: '1rem',
}));
const About = styled(Typography)(({ theme }) => ({
  color: theme.palette.custom.textWhite,
  width: '100%',
  opacity: 0.7,
  marginTop: '1rem',
  marginBottom: '2rem',
}));
const AboutGrid = styled(Grid)(({ theme }) => ({
  marginTop: '2rem',
}));

const CampaignOverview = ({ cardsInfo, additionalInfo }) => {
  return (
    <MainGrid>
      <Headline
        headlineText={`${additionalInfo?.projectName} Campaign Overview`}
        backRouter="true"
      />
      <AboutGrid>
        <SubHeadline align="left" variant="subtitle1">
          About{' '}
        </SubHeadline>
        <About align="left" variant="subtitle2">
          This project is developed in order to meet the basic needs of african
          people by making the water available for as many as people we can
        </About>
      </AboutGrid>
      <SubHeadline align="left" variant="subtitle1">
        Overview{' '}
      </SubHeadline>
      <OverviewList cardsInfo={cardsInfo} />
      <SubHeadline align="left" variant="subtitle1">
        Contribute Our Campaign{' '}
      </SubHeadline>
      <ContributeForm minContribution={cardsInfo?.minimumContribution} />
    </MainGrid>
  );
};

export default CampaignOverview;

export async function getStaticProps(context) {
  const { params } = context;
  const address = params.campaignAddress;
  const campaign = Campaign(address);
  const summary = await campaign.methods.getSummary().call();

  return {
    props: {
      cardsInfo: {
        minimumContribution: web3.utils.fromWei(summary[0], 'ether'),
        balance: web3.utils.fromWei(summary[1], 'ether'),
        requestsCount: summary[2],
        supportersCount: summary[3],
        financialAim: web3.utils.fromWei(summary[7], 'ether'),
        manager: summary[4],
      },
      additionalInfo: {
        projectAim: summary[6],
        projectName: summary[5],
        address: address,
      },
    },
  };
}

export async function getStaticPaths() {
  // This can be improved by selecting some featured campaigns or highest funded campaigns.
  //  But for now just server side render all the campaign below is a fake.
  return {
    paths: [
      {
        params: {
          campaignAddress: '0x08409F55Cb6aF037733c0FE180919e49D0AF4f62',
        },
      },
    ],
    fallback: true,
  };
}
