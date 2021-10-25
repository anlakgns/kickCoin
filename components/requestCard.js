import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import { styled } from '@mui/material/styles';
import FeedbackCard from './feedbackCard';
import FeedbackBar from './feedbackBar';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

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
}));

const GridButtons = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  width: '10rem',
  backgroundColor: 'red',
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
  zIndex: 2000,
  transform: 'translate(-50%, -50%)',
  color: theme.palette.custom.green,
  fontSize: '4rem',
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
  const router = useRouter();

  // Cards
  const [feedbackCardWaitingOpen, setFeedbackWaitingCardOpen] = useState(false);
  const [feedbackCardErrorOpen, setFeedbackErrorCardOpen] = useState(false);
  const [feedbackCardErrorText, setFeedbackCardErrorText] = useState('');

  // Bars
  const [feedbackBarSuccessOpen, setFeedbackBarSuccessOpen] = useState(false);
  const [feedbackBarErrorOpen, setFeedbackBarErrorOpen] = useState(false);
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
      setFeedbackCardErrorText(
        "You are not a supporter of this campaign. You can' vote for this request. Please make a contribution to make this action."
      );
      setFeedbackErrorCardOpen(true);
      return;
    }

    // Double approve check
    if (isApproved) {
      setFeedbackCardErrorText(
        "You are already approved this request. You can't approve a request more than once."
      );
      setFeedbackErrorCardOpen(true);
      return;
    }

    setFeedbackWaitingCardOpen(true);
    try {
      const campaign = Campaign(address);
      await campaign.methods.approveRequest(id).send({
        from: accounts[0],
      });

      setFeedbackWaitingCardOpen(false);
      setFeedbackHandlerType('approval process');
      setFeedbackBarSuccessOpen(true);
      router.replace(`/campaigns/${address}/requests`);
    } catch (err) {
      setFeedbackWaitingCardOpen(false);
      setFeedbackErrorCardOpen(true);
      setFeedbackHandlerType('aproval process');
      setFeedbackCardErrorText(err.message);
    }
  };

  const finalizeHandler = async () => {
    const accounts = await web3.eth.getAccounts();

    // approval threshold check
    const isEnoughRate = request.approvalCount > supportersCount / 2;
    console.log(isEnoughRate);
    const isFinalizable = isEnoughRate && supportersCount != 0;
    if (!isFinalizable) {
      setFeedbackCardErrorText(
        'Not enough approral rate. The campaign needs to have more than 50% approval rate to finalize request.'
      );
      setFeedbackErrorCardOpen(true);
      return;
    }

    // isManager check
    if (!isManager) {
      setFeedbackCardErrorText('Only the manager can finalize this request.');
      setFeedbackErrorCardOpen(true);
      return;
    }

    // Already complete check
    if (request.complete) {
      setFeedbackCardErrorText('This request is already finalized');
      setFeedbackErrorCardOpen(true);
      return;
    }

    setFeedbackWaitingCardOpen(true);
    try {
      const campaign = Campaign(address);
      await campaign.methods.finalizeRequest(id).send({
        from: accounts[0],
      });

      setFeedbackWaitingCardOpen(false);
      setFeedbackHandlerType('finalize process');
      setFeedbackBarSuccessOpen(true);
    } catch (err) {
      setFeedbackWaitingCardOpen(false);
      setFeedbackErrorCardOpen(true);
      setFeedbackHandlerType('finalize process');
      setFeedbackCardErrorText(err.message);
    }
  };

  const deleteHandler = async () => {}

  // Showing error bar after error card closed.
  useEffect(() => {
    if (Boolean(feedbackCardErrorText) && !feedbackCardErrorOpen) {
      setFeedbackBarErrorOpen(true);
    }
  }, [feedbackCardErrorText, feedbackCardErrorOpen]);

  return (
    <>
      <MainGrid>
        <RequestFinalized>Finalized</RequestFinalized>
        <GridItemsContainer sx={{ opacity: request.complete ? '0.3' : 1 }}>
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
            <Description align="right">{request.recipient}</Description>
          </GridItem>

          <GridItem>
            <SubHeadline align="left">Approval Count</SubHeadline>
            <Description align="right">
              {request.approvalCount}/{supportersCount}
            </Description>
          </GridItem>
        </GridItemsContainer>

        <GridButtons sx={{ opacity: request.complete ? '0.3' : 1 }}>
          <ApproveButton disabled={request.complete} onClick={approveHandler}>
            Approve
          </ApproveButton>
          <FinalizeButton disabled={request.complete} onClick={finalizeHandler}>
            Finalize
          </FinalizeButton>
          <DeleteButton disabled={request.complete} onClick={deleteHandler}>
            Delete
          </DeleteButton>
        </GridButtons>
      </MainGrid>
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
        contentText={`Your ${feedbackHandlerType} has created successfull`}
      />
      <FeedbackBar
        type="error"
        open={feedbackBarErrorOpen}
        setOpen={setFeedbackBarErrorOpen}
        contentText={`Your ${feedbackHandlerType} has not created`}
      />
    </>
  );
};

export default RequestCard;
