import { useState } from 'react';
import Button from '@mui/material/Button';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Feedback from './shared/UI/feedback';
import useFormState from './shared/hooks/formStateHook';

const MainGrid = styled(Grid)(({ theme }) => ({
  height: 'auto',
  position: 'relative',

  width: '100%',
  backgroundColor: theme.palette.custom.blueDark,
  borderRadius: '1rem',
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'row',
  '@media (max-width: 660px)': {
    flexDirection: 'column',
  },
}));
const GridButtons = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  width: '10rem',
  backgroundColor: 'red',
  '@media (max-width: 660px)': {
    flexDirection: 'row',
    width: '100%',
  },
}));
const GridItemsContainer = styled(Grid)(({ theme }) => ({
  padding: '2rem',
  flexGrow: 1,
}));
const GridItem = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
}));
const SubHeadline = styled(Typography)(({ theme }) => ({
  color: theme.palette.custom.orange,
  fontWeight: 'bold',
  padding: '0rem 1rem',
  paddingBottom: '0.3rem',
  width: '100%',
}));
const Description = styled(Typography)(({ theme }) => ({
  color: theme.palette.custom.textWhite,
  width: '100%',
  opacity: 0.7,
  padding: '0rem 1rem',
  paddingBottom: '0.4rem',
  fontSize: '0.8rem',
  '@media (max-width: 600px)': {
    fontSize: '1rem',
  },
}));
const ApproveButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.custom.orange,
  color: theme.palette.custom.textWhite,
  textTransform: 'none',
  padding: '0.5rem 1rem',
  width: '100%',
  height: '100%',
  borderRadius: '0rem',
}));
const RequestFinalized = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: theme.palette.custom.green,
  fontSize: '4rem',
  '@media (max-width: 660px)': {
    fontSize: '3rem',
  },
}));
const RequestDeleted = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: theme.palette.custom.red,
  fontSize: '4rem',
  '@media (max-width: 660px)': {
    fontSize: '3rem',
  },
}));
const FinalizeButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.custom.green,
  color: theme.palette.custom.textWhite,
  textTransform: 'none',
  padding: '0.5rem 1rem',
  width: '100%',
  height: '100%',
  borderRadius: '0rem',
}));
const DeleteButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.custom.red,
  color: theme.palette.custom.textWhite,
  textTransform: 'none',
  padding: '0.5rem 1rem',
  width: '100%',
  height: '100%',
  borderRadius: '0rem',
}));

