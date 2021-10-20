import React from 'react';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { Button, Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import factory from '../ethereum/factory';
import web3 from '../ethereum/web3';
import CircularProgress from '@mui/material/CircularProgress';
import CampaignCard from './campaignCard';

const MainGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.custom.blueDark,
  borderRadius: '1rem',
  overflow: 'hidden',
  padding: '2rem 5rem',
}));

const Divider = styled('div')(({ theme }) => ({
  border: `0.20rem solid ${theme.palette.custom.blueLight} `,
  width: '100%',
  marginTop: '0.4rem',
  marginBottom: '2rem',
  borderRadius: '0.15rem',
  opacity: 0.7,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  color: theme.palette.custom.blueLight,
  marginBottom: '1rem',
}));

const CreateButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.custom.orange,
  color: theme.palette.custom.textWhite,
  fontWeight: 'bold',
  margin: '1rem',
  marginTop: '2rem',
  margin: 'auto',
  width: '20rem',
}));

const ImageDiv = styled('div')(({ theme }) => ({
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  height: '12rem',
  width: '25rem',
  borderRadius: '1rem',
}));

const SubHeadline = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  marginTop: '2rem',
  fontWeight: 'bold',
  padding: '1rem 0rem',
}));

const CreateCampaignForm = ({ deployedCampaignsList }) => {
  const [minContribution, setMinContribution] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectAim, setProjectAim] = useState('');
  const [financialAim, setFinancialAim] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [spinner, setSpinner] = useState(false);

  const dummyCampaignInfo = {
    minContribution,
    balance: 10,
    projectName,
    projectAim,
    financialAim: 20,
    imageURL:
      imageURL === ''
        ? 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80'
        : imageURL,
  };

  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();

    setSpinner(true);
    try {
      const accounts = await web3.eth.getAccounts();

      // no need to specify gas amount, metamask will do it for us.
      await factory.methods
        .createCampaign(
          minContribution,
          projectName,
          projectAim,
          imageURL,
          financialAim
        )
        .send({
          from: accounts[0],
        });
    } catch (err) {
      console.log(err.message);
    }
    setSpinner(false);
    router.push('/');
  };

  return (
    <MainGrid>
      <form onSubmit={(e) => submitHandler(e)}>
        <Grid item container direction="column">
          <StyledTextField
            color="secondary"
            label="Project Name"
            variant="standard"
            value={projectName}
            inputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ sx: { color: '#05AAE0' } }}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <StyledTextField
            color="secondary"
            label="Budget Goal to Start The Project (Ether)"
            variant="standard"
            value={financialAim}
            inputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ sx: { color: '#05AAE0' } }}
            onChange={(e) => setFinancialAim(e.target.value)}
          />
          <StyledTextField
            color="secondary"
            label="Minimum Contribution (Wei)"
            variant="standard"
            value={minContribution}
            inputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ sx: { color: '#05AAE0' } }}
            onChange={(e) => setMinContribution(e.target.value)}
          />
          <StyledTextField
            color="secondary"
            label="Project Aim"
            variant="standard"
            multiline
            value={projectAim}
            inputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ sx: { color: '#05AAE0' } }}
            onChange={(e) => setProjectAim(e.target.value)}
          />
          <StyledTextField
            color="secondary"
            label="Cover Image URL"
            variant="standard"
            value={imageURL}
            inputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ sx: { color: '#05AAE0' } }}
            onChange={(e) => setImageURL(e.target.value)}
          />
          <Grid item>
            <SubHeadline variant="subtitle1">
              Preview of your campaign
            </SubHeadline>
            <CampaignCard campaingInfo={dummyCampaignInfo} />
          </Grid>

          <CreateButton
            type="submit"
            variant="contained"
            endIcon={spinner ? '' : <AddIcon />}
          >
            {spinner ? <CircularProgress color="primary" /> : 'Create!'}
          </CreateButton>
        </Grid>
      </form>
    </MainGrid>
  );
};

export default CreateCampaignForm;