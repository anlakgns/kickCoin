import { Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import CreateCampaignForm from '../../components/createCampaignForm';
import Headline from '../../components/sharedUI/Headline';

const MainGrid = styled(Grid)(({ theme }) => ({
  padding: '0rem 5rem',

  '@media (min-width: 0px) and (max-width: 700px)': {
    marginBottom: '5rem',
    padding: '0rem 3rem',
  },
  '@media (min-width: 700px) and (max-width: 1000px)': {
    marginBottom: '5rem',
    padding: '0rem 3rem',
  },
}));

const CampaignNew = () => {
  return (
    <MainGrid container direction="column">
      <Headline backRouter="true" headlineText="Create a Campaign" />
      <CreateCampaignForm />
    </MainGrid>
  );
};

export default CampaignNew;
