import { Button, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Feedback from './shared/UI/feedback';
import useFormState from './shared/hooks/formStateHook'

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
  const [feedbackState, dispatch, ACTIONS] = useFormState();
  const router = useRouter();
  const address = router.query.campaignAddress;

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
        dispatch({
          type: ACTIONS.ERROR,
          payload:
            "You already contributed this campaign. You can't contribute again for the sake of approval voting system.",
        });

        return;
      }

      // start progress
      dispatch({ type: ACTIONS.START_PROCESS });

      try {
        const campaign = await Campaign(address);
        await campaign.methods.contribute().send({
          from: accounts[0],
          value: web3.utils.toWei(values.contribution, 'ether'),
        });

        dispatch({ type: ACTIONS.SUCCESS });
        formik.values.contribution = '';
        router.replace(`/campaigns/${address}`);
      } catch (err) {
        dispatch({
          type: ACTIONS.ERROR,
          payload: err.message,
        });
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
              disabled={feedbackState.spinner}
              variant="contained"
              endIcon={feedbackState.spinner ? '' : <AddIcon />}
            >
              {feedbackState.spinner ? (
                <CircularProgress color="secondary" />
              ) : (
                'Contribute!'
              )}
            </ContributeButton>
          </ButtonGrid>
        </InnerFormGrid>
      </form>

      <Feedback
        cardType="waiting"
        cardOpen={feedbackState.cardWaiting}
        barOpen={feedbackState.barSuccess}
        setBarOpen={() => dispatch({ type: ACTIONS.BAR_SUCCESS_OPEN })}
        setBarClose={() => dispatch({ type: ACTIONS.BAR_SUCCESS_CLOSE })}
        barContentText="You contribution process has successfully completed."
        barType="success"
      />
      <Feedback
        cardType="error"
        cardOpen={feedbackState.cardError}
        setCardClose={() => dispatch({ type: ACTIONS.CARD_ERROR_CLOSE })}
        cardContentText={feedbackState.cardErrorText}
        barOpen={feedbackState.barError}
        setBarClose={() => dispatch({ type: ACTIONS.BAR_ERROR_CLOSE })}
        setBarOpen={() => dispatch({ type: ACTIONS.BAR_ERROR_OPEN })}
        barContentText="Your contribution process has not completed."
        barType="error"
      />
    </>
  );
};

export default ContributeForm;
