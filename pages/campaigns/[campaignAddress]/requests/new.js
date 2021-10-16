import { Button, Typography, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import Campaign from '../../../../ethereum/campaign';
import web3 from '../../../../ethereum/web3';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';

const RequestNew = () => {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [recipient, setRecipient] = useState('');
  const [spinner, setSpinner] = useState(false);
  const router = useRouter();
  const address = router.query.campaignAddress;

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
    <form
      onSubmit={(e) => submitHandler(e)}
      style={{ marginTop: '2rem', padding: '1rem' }}
    >
      <Grid container direction="column" style={{ width: '100%' }}>
        <Typography sx={{ margin: '1rem', marginBottom: '1rem' }} variant="h5">
          Description
        </Typography>
        <TextField
          sx={{ marginLeft: '1rem' }}
          label="Contribution (Ether)"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={false}
          helperText={''}
        />
        <Typography sx={{ margin: '1rem', marginBottom: '1rem' }} variant="h5">
          Value in Ether
        </Typography>
        <TextField
          sx={{ marginLeft: '1rem' }}
          label="Contribution (Ether)"
          variant="outlined"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          error={false}
          helperText={''}
        />
        <Typography sx={{ margin: '1rem', marginBottom: '1rem' }} variant="h5">
          Recipient
        </Typography>
        <TextField
          sx={{ marginLeft: '1rem' }}
          label="Contribution (Ether)"
          variant="outlined"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
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

export default RequestNew;
