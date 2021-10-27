import Campaign from '../../../../ethereum/campaign';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import RequestList from '../../../../components/requestList';
import Headline from '../../../../components/sharedUI/Headline';

const MainGrid = styled(Grid)(({ theme }) => ({
  padding: '0rem 5rem',
  '@media (max-width: 1000px)': {
    padding: '1rem 3rem',
  },
}));

const Requests = (props) => {
  return (
    <MainGrid item container justifyContent="center">
      <Headline headlineText="Requests List" backRouter="true" />
      <RequestList props={props} />
    </MainGrid>
  );
};

export default Requests;

export async function getServerSideProps(context) {
  const { params } = context;
  const address = params.campaignAddress;
  const campaign = Campaign(address);
  const supportersCount = await campaign.methods.supportersCount().call();
  const requestCount = await campaign.methods.numRequests().call();
  const requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map((element, index) => {
        return campaign.methods.requests(index).call();
      })
  );

  return {
    props: {
      requests: JSON.parse(JSON.stringify(requests)),
      supportersCount,
      requestCount,
    },
  };
}
