import React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import web3 from '../ethereum/web3';
import factory from '../ethereum/factory';
import Feedback from './sharedUI/feedback';
import useFormState from './sharedHooks/formStateHook';

const MainGrid = styled(Grid)(({ theme }) => ({
  height: 'auto',
  padding: '1.5rem',
  flex: 1,
  minWidth: '30rem',
  backgroundColor: theme.palette.custom.blueDark,
  borderRadius: '1rem',
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  '@media (max-width: 550px)': {
    minWidth: '25rem',
  },
}));

const SubHeadline = styled(Typography)(({ theme }) => ({
  color: theme.palette.custom.orange,
  fontWeight: 'bold',
  padding: '0rem 1rem',
  paddingBottom: '0.3rem',
  width: '100%',
  overflowWrap: 'anywhere',
}));

const Description = styled(Typography)(({ theme }) => ({
  color: theme.palette.custom.textWhite,
  width: '100%',
  opacity: 0.7,
  padding: '0rem 1rem',
  paddingBottom: '0.4rem',
}));

const StyledLink = styled('span')(({ theme }) => ({
  color: theme.palette.custom.orangeLight,
  fontWeight: 'bold',
  cursor: 'pointer',
}));

const OverviewCard = ({ info, explanation }) => {
  const router = useRouter();
  const address = router.query.campaignAddress;
  const [feedbackState, dispatch, ACTIONS] = useFormState();

  const deleteCampaignCardHandler = () => {
    dispatch({ type: ACTIONS.CARD_QUESTION_OPEN });
  };

  const deleteCampaignCancelButton = () => {
    dispatch({ type: ACTIONS.CARD_QUESTION_CLOSE });
  };

  const deleteCampaignDeleteButton = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      dispatch({ type: ACTIONS.START_DELETE_PROCESS });

      await factory.methods.deleteCampaign(address).send({
        from: accounts[0],
      });
      dispatch({ type: ACTIONS.SUCCESS });
      setTimeout(() => {
        router.push('/');
      }, [2000]);
    } catch (err) {
      dispatch({
        type: ACTIONS.ERROR,
        payload: err.message,
      });
    }
  };

  return (
    <MainGrid item>
      <SubHeadline>
        {info[0]}: {info[1]}
      </SubHeadline>
      <Description align="left" variant="subtitle2">
        {explanation}
        {info[0] === 'requestsCount' ? (
          <StyledLink
            onClick={() => router.push(`/campaigns/${address}/requests`)}
          >
            &nbsp;View Requests
          </StyledLink>
        ) : (
          ''
        )}
        {info[0] === 'manager' ? (
          <StyledLink onClick={() => deleteCampaignCardHandler()}>
            &nbsp;Delete Campaign
          </StyledLink>
        ) : (
          ''
        )}
      </Description>

      {info[0] === 'manager' ? (
        <>
          <Feedback
            cardType="waiting"
            cardOpen={feedbackState.cardWaiting}
            cardHeadline="Deleting Process"
            cardContentText="All amount of ether in this campaign are paying back your supporters and your campaign is deleting permanently. Please wait about 15-30 seconds."
            barOpen={feedbackState.barSuccess}
            setBarOpen={() => dispatch({ type: ACTIONS.BAR_SUCCESS_OPEN })}
            setBarClose={() => dispatch({ type: ACTIONS.BAR_SUCCESS_CLOSE })}
            barContentText="Your campaign has deleted successfully."
            barType="success"
          />

          <Feedback
            cardType="question"
            cardOpen={feedbackState.cardQuestion}
            cardHeadline="Deleting Process"
            deletePermanently={deleteCampaignDeleteButton}
            cardContentText="We will payback all balance in this campaing to your supporters and delete this campaign permanently. Are you sure ?"
            cardCancel={deleteCampaignCancelButton}
          />

          <Feedback
            cardType="error"
            cardOpen={feedbackState.cardError}
            setCardClose={() => dispatch({ type: ACTIONS.CARD_ERROR_CLOSE })}
            cardContentText={feedbackState.cardErrorText}
            barOpen={feedbackState.barError}
            setBarClose={() => dispatch({ type: ACTIONS.BAR_ERROR_CLOSE })}
            setBarOpen={() => dispatch({ type: ACTIONS.BAR_ERROR_OPEN })}
            barContentText="Your campaign has not deleted."
            barType="error"
          />
        </>
      ) : (
        ''
      )}
    </MainGrid>
  );
};

export default OverviewCard;
