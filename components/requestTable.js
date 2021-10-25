import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import RequestRow from '../components/requestRow';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import FeedbackCard from './feedbackCard';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: theme.palette.custom.blueDark,
  position: 'relative',
  overflowX: 'auto',
  maxWidth: '70vw',
}));

const StyledTableBody = styled(TableBody)(({ theme }) => ({}));
const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 350,
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.custom.blueLight,
  color: theme.palette.custom.textWhite,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const AddRequestButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.custom.orange,
  color: theme.palette.custom.textWhite,
  fontWeight: 'bold',
  margin: '1rem',
  width: '15rem',
  height: '4rem',
  marginTop: '2rem',
}));

const RequestTable = ({ props }) => {
  const router = useRouter();
  const address = router.query.campaignAddress;

  const [isManager, setIsManager] = useState(false);
  const [feedbackCardErrorOpen, setFeedbackErrorCardOpen] = useState(false);
  const [feedbackCardErrorText, setFeedbackCardErrorText] = useState('');

  useEffect(() => {
    const check = async () => {
      try {
        const campaign = await Campaign(address);
        const allAccount = await web3.eth.getAccounts();
        const manager = await campaign.methods.manager().call();
        setIsManager(manager === allAccount[0]);
      } catch (err) {
        console.log(err);
      }
    };
    check();
  }, []);

  const addRequestHandler = () => {
    // isManager check
    if (!isManager) {
      setFeedbackCardErrorText(
        'Only the manager of this campaign can add a request.'
      );
      setFeedbackErrorCardOpen(true);
      return;
    }

    router.push(`/campaigns/${address}/requests/new`);
  };

  return (
    <>
      <StyledTableContainer component={Paper}>
        <StyledTable aria-label="simple table">
          <StyledTableHead>
            <StyledTableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
              <StyledTableCell align="right">Recipient</StyledTableCell>
              <StyledTableCell align="right">Approval Count</StyledTableCell>
              <StyledTableCell align="right">Approve</StyledTableCell>
              <StyledTableCell align="right">Finalize</StyledTableCell>
            </StyledTableRow>
          </StyledTableHead>
          <StyledTableBody>
            {props.requests?.map((request, index) => (
              <RequestRow
                request={request}
                isManager={isManager}
                key={index}
                id={index}
                address={router.query.campaignAddress}
                supportersCount={props.supportersCount}
              />
            ))}
          </StyledTableBody>
        </StyledTable>
      </StyledTableContainer>
      <AddRequestButton
        type="submit"
        variant="contained"
        onClick={addRequestHandler}
      >
        Add a Request
      </AddRequestButton>
      <FeedbackCard
        type="error"
        open={feedbackCardErrorOpen}
        setOpen={setFeedbackErrorCardOpen}
        headline="Something went wrong"
        contentText={feedbackCardErrorText}
      />
    </>
  );
};

export default RequestTable;
