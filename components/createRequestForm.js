import React, { useEffect } from 'react';
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
import FeedbackCard from './feedbackCard';
import FeedbackBar from './feedbackBar';

const MainGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.custom.blueDark,
  borderRadius: '1rem',
  overflow: 'hidden',
  padding: '2rem 5rem',
  "@media (min-width: 0px) and (max-width: 700px)": {
    padding: "2rem 2rem"
  },
  '@media (min-width: 700px) and (max-width: 1000px)': {
    marginBottom: '5rem',
    padding: "2rem 3rem",
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
  const [spinner, setSpinner] = useState(false);
  const router = useRouter();
  const address = router.query.campaignAddress;

  // Cards
  const [feedbackCardWaitingOpen, setFeedbackWaitingCardOpen] = useState(false);
  const [feedbackCardErrorOpen, setFeedbackErrorCardOpen] = useState(false);
  const [feedbackCardErrorText, setFeedbackCardErrorText] = useState('');

  // Bars
  const [feedbackBarSuccessOpen, setFeedbackBarSuccessOpen] = useState(false);
  const [feedbackBarErrorOpen, setFeedbackBarErrorOpen] = useState(false);

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
        setFeedbackCardErrorText('Only the manager can make a request.')
        setFeedbackErrorCardOpen(true)
        router.push(`/campaigns/${address}/requests`)
        return;
      }
      // enough balance check
      const enoughBalanceCheck =
        parseFloat(values.value) + parseFloat(requestsBalance) <=
        parseFloat(balance);
      console.log(enoughBalanceCheck);
      if (!enoughBalanceCheck) {
        setFeedbackCardErrorText(
          `You don't have enough balance to make this request. You can request maximum ${
            (balance - requestsBalance) >= 0 ? (balance - requestsBalance).toFixed(5) : 0
          } ether for now unless you have more contributors. `
        );
        setFeedbackErrorCardOpen(true);
        return;
      }

      // start process
      setSpinner(true);
      setFeedbackWaitingCardOpen(true);

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
        setSpinner(false);
        setFeedbackWaitingCardOpen(false);
        setFeedbackBarSuccessOpen(true);
        router.push(`/campaigns/${address}/requests`);
      } catch (err) {
        setSpinner(false);
        setFeedbackWaitingCardOpen(false);
        setFeedbackErrorCardOpen(true);
        setFeedbackCardErrorText(err.message);
      }
    },
  });

  // Showing error bar after error card closed.
  useEffect(() => {
    if (Boolean(feedbackCardErrorText) && !feedbackCardErrorOpen) {
      setFeedbackBarErrorOpen(true);
    }
  }, [feedbackCardErrorText, feedbackCardErrorOpen]);

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
      <FeedbackCard
        type="waiting"
        open={feedbackCardWaitingOpen}
        setOpen={setFeedbackWaitingCardOpen}
        headline="Validation Process"
        contentText="Every attempt to change in ethereum network needs to validated by miners. This process takes 15-30 seconds in ethereum network. Please be patient and wait we will feedback you when the process is done. "
      />
      <FeedbackCard
        type="error"
        open={feedbackCardErrorOpen}
        setOpen={setFeedbackErrorCardOpen}
        headline="Something went wrong"
        contentText={feedbackCardErrorText}
      />
      <FeedbackBar
        type="success"
        open={feedbackBarSuccessOpen}
        setOpen={setFeedbackBarSuccessOpen}
        contentText="Your request has created successfully."
      />
      <FeedbackBar
        type="error"
        open={feedbackBarErrorOpen}
        setOpen={setFeedbackBarErrorOpen}
        contentText="Your request has not created."
      />
    </MainGrid>
  );
};

export default CreateRequestForm;
