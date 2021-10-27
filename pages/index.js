import React, { useEffect, useContext } from 'react';
import factory from '../ethereum/factory';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import CampaignList from '../components/campaignList';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import Headline from '../components/shared/UI/headline';
import Feedback from '../components/shared/UI/feedback';
import useFormState from '../components/shared/hooks/formStateHook';
import { AppStateContext } from '../components/shared/contexts/appState';

const MainGrid = styled(Grid)(({ theme }) => ({
  padding: '0rem 5rem',
  '@media (max-width: 1000px)': {
    padding: '1rem 3rem',
  },
}));

const Home = ({ summaryList }) => {
  const [feedbackState, dispatch, ACTIONS] = useFormState();
  const { appStates, setAppStates } = useContext(AppStateContext);

  useEffect(() => {
    if (!appStates.metamaskWarning) {
      const metamaskCheck = async () => {
        const accounts = await web3.eth.getAccounts();
        const isAccounts = accounts.length > 0;
        if (!isAccounts) {
          dispatch({ type: ACTIONS.CARD_QUESTION_OPEN });
        }
      };
      metamaskCheck();
      setAppStates({ metamaskWarning: true });
    }
  }, []);

  return (
    <>
      <MainGrid>
        <Headline headlineText="Open Campaigns" />
        <CampaignList summaryList={summaryList} />
      </MainGrid>
      <Feedback
        cardOpen={feedbackState.cardQuestion}
        cardType="question"
        cardHeadline="Metamask Wallet Neccessity"
        cardContentText="Our app works with metamask browser extension/wallet. That's why to make actions in our application you need to have metamask. If you don't have you can just visit pages."
        cardCancel={() => dispatch({ type: ACTIONS.CARD_QUESTION_CLOSE })} //
        cardCancelText="Okey"
      />
    </>
  );
};

export default Home;

// Server Side
export async function getServerSideProps() {
  const campaignslist = await factory.methods.getDeployedCampaigns().call();
  const summariesArray = await Promise.all(
    Array(parseInt(campaignslist.length))
      .fill()
      .map((_, index) => {
        return Campaign(campaignslist[index]).methods.getSummary().call();
      })
  );

  return {
    props: {
      summaryList: summariesArray.map((campaignSummary, index) => {
        return {
          minimumContribution: web3.utils.fromWei(campaignSummary[0], 'ether'),
          balance: web3.utils.fromWei(campaignSummary[1], 'ether'),
          requestsCount: campaignSummary[2],
          supportersCount: campaignSummary[3],
          manager: campaignSummary[4],
          projectName: campaignSummary[5],
          projectAim: campaignSummary[6],
          financialAim: web3.utils.fromWei(campaignSummary[7], 'ether'),
          imageURL: campaignSummary[8],
          address: campaignslist[index],
        };
      }),
    },
  };
}
