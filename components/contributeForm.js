import { Button, Typography, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FeedbackCard from './feedbackCard';
import FeedbackBar from './feedbackBar';

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

  // Cards
  const [feedbackCardWaitingOpen, setFeedbackWaitingCardOpen] = useState(false);
  const [feedbackCardErrorOpen, setFeedbackErrorCardOpen] = useState(false);
  const [feedbackCardErrorText, setFeedbackCardErrorText] = useState('');

  // Bars
  const [feedbackBarSuccessOpen, setFeedbackBarSuccessOpen] = useState(false);
  const [feedbackBarErrorOpen, setFeedbackBarErrorOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      contribution: '',
    },
    validationSchema: Yup.object({
      contribution: Yup.number('Please intert a number')
        .positive('The amount should be positive.')
        .required('Please provide a min contribution amount.'),
    }),
    onSubmit: async (values) => {
      setSpinner(true);
      setFeedbackWaitingCardOpen(true);

      try {
        const campaign = await Campaign(address);
        const accounts = await web3.eth.getAccounts();

        await campaign.methods.contribute().send({
          from: accounts[0],
          value: web3.utils.toWei(values.contribution, 'ether'),
        });

        setSpinner(false);
        setFeedbackWaitingCardOpen(false);
        setFeedbackBarSuccessOpen(true);
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
    <>
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
              label="Contribute in Ether"
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
        contentText="Your contribution has completed successfully."
      />
      <FeedbackBar
        type="error"
        open={feedbackBarErrorOpen}
        setOpen={setFeedbackBarErrorOpen}
        contentText="Your contribution has not completed."
      />
    </>
  );
};

export default ContributeForm;
