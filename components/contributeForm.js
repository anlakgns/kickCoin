import { Button, Grid } from '@mui/material';
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
import Feedback from './feedback';

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

  display: 'flex',
  gap: '1rem',
  '@media (max-width: 600px)': {
    flexDirection: 'column',
  },
}));
const InputGrid = styled(Grid)(() => ({
  flex: 10,
  '@media (max-width: 600px)': {
    flex: 1,
    flexGrow: 1,
  },
}));
const ButtonGrid = styled(Grid)(() => ({
  flex: 1,
}));
const ContributeButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.custom.orange,
  color: theme.palette.custom.textWhite,
  fontWeight: 'bold',
  margin: '1rem',
  width: '100%',
  height: '5rem',
  padding: 0,
  '@media (max-width: 600px)': {
    margin: '0rem',
    height: '3rem',
    marginBottom: '2rem',
  },
}));

const ContributeForm = ({ minContribution }) => {
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
        .moreThan(
          +minContribution,
          'Please provide more than minimum contribution amount.'
        )
        .required('Please provide a min contribution amount.'),
    }),
    onSubmit: async (values) => {
      // isSupporter Check
      const accounts = await web3.eth.getAccounts();
      const campaign = await Campaign(address);
      const isSupporter = await campaign.methods.supporters(accounts[0]).call();
      if (isSupporter) {
        setFeedbackCardErrorText(
          "You already contributed this campaign. You can't contribute again for the sake of approval voting system."
        );
        setFeedbackErrorCardOpen(true);
        return;
      }

      // start progress
      setSpinner(true);
      setFeedbackWaitingCardOpen(true);

      try {
        const campaign = await Campaign(address);
        await campaign.methods.contribute().send({
          from: accounts[0],
          value: web3.utils.toWei(values.contribution, 'ether'),
        });

        setSpinner(false);
        setFeedbackWaitingCardOpen(false);
        setFeedbackBarSuccessOpen(true);
        formik.values.contribution = '';
        router.replace(`/campaigns/${address}`);
      } catch (err) {
        setSpinner(false);
        setFeedbackWaitingCardOpen(false);
        setFeedbackErrorCardOpen(true);
        setFeedbackCardErrorText(err.message);
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <InnerFormGrid>
          <InputGrid>
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
          </InputGrid>
          <ButtonGrid>
            <ContributeButton
              type="submit"
              disabled={spinner}
              variant="contained"
              endIcon={spinner ? '' : <AddIcon />}
            >
              {spinner ? <CircularProgress color="secondary" /> : 'Contribute!'}
            </ContributeButton>
          </ButtonGrid>
        </InnerFormGrid>
      </form>

      <Feedback
        cardType="waiting"
        cardOpen={feedbackCardWaitingOpen}
        barOpen={feedbackBarSuccessOpen}
        setBarOpen={setFeedbackBarSuccessOpen}
        barContentText="You contribution process has successfully completed."
        barType="success"
      />
      <Feedback
        cardType="error"
        cardOpen={feedbackCardErrorOpen}
        setCardOpen={setFeedbackErrorCardOpen}
        cardContentText={feedbackCardErrorText}
        barOpen={feedbackBarErrorOpen}
        setBarOpen={setFeedbackBarErrorOpen}
        barContentText="Your contribution process has not completed."
        barType="error"
      />
    </>
  );
};

export default ContributeForm;
