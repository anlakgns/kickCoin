import Campaign from '../../../ethereum/campaign';
import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import web3 from '../../../ethereum/web3';
import ContributeForm from '../../../components/contributeForm';
import { styled } from '@mui/material/styles';
import OverviewList from '../../../components/overviewList';
import Headline from '../../../components/shared/UI/headline';

const MainGrid = styled(Grid)(({ theme }) => ({
  padding: '0rem 5rem',
  '@media (min-width: 0px) and (max-width: 1000px)': {
    marginBottom: '5rem',
    padding: '0rem 3rem',
  },
  marginBottom: '5rem',
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
        headlineText={`${additionalInfo?.projectName} - Overview`}
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
  const featuredCampaigns = [
    '0x08d7eA56B700019930fc8903525e319F5a1Fb383',
    '0xFf530DACE13D39559Df1D6Ee144f87f9e9cBE564',
    '0xfa8c11f2bc30378bB2794A0DdDAa9dB66a2BA8ec',
    '0xD79C17D91EfB7020b522E2b8A91d329d5cD61236',
    '0x1C2c7d2c97761170cf6e963F9211355b542b31F4',
    '0x083a15B4Ada7e46F96f937664cF6D09012547889',
    '0xAF6A52C723991EB3Dd9eA0A9A87C3a19694fc511',
    '0x2a932A9431Df9d2D7a6d291989335B57fbF0b225',
  ];

  const paths = featuredCampaigns.map((address) => ({
    params: { campaignAddress: address },
  }));
  return {
    paths,
    fallback: true,
  };
}
