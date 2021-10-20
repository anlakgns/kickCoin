import React from 'react';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { Button, Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import web3 from '../ethereum/web3';
import CircularProgress from '@mui/material/CircularProgress';
import Campaign from '../ethereum/campaign';

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

const CreateRequestForm = ({ deployedCampaignsList }) => {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [recipient, setRecipient] = useState('');
  const [spinner, setSpinner] = useState(false);

  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    setSpinner(true);

    try {
      const campaign = await Campaign(address);
      const accounts = await web3.eth.getAccounts();

      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
        .send({
          from: accounts[0],
        });
      router.push(`/campaigns/${address}/requests`);
    } catch (err) {
      setErrorMessage(err.message);
    }
    setSpinner(false);
  };

  return (
    <MainGrid>
      <form onSubmit={(e) => submitHandler(e)}>
        <Grid item container direction="column">
          <StyledTextField
            color="secondary"
            label="Description"
            variant="standard"
            value={description}
            inputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ sx: { color: '#05AAE0' } }}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <StyledTextField
            color="secondary"
            label="Value in Ether"
            variant="standard"
            value={value}
            inputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ sx: { color: '#05AAE0' } }}
            onChange={(e) => setFinancialAim(e.target.value)}
          />
          <StyledTextField
            color="secondary"
            label="Recipient"
            variant="standard"
            value={recipient}
            inputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ sx: { color: '#05AAE0' } }}
            onChange={(e) => setMinContribution(e.target.value)}
          />

          <CreateButton
            type="submit"
            variant="contained"
            endIcon={spinner ? '' : <AddIcon />}
          >
            {spinner ? <CircularProgress color="secondary" /> : 'Create!'}
          </CreateButton>
        </Grid>
      </form>
    </MainGrid>
  );
};

export default CreateRequestForm;
