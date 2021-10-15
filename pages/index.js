import React from 'react';
import factory from '../ethereum/factory';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

const Home = (props) => {
  const renderCampaings = props.deployedCampaingsList.map((campaing) => {
    return (
      <Card sx={{ minWidth: 275 }} key={campaing}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="h5" component="div">
            benevolent
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    );
  });

  return (
    <div>
      <h3>Open Campaings</h3>
      {renderCampaings}
      <Button variant="contained" endIcon={<AddIcon />}>
        Create Campaing
      </Button>
    </div>
  );
};

export default Home;

// Server Side
export async function getStaticProps() {
  const campaingslist = await factory.methods.getDeployedCampaings().call();

  return {
    props: {
      deployedCampaingsList: campaingslist,
    },
  };
}
