import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.custom.textWhite,
}));

const FinalizeApproveButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.custom.green,
  color: theme.palette.custom.textWhite,
  textTransform: "none",
  padding: "0.5rem 1rem",
}));

const RequestRow = ({ request, id, address, supportersCount }) => {
  const approveHandler = async () => {
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(id).send({
      from: accounts[0],
    });
  };

  const finalizeHandler = async () => {
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(id).send({
      from: accounts[0],
    });
  };

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <StyledTableCell component="th" scope="row">
        {id}
      </StyledTableCell>
      <StyledTableCell align="right">{request.description}</StyledTableCell>
      <StyledTableCell align="right">
        {web3.utils.fromWei(request.value, 'ether')}
      </StyledTableCell>
      <StyledTableCell align="right">{request.recipient}</StyledTableCell>
      <StyledTableCell align="right">
        {request.approvalCount}/{supportersCount}
      </StyledTableCell>
      <StyledTableCell>
        <FinalizeApproveButton onClick={approveHandler}>Approve</FinalizeApproveButton>
      </StyledTableCell>
      <StyledTableCell onClick={finalizeHandler}>
        <FinalizeApproveButton>Finalize</FinalizeApproveButton>
      </StyledTableCell>
    </TableRow>
  );
};

export default RequestRow;
