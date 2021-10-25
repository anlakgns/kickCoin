import { Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import NoteBox from '../components/noteBox.js'

const MainGrid = styled(Grid)(({ theme }) => ({
  padding: '0rem 5rem',
  "@media (min-width: 0px) and (max-width: 800px)": {
    padding: "1rem 3rem"
  },
  '@media (min-width: 800px) and (max-width: 1000px)': {
    marginBottom: '5rem',
    padding: "0rem 3rem",
  },
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
      <NoteBox/>
    </MainGrid>
  );
};

export default Notes;
