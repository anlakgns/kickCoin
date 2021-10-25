import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import NoteBox from '../components/noteBox.js';
import Headline from '../components/sharedUI/Headline';

const MainGrid = styled(Grid)(({ theme }) => ({
  padding: '0rem 5rem',
  '@media (min-width: 0px) and (max-width: 800px)': {
    padding: '1rem 3rem',
  },
  '@media (min-width: 800px) and (max-width: 1000px)': {
    marginBottom: '5rem',
    padding: '0rem 3rem',
  },
}));

const Notes = () => {
  return (
    <MainGrid container direction="column">
      <Headline headlineText="Notes" backRouter="true" />
      <NoteBox />
    </MainGrid>
  );
};

export default Notes;
