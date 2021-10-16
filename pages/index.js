import React from 'react';
import factory from '../ethereum/factory';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link'

const Home = (props) => {
  const renderCampaigns = props.deployedCampaignsList.map((campaign) => {
    return (
      <Card sx={{ minWidth: 275 }} key={campaign}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="h5" component="div">
            benevolent
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {campaign}
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small"><Link href={`/campaigns/${campaign}`}>View Campaign</Link></Button>
        </CardActions>
      </Card>
    );
  });

  return (
    <div>
      <h3>Open Campaigns</h3>
      {renderCampaigns}
      <Button variant="contained" endIcon={<AddIcon />}>
        Create Campaign
      </Button>
    </div>
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
