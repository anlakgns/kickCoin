import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import RequestCard from './requestCard';
import { useRouter } from 'next/router';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import FeedbackCard from '../components/feedbackCard';

const MainGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100%',
  gap: '1rem',
}));
const RequestsGrid = styled(Grid)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
}));

const AddRequestButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.custom.orange,
  color: theme.palette.custom.textWhite,
  fontWeight: 'bold',
  margin: '1rem',
  width: '15rem',
  height: '4rem',
  marginTop: '2rem',
  margin: 'auto',
}));

const RequestList = ({ props }) => {
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
    <MainGrid>
      <RequestsGrid>
        {props.requests?.map((request, index) => (
          <RequestCard
            request={request}
            isManager={isManager}
            key={index}
            id={index}
            address={router.query.campaignAddress}
            supportersCount={props.supportersCount}
          />
        ))}
      </RequestsGrid>

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
    </MainGrid>
  );
};

export default RequestList;
