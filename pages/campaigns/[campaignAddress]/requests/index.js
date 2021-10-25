import Campaign from '../../../../ethereum/campaign';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import RequestList from '../../../../components/requestList';
import RequestTable from '../../../../components/requestTable';
import { Typography } from '@mui/material';

const MainGrid = styled(Grid)(({ theme }) => ({
  padding: '0rem 5rem',
}));

const Headline = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.custom.textWhite,
  width: '100%',
  marginTop: '3rem',
}));

const Divider = styled('div')(({ theme }) => ({
  border: `0.20rem solid ${theme.palette.custom.blueLight} `,
  width: '100%',
  marginTop: '0.4rem',
  marginBottom: '2rem',
  borderRadius: '0.15rem',
  opacity: 0.7,
}));

const Requests = (props) => {
  return (
    <MainGrid item container justifyContent="center">
      <Headline variant="h5">Create a Campaign</Headline>
      <Divider />
      <RequestTable props={props} />
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
