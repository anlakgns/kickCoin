import { Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import NoteCard from '../components/noteCard.js'

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

const Notes = () => {
  return (
    <MainGrid container direction="column">
      <Headline variant="h5">Notes</Headline>
      <Divider />
      <NoteCard/>
    </MainGrid>
  );
};

export default Notes;