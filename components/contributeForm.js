import { Button, Typography, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  color: theme.palette.custom.blueLight,
  padding: '1rem 0rem',
}));

const InnerFormGrid = styled(Grid)(({ theme }) => ({
  width: '100%',
  color: theme.palette.custom.blueLight,
  marginBottom: '1rem',
  backgroundColor: theme.palette.custom.blueDark,
  borderRadius: '1rem',
  overflow: 'hidden',
  padding: '1rem 3rem',
}));

const ContributeButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.custom.orange,
  color: theme.palette.custom.textWhite,
  fontWeight: 'bold',
  margin: '1rem',
  width: '15rem',
  height: '5rem',
}));

const ContributeForm = ({ address }) => {
  const [contribution, setContribution] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [spinner, setSpinner] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setSpinner(true);

    try {
      const campaign = await Campaign(address);
      const accounts = await web3.eth.getAccounts();

      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(contribution, 'ether'),
      });
    } catch (err) {
      setErrorMessage(err.message);
    }
    setSpinner(false);
    setContribution('');
  };

  return (
    <form onSubmit={(e) => submitHandler(e)}>
      <InnerFormGrid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item xs={9}>
          <StyledTextField
            color="secondary"
            label="Contribute in Wei"
            variant="standard"
            value={contribution}
            inputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ sx: { color: '#05AAE0' } }}
            onChange={(e) => setContribution(e.target.value)}
          />
        </Grid>
        <Grid item container justifyContent="flex-end" xs={3}>
          <ContributeButton
            type="submit"
            variant="contained"
            endIcon={spinner ? '' : <AddIcon />}
          >
            {spinner ? <CircularProgress color="secondary" /> : 'Contribute!'}
          </ContributeButton>
        </Grid>
      </InnerFormGrid>
    </form>
  );
};

export default ContributeForm;
