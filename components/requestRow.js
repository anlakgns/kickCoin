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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.custom.textWhite,
}));

const FinalizeApproveButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.custom.green,
  color: theme.palette.custom.textWhite,
  textTransform: 'none',
  padding: '0.5rem 1rem',
}));

const RequestRow = ({ request, id, address, supportersCount }) => {
  // Cards
  const [feedbackCardWaitingOpen, setFeedbackWaitingCardOpen] = useState(false);
  const [feedbackCardErrorOpen, setFeedbackErrorCardOpen] = useState(false);
  const [feedbackCardErrorText, setFeedbackCardErrorText] = useState('');

  // Bars
  const [feedbackBarSuccessOpen, setFeedbackBarSuccessOpen] = useState(false);
  const [feedbackBarErrorOpen, setFeedbackBarErrorOpen] = useState(false);
  const [feedbackHandlerType, setFeedbackHandlerType] = useState();

  const approveHandler = async () => {
    setFeedbackWaitingCardOpen(true);
    try {
      const campaign = Campaign(address);
      const accounts = await web3.eth.getAccounts();

      await campaign.methods.approveRequest(id).send({
        from: accounts[0],
      });

      setFeedbackWaitingCardOpen(false);
      setFeedbackHandlerType('approval process');
      setFeedbackBarSuccessOpen(true);
    } catch (err) {
      setFeedbackWaitingCardOpen(false);
      setFeedbackErrorCardOpen(true);
      setFeedbackHandlerType('aproval process');
      setFeedbackCardErrorText(err.message);
    }
  };

  const finalizeHandler = async () => {
    setFeedbackWaitingCardOpen(true);
    try {
      const campaign = Campaign(address);
      const accounts = await web3.eth.getAccounts();
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
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <StyledTableCell component="th" scope="row">
          {id}
        </StyledTableCell>
        <StyledTableCell align="right">{request.description}</StyledTableCell>
        <StyledTableCell align="right">
          {web3.utils.fromWei(request.value, 'ether')}
        </StyledTableCell>
        <StyledTableCell align="right">{request.recipient}</StyledTableCell>
        <StyledTableCell align="right">
          {request.approvalCount}/{supportersCount}
        </StyledTableCell>
        <StyledTableCell>
          <FinalizeApproveButton onClick={approveHandler}>
            Approve
          </FinalizeApproveButton>
        </StyledTableCell>
        <StyledTableCell onClick={finalizeHandler}>
          <FinalizeApproveButton>Finalize</FinalizeApproveButton>
        </StyledTableCell>
      </TableRow>
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
