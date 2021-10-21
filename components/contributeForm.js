import { Button, Typography, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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

const ContributeForm = () => {
  const [spinner, setSpinner] = useState(false);
  const router = useRouter();
  const address = router.query.campaignAddress;

  const formik = useFormik({
    initialValues: {
      contribution: '',
    },
    validationSchema: Yup.object({
      contribution: Yup.number('Please intert a number')
      .positive('The amount should be positive.')
      .integer(
        'In Wie unit, there is no decimals. Please insert a integer number.'
      )
      .required('Please provide a min contribution amount.'),
    }),
    onSubmit: async (values) => {
      setSpinner(true);

      try {
        const campaign = await Campaign(address);
        const accounts = await web3.eth.getAccounts();

        await campaign.methods.contribute().send({
          from: accounts[0],
          value: web3.utils.toWei(values.contribution, 'ether'),
        });
      } catch (err) {
        console.log(err.message);
      }
      setSpinner(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <InnerFormGrid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item xs={9}>
          <StyledTextField
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.contribution}
            name="contribution"
            error={Boolean(
              formik.touched.contribution && formik.errors.contribution
            )}
            helperText={
              formik.touched.contribution && formik.errors.contribution
                ? formik.errors.contribution
                : ''
            }
            color="secondary"
            label="Contribute in Wei"
            variant="standard"
            inputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ sx: { color: '#05AAE0' } }}
          />
        </Grid>
        <Grid item container justifyContent="flex-end" xs={3}>
          <ContributeButton
            type="submit"
            disabled={spinner}
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
