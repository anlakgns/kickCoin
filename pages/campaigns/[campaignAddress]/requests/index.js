import Campaign from '../../../../ethereum/campaign';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import RequestList from '../../../../components/requestList';
import RequestTable from '../../../../components/requestTable';
import Headline from '../../../../components/sharedUI/Headline';

const MainGrid = styled(Grid)(({ theme }) => ({
  padding: '0rem 5rem',
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

export async function getStaticProps(context) {
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

  console.log(requests[0]);
  return {
    props: {
      requests: JSON.parse(JSON.stringify(requests)),
      supportersCount,
      requestCount,
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
