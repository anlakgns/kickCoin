import { useState, useEffect } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import { styled } from '@mui/material/styles';
import FeedbackCard from './feedbackCard';
import FeedbackBar from './feedbackBar';
import { useRouter } from 'next/router';

const MainGrid = styled(Grid)(({ theme }) => ({
  backgroundImage: `linear-gradient(to bottom, ${theme.palette.custom.gradient1}, ${theme.palette.custom.gradient2})`,
  borderRadius: '1rem',
  minHeight: '12rem',
}));

const FinalizeApproveButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.custom.green,
  color: theme.palette.custom.textWhite,
  textTransform: 'none',
  padding: '0.5rem 1rem',
}));

const RequestRow = ({ request, id, address, supportersCount, isManager }) => {
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

  // Showing error bar after error card closed.
  useEffect(() => {
    if (Boolean(feedbackCardErrorText) && !feedbackCardErrorOpen) {
      setFeedbackBarErrorOpen(true);
    }
  }, [feedbackCardErrorText, feedbackCardErrorOpen]);

  return (
    <>
      <MainGrid>
        
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

export default RequestRow;
