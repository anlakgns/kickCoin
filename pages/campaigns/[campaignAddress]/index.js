import Campaign from '../../../ethereum/campaign';
import React from 'react';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import web3 from '../../../ethereum/web3';
import ContributeForm from '../../../components/contributeForm';
import { styled } from '@mui/material/styles';
import OverviewList from '../../../components/overviewList';

const MainGrid = styled(Grid)(({ theme }) => ({
  padding: '0rem 5rem',
}));

const Headline = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.custom.textWhite,
  width: '100%',
  marginTop: '3rem',
}));

const SubHeadline = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.custom.orange,
  width: '100%',
  marginTop: '3rem',
  marginBottom: '1rem',
}));

const Divider = styled('div')(({ theme }) => ({
  border: `0.20rem solid ${theme.palette.custom.blueLight} `,
  width: '100%',
  marginTop: '0.4rem',
  marginBottom: '2rem',
  borderRadius: '0.15rem',
  opacity: 0.7,
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
      <Headline variant="h5">
        {additionalInfo.projectName} - Campaign Overview
      </Headline>
      <Divider />
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
        Contribute{' '}
      </SubHeadline>
      <ContributeForm/>

    </MainGrid>
  );
};

export default CampaignOverview;

export async function getStaticProps(context) {
  const { params } = context;
  const address = params.campaignAddress;
  const summary = await Campaign(address).methods.getSummary().call();
  console.log(summary);
  return {
    props: {
      cardsInfo: {
        minimumContribution: summary[0],
        balance: web3.utils.fromWei(summary[1], 'ether'),
        requestsCount: summary[2],
        supportersCount: summary[3],
        financialAim: summary[7],
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
  return {
    paths: [
      {
        params: {
          campaignAddress: '0xdBc1BFB90e5d7f869C62665d96E2411A9837bA9f',
        },
      },
    ],
    fallback: true,
  };
}

/* 

  <Grid container gap={2} sx={{ marginTop: '2rem' }}>
      <Grid item>
        {Object.keys(props.summary).map((item) => {
          return (
            <Card sx={{ minWidth: 275 }} key={item}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {item}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {props.summary[item]}
                </Typography>
                <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
        <Grid item>
          <Button variant="contained" sx={{ margin: '1rem', width: '50%' }}>
            <Link href={`/campaigns/${props.summary.address}/requests`}>
              View Results
            </Link>
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <ContributeForm address={props.summary.address} />
      </Grid>
    </Grid>
*/
