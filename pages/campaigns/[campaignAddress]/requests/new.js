import { Grid } from '@mui/material';
import CreateRequestForm from '../../../../components/createRequestForm';
import { styled } from '@mui/material/styles';
import Campaign from '../../../../ethereum/campaign';
import web3 from '../../../../ethereum/web3';
import Headline from '../../../../components/sharedUI/Headline';

const MainGrid = styled(Grid)(({ theme }) => ({
  padding: '0rem 5rem',
  '@media (min-width: 0px) and (max-width: 1000px)': {
    marginBottom: '5rem',
    padding: '0rem 3rem',
  },
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
          campaignAddress: '0x08409F55Cb6aF037733c0FE180919e49D0AF4f62',
        },
      },
    ],
    fallback: true,
  };
}
