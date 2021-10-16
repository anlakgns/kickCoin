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

const Requests = (props) => {
  const router = useRouter();
  const address = router.query.campaignAddress;

  return (
    <Grid item>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Recipient</TableCell>
              <TableCell align="right">Approval Count</TableCell>
              <TableCell align="right">Approve</TableCell>
              <TableCell align="right">Finalize</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.requests.map((request, index) => (
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
      </TableContainer>
      <Typography>Found {props.requestCount}</Typography>
      <Button
        type="submit"
        variant="contained"
        sx={{ margin: '1rem', width: '50%' }}
      >
        <Link href={`/campaigns/${address}/requests/new`}>Add Request</Link>
      </Button>
    </Grid>
  );
};

export default Requests;

export async function getStaticProps(context) {
  const { params } = context;
  const address = params.campaignAddress;

  const campaign = Campaign(address);
  const supportersCount = await campaign.methods.supportersCount().call();

  const requestCount = await campaign.methods.getRequestsCount().call();
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
          campaignAddress: '0xd0402f989729DD88622d77F78A079229E18A4257',
        },
      },
    ],
    fallback: true,
  };
}
