import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Typography } from '@mui/material';
import Campaign from '../../../../ethereum/campaign';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import RequestRow from '../../../../components/requestRow';
import { styled } from '@mui/material/styles';

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

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: theme.palette.custom.blueDark,
}));

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

const Requests = (props) => {
  const router = useRouter();
  const address = router.query.campaignAddress;

  return (
    <MainGrid item container justifyContent="center">
      <Headline variant="h5">Create a Campaign</Headline>
      <Divider />
      <StyledTableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <StyledTableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
              <StyledTableCell align="right">Recipient</StyledTableCell>
              <StyledTableCell align="right">Approval Count</StyledTableCell>
              <StyledTableCell align="right">Approve</StyledTableCell>
              <StyledTableCell align="right">Finalize</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {props.requests?.map((request, index) => (
              <RequestRow
                request={request}
                key={index}
                id={index}
                address={address}
                supportersCount={props.supportersCount}
              />
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
      <AddRequestButton
        type="submit"
        variant="contained"
        onClick={() => router.push(`/campaigns/${address}/requests/new`)}
      >
        Add a Request
      </AddRequestButton>
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
