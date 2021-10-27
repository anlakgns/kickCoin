import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { Button, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import web3 from '../ethereum/web3';
import CircularProgress from '@mui/material/CircularProgress';
import Campaign from '../ethereum/campaign';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Feedback from './shared/UI/feedback';
import useFormState from './shared/hooks/formStateHook';

const MainGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.custom.blueDark,
  borderRadius: '1rem',
  overflow: 'hidden',
  padding: '2rem 5rem',
  '@media (min-width: 0px) and (max-width: 700px)': {
    padding: '2rem 2rem',
  },
  '@media (min-width: 700px) and (max-width: 1000px)': {
    marginBottom: '5rem',
    padding: '2rem 3rem',
  },
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

const CreateRequestForm = ({ balance, manager, requestsBalance }) => {
  const router = useRouter();
  const address = router.query.campaignAddress;
  const [feedbackState, dispatch, ACTIONS] = useFormState();

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
      const accounts = await web3.eth.getAccounts();
      const isManager = accounts[0] === manager;
      if (!isManager) {
        dispatch({
          type: ACTIONS.ERROR,
          payload: 'Only the manager can make a request.',
        });
        router.push(`/campaigns/${address}/requests`);
        return;
      }
      // enough balance check
      const enoughBalanceCheck =
        parseFloat(values.value) + parseFloat(requestsBalance) <=
        parseFloat(balance);
      console.log(enoughBalanceCheck);
      if (!enoughBalanceCheck) {
        dispatch({
          type: ACTIONS.ERROR,
          payload: `You don't have enough balance to make this request. You can request maximum ${
            balance - requestsBalance >= 0
              ? (balance - requestsBalance).toFixed(5)
              : 0
          } ether for now unless you have more contributors. `,
        });

        return;
      }

      // start progress
      dispatch({ type: ACTIONS.START_PROCESS });

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
        dispatch({ type: ACTIONS.SUCCESS });
        router.push(`/campaigns/${address}/requests`);
      } catch (err) {
        dispatch({
          type: ACTIONS.ERROR,
          payload: err.message,
        });
      }
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
            endIcon={feedbackState.spinner ? '' : <AddIcon />}
          >
            {feedbackState.spinner ? (
              <CircularProgress color="secondary" />
            ) : (
              'Create!'
            )}
          </CreateButton>
        </Grid>
      </form>

      <Feedback
        cardType="waiting"
        cardOpen={feedbackState.cardWaiting}
        barType="success"
        barOpen={feedbackState.barSuccess}
        setBarOpen={() => dispatch({ type: ACTIONS.BAR_SUCCESS_OPEN })}
        setBarClose={() => dispatch({ type: ACTIONS.BAR_SUCCESS_CLOSE })}
        barContentText="Your request has created successfully."
      />
      <Feedback
        cardType="error"
        cardOpen={feedbackState.cardError}
        setCardClose={() => dispatch({ type: ACTIONS.CARD_ERROR_CLOSE })}
        cardContentText={feedbackState.cardErrorText}
      />
    </MainGrid>
  );
};

export default CreateRequestForm;
