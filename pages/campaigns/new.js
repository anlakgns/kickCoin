import { Button, Typography, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';

const CampaignNew = () => {
  const [minContribution, setMinContribution] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();

    setSpinner(true);
    try {
      const accounts = await web3.eth.getAccounts();

      // no need to specify gas amount, metamask will do it for us.
      await factory.methods.createCampaign(minContribution).send({
        from: accounts[0],
      });
    } catch (err) {
      setErrorMessage(err.message);
    }
    setSpinner(false);
    router.push('/');
  };

  return (
    <form
      onSubmit={(e) => submitHandler(e)}
      style={{ marginTop: '2rem', padding: '1rem' }}
    >
      <Grid container direction="column" style={{ width: '60%' }}>
        <Typography sx={{ margin: '1rem', marginBottom: '1rem' }} variant="h5">
          Create New Campaign
        </Typography>
        <TextField
          sx={{ marginLeft: '1rem' }}
          label="Minimum Contribution (Wei)"
          variant="outlined"
          value={minContribution}
          onChange={(e) => setMinContribution(e.target.value)}
          error={
            errorMessage === '' || minContribution.length === 0 ? false : true
          }
          helperText={minContribution.length === 0 ? '' : errorMessage}
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

export default CampaignNew;
