import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign'

const RequestRow = ({ request, id, address, supportersCount }) => {

  const approveHandler = async () => {
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(id).send({
      from: accounts[0]
    })
  }

  const finalizeHandler = async () => {
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(id).send({
      from: accounts[0]
    })
  }



  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        {id}
      </TableCell>
      <TableCell align="right">{request.description}</TableCell>
      <TableCell align="right">
        {web3.utils.fromWei(request.value, 'ether')}
      </TableCell>
      <TableCell align="right">{request.recipient}</TableCell>
      <TableCell align="right">
        {request.approvalCount}/{supportersCount}
      </TableCell>
      <TableCell>
        <Button onClick={approveHandler}>Approve</Button>
      </TableCell>
      <TableCell onClick={finalizeHandler}>
        <Button>Finalize</Button>
      </TableCell>
    </TableRow>
  );
};

export default RequestRow;
