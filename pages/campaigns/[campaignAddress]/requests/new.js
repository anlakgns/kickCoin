import { Typography, Grid } from '@mui/material';
import CreateRequestForm from '../../../../components/createRequestForm';
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

const RequestNew = () => {
  return (
    <MainGrid>
      <Headline variant="h5">Create a Request</Headline>
      <Divider />
      <CreateRequestForm />
    </MainGrid>
  );
};

export default RequestNew;


