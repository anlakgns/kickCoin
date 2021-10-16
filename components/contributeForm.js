import { Button, Typography, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';

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
    <form
      onSubmit={(e) => submitHandler(e)}
      style={{ marginTop: '2rem', padding: '1rem' }}
    >
      <Grid container direction="column" style={{ width: '100%' }}>
        <Typography sx={{ margin: '1rem', marginBottom: '1rem' }} variant="h5">
          Amount to Contribute
        </Typography>
        <TextField
          sx={{ marginLeft: '1rem' }}
          label="Contribution (Ether)"
          variant="outlined"
          value={contribution}
          onChange={(e) => setContribution(e.target.value)}
          error={false}
          helperText={''}
        />
        <Button
          type="submit"
          variant="contained"
          endIcon={spinner ? '' : <AddIcon />}
          sx={{ margin: '1rem', width: '50%' }}
        >
          {spinner ? <CircularProgress color="secondary" /> : 'Create!'}
        </Button>
      </Grid>
    </form>
  );
};

export default ContributeForm;
