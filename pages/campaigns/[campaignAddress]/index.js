import Campaign from '../../../ethereum/campaign';
import React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Link from 'next/link';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import web3 from '../../../ethereum/web3';
import ContributeForm from '../../../components/contributeForm';

const CampaignShow = (props) => {
  return (
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
  );
};

export default CampaignShow;

export async function getStaticProps(context) {
  const { params } = context;
  const address = params.campaignAddress;
  const summary = await Campaign(address).methods.getSummary().call();
  console.log(summary);
  return {
    props: {
      summary: {
        minimumContribution: summary[0],
        balance: web3.utils.fromWei(summary[1], 'ether'),
        requestsCount: summary[2],
        supportersCount: summary[3],
        manager: summary[4],
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
