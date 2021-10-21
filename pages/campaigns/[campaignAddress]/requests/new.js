import { Button, Typography, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import Campaign from '../../../../ethereum/campaign';
import web3 from '../../../../ethereum/web3';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';
import CreateRequestForm from '../../../../components/createRequestForm';
import { styled } from '@mui/material/styles';

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

const RequestNew = () => {
  return (
    <MainGrid>
      <Headline variant="h5">Create a Request</Headline>
      <Divider />
      <CreateRequestForm />
    </MainGrid>
  );
};

export default RequestNew;

/*

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

*/
