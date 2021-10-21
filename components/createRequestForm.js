import React from 'react';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { Button, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import web3 from '../ethereum/web3';
import CircularProgress from '@mui/material/CircularProgress';
import Campaign from '../ethereum/campaign';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const MainGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.custom.blueDark,
  borderRadius: '1rem',
  overflow: 'hidden',
  padding: '2rem 5rem',
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

const CreateRequestForm = () => {
  const [spinner, setSpinner] = useState(false);
  const router = useRouter();
  const address = router.query.campaignAddress;

  const formik = useFormik({
    initialValues: {
      description: '',
      value: '',
      recipient: '',
    },
    validationSchema: Yup.object({
      description: Yup.string().required(),
      value: Yup.number('Please intert a number')
        .positive('The amount should be positive.')
        .required('Please provide a min contribution amount.'),
    }),
    onSubmit: async (values) => {
      setSpinner(true);

      try {
        const campaign = await Campaign(address);
        const accounts = await web3.eth.getAccounts();

        await campaign.methods
          .createRequest(
            values.description,
            web3.utils.toWei(values.value, 'ether'),
            values.recipient
          )
          .send({
            from: accounts[0],
          });
        router.push(`/campaigns/${address}/requests`);
      } catch (err) {
        setErrorMessage(err.message);
      }
      setSpinner(false);
    },
  });

  return (
    <MainGrid>
      <form onSubmit={formik.handleSubmit}>
        <Grid item container direction="column">
          <StyledTextField
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            name="description"
            error={Boolean(
              formik.touched.description && formik.errors.description
            )}
            helperText={
              formik.touched.description && formik.errors.description
                ? formik.errors.description
                : ''
            }
            color="secondary"
            label="Description"
            variant="standard"
            inputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ sx: { color: '#05AAE0' } }}
          />
          <StyledTextField
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.value}
            name="value"
            error={Boolean(formik.touched.value && formik.errors.value)}
            helperText={
              formik.touched.value && formik.errors.value
                ? formik.errors.value
                : ''
            }
            color="secondary"
            label="Value in Ether"
            variant="standard"
            inputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ sx: { color: '#05AAE0' } }}
          />
          <StyledTextField
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.recipient}
            name="recipient"
            error={Boolean(formik.touched.recipient && formik.errors.recipient)}
            helperText={
              formik.touched.recipient && formik.errors.recipient
                ? formik.errors.recipient
                : ''
            }
            color="secondary"
            label="Recipient"
            variant="standard"
            inputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ sx: { color: '#05AAE0' } }}
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
