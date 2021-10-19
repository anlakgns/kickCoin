import { Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import CreateCampaignForm from '../../components/createCampaignForm'

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

const CampaignNew = () => {
  return (
    <MainGrid container direction="column">
      <Headline variant="h5">Create a Campaign</Headline>
      <Divider />
      <CreateCampaignForm/>
    </MainGrid>
  );
};

export default CampaignNew;
