import { Typography, Grid } from '@mui/material';
import CreateRequestForm from '../../../../components/createRequestForm';
import { styled } from '@mui/material/styles';
import Campaign from '../../../../ethereum/campaign';
import web3 from '../../../../ethereum/web3';
import Headline from '../../../../components/sharedUI/Headline';

const MainGrid = styled(Grid)(({ theme }) => ({
  padding: '0rem 5rem',
}));

const RequestNew = (props) => {
  const { manager, balance, requestsBalance } = props;
  return (
    <MainGrid>
      <Headline headlineText="Create a Request" backRouter="true" />
      <CreateRequestForm
        manager={manager}
        balance={balance}
        requestsBalance={requestsBalance}
      />
    </MainGrid>
  );
};

export default RequestNew;

export async function getStaticProps(context) {
  const { params } = context;
  const address = params.campaignAddress;
  const campaign = Campaign(address);

  const summary = await campaign.methods.getSummary().call();
  console.log(summary);
  return {
    props: {
      balance: web3.utils.fromWei(summary[1], 'ether'),
      manager: summary[4],
      requestsBalance: web3.utils.fromWei(summary[9], 'ether'),
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          campaignAddress: '0xdBc1BFB90e5d7f869C62665d96E2411A9837bA9f',
        },
      },
    ],
    fallback: true,
  };
}