const RequestCard = ({ request, id, address, supportersCount, isManager }) => {
  // The request status can be : pending, deleted or finalized
  const [feedbackState, dispatch, ACTIONS] = useFormState();

  // Many same thing checks in every handler such as getting accounts everytime. This may looks against DRY but because of metamask extension account changebility, this is must. (Some dublication can be reduced by common functions)
  // not: with metamask mask user can change account and page not render, it causes UX issues.

  const router = useRouter();
  const [feedbackHandlerType, setFeedbackHandlerType] = useState();

  const approveHandler = async () => {
    const accounts = await web3.eth.getAccounts();
    const campaign = await Campaign(address);
    const isSupporter = await campaign.methods.supporters(accounts[0]).call();
    const isApproved = await campaign.methods
      .isApproved(accounts[0], id)
      .call();

    // isSupporter Check
    if (!isSupporter) {
      dispatch({
        type: ACTIONS.ERROR,
        payload:
          "You are not a supporter of this campaign. You can' vote for this request. Please make a contribution to make this action.",
      });
      return;
    }

    // Double approve check
    if (isApproved) {
      dispatch({
        type: ACTIONS.ERROR,
        payload:
          "You are already approved this request. You can't approve a request more than once.",
      });
      return;
    }

    // isDelete or isFinalized Check
    if (request.status !== 'pending') {
      dispatch({
        type: ACTIONS.ERROR,
        payload:
          "You can't vote an inactive request. This campaign was deleted or finalized.",
      });
      return;
    }

    // start progress
    dispatch({ type: ACTIONS.START_PROCESS });
    setFeedbackHandlerType('approval process');

    try {
      const campaign = Campaign(address);
      await campaign.methods.approveRequest(id).send({
        from: accounts[0],
      });

      dispatch({ type: ACTIONS.SUCCESS });
      router.replace(`/campaigns/${address}/requests`);
    } catch (err) {
      dispatch({
        type: ACTIONS.ERROR,
        payload: err.message,
      });
    }
  };

  const finalizeHandler = async () => {
    const accounts = await web3.eth.getAccounts();

    // approval threshold check
    const isEnoughRate = request.approvalCount > supportersCount / 2;
    const isFinalizable = isEnoughRate && supportersCount != 0;
    if (!isFinalizable) {
      dispatch({
        type: ACTIONS.ERROR,
        payload:
          'Not enough approral rate. The campaign needs to have more than 50% approval rate to finalize request.',
      });
      return;
    }

    // isManager check
    if (!isManager) {
      dispatch({
        type: ACTIONS.ERROR,
        payload: 'Only the manager can finalize this request.',
      });
      return;
    }

    // Already complete check
    if (request.complete) {
      dispatch({
        type: ACTIONS.ERROR,
        payload: 'This request is already finalized',
      });
      return;
    }

    // start progress
    dispatch({ type: ACTIONS.START_PROCESS });
    setFeedbackHandlerType('finalize process');
    try {
      const campaign = Campaign(address);
      await campaign.methods.finalizeRequest(id).send({
        from: accounts[0],
      });

      dispatch({ type: ACTIONS.SUCCESS });
      router.replace(`/campaigns/${address}/requests`);
    } catch (err) {
      dispatch({
        type: ACTIONS.ERROR,
        payload: err.message,
      });
    }
  };

  const deleteHandler = async () => {
    dispatch({ type: ACTIONS.CARD_QUESTION_CLOSE });
    const accounts = await web3.eth.getAccounts();

    // isManager check
    if (!isManager) {
      dispatch({
        type: ACTIONS.ERROR,
        payload: 'Only the manager can delete this request.',
      });
      return;
    }

    // double delete check
    if (request.status === 'deleted') {
      dispatch({
        type: ACTIONS.ERROR,
        payload: 'This request is already deleted.',
      });
      return;
    }

    // start progress
    dispatch({ type: ACTIONS.START_PROCESS });
    setFeedbackHandlerType('deleting process');
    try {
      const campaign = Campaign(address);
      await campaign.methods.deleteRequest(id).send({
        from: accounts[0],
      });

      dispatch({ type: ACTIONS.SUCCESS });
      router.replace(`/campaigns/${address}/requests`);
    } catch (err) {
      dispatch({
        type: ACTIONS.ERROR,
        payload: err.message,
      });
    }
  };

  return (
    <>
      <MainGrid>
        {request.status === 'finalized' ? (
          <RequestFinalized>Finalized</RequestFinalized>
        ) : (
          ''
        )}
        {request.status === 'deleted' ? (
          <RequestDeleted>Deleted</RequestDeleted>
        ) : (
          ''
        )}
        <GridItemsContainer
          sx={{
            opacity: request.status === 'pending' ? 1 : 0.2,
          }}
        >
          <GridItem>
            <SubHeadline align="left">ID</SubHeadline>
            <Description align="right">{id}</Description>
          </GridItem>

          <GridItem>
            <SubHeadline align="left">Description</SubHeadline>
            <Description align="right">{request.description}</Description>
          </GridItem>

          <GridItem>
            <SubHeadline align="left">Amount</SubHeadline>
            <Description align="right">
              {web3.utils.fromWei(request.value, 'ether')} Ether
            </Description>
          </GridItem>

          <GridItem>
            <SubHeadline align="left">Recipient</SubHeadline>
            <Description align="right">
              {request.recipient.substr(0, 15)}...
            </Description>
          </GridItem>

          <GridItem>
            <SubHeadline align="left">Approval Count</SubHeadline>
            <Description align="right">
              {request.approvalCount}/{supportersCount}
            </Description>
          </GridItem>
        </GridItemsContainer>

        <GridButtons
          sx={{
            opacity: request.status === 'pending' ? 1 : 0.2,
          }}
        >
          <ApproveButton
            disabled={request.status !== 'pending'}
            onClick={approveHandler}
          >
            Approve
          </ApproveButton>
          <FinalizeButton
            disabled={request.status !== 'pending'}
            onClick={finalizeHandler}
          >
            Finalize
          </FinalizeButton>
          <DeleteButton
            disabled={request.status !== 'pending'}
            onClick={() => dispatch({ type: ACTIONS.CARD_QUESTION_OPEN })}
          >
            Delete
          </DeleteButton>
        </GridButtons>
      </MainGrid>

      <Feedback
        cardType="waiting"
        cardOpen={feedbackState.cardWaiting}
        barOpen={feedbackState.barSuccess}
        setBarOpen={() => dispatch({ type: ACTIONS.BAR_SUCCESS_OPEN })}
        setBarClose={() => dispatch({ type: ACTIONS.BAR_SUCCESS_CLOSE })}
        barContentText={`Your ${feedbackHandlerType} has created successfull`}
        barType="success"
      />

      <Feedback
        cardType="question"
        cardOpen={feedbackState.cardQuestion}
        cardHeadline="Deleting Process"
        deletePermanently={deleteHandler}
        cardContentText="We will payback all balance in this campaing to your supporters and delete this campaign permanently. Are you sure ?"
        cardCancel={() => dispatch({ type: ACTIONS.CARD_QUESTION_CLOSE })}
      />

      <Feedback
        cardType="error"
        cardOpen={feedbackState.cardError}
        setCardClose={() => dispatch({ type: ACTIONS.CARD_ERROR_CLOSE })}
        cardContentText={feedbackState.cardErrorText}
      />
    </>
  );
};

export default RequestCard;
