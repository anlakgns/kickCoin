import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import RequestCard from './requestCard';
import { useRouter } from 'next/router';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import Feedback from './shared/UI/feedback';
import useFormState from "./shared/hooks/formStateHook"

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
  const [feedbackState, dispatch, ACTIONS] = useFormState();

  const [isManager, setIsManager] = useState(false);

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
      dispatch({
        type: ACTIONS.ERROR,
        payload: 'Only the manager of this campaign can add a request.',
      });
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

      <Feedback
        cardType="error"
        cardOpen={feedbackState.cardError}
        setCardClose={() => dispatch({ type: ACTIONS.CARD_ERROR_CLOSE })}
        cardContentText={feedbackState.cardErrorText}
      />
    </MainGrid>
  );
};

export default RequestList;
