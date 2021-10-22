import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';

const MainGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.custom.blueDark,
  borderRadius: '1rem',
  overflow: 'hidden',
  padding: '2rem 5rem',
}));

const Headline = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.custom.blueLight,
  width: '100%',
  marginBottom: '1rem',
}));

const SubHeadline = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.custom.orange,
  width: '100%',
  fontSize: '0.5rem',
  marginTop: '3rem',
}));

const Description = styled(Typography)(({ theme }) => ({
  color: theme.palette.custom.textWhite,
  width: '100%',
  opacity: 0.7,
  marginTop: '0.5rem',
  fontSize: '4rem',
}));

const PaginationGrid = styled(Grid)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  padding: '1rem',
}));

const StyledPagination = styled(Pagination)(({ theme }) => ({
  '& .MuiPaginationItem-root': {
    color: theme.palette.custom.textWhite,
  },
}));

const NoteBox = () => {
  const [page, setPage] = useState(1);
  const [noteAmountPerPage, setnoteAmountPerPage] = useState(3);
  const [noteListPaged, setNoteListPages] = useState([]);

  const paginationHandler = (_, value) => {
    setPage(value);
  };

  const noteArray = [
    {
      headline: 'Warning Box',
      description:
        'The most important thing to consider is the warning area on the bottom left of the page that we provided for you. We are aware of that the blockchain technology is not well-know form many users so we put dynamic notes there page specificly for your actions.',
    },
    {
      headline: 'Ethereum Gas',
      description:
        'In the ethereum network, actions to change blockchain costs you some trivial amount of ether or in the ethereum world "gas". We will provide information about that on the warning area.',
    },
    {
      headline: 'Processing Time',
      description:
        "When we request a change in blockchain, the request needs to be validated by network. The validation process takes about 15-30 seconds on ethereum networks. That's why please be patient while making changes on network. Besides this is the reason of the actions costing you some gases. When miners validate our request, we pay them for their effort which in this case by gas.",
    },
    {
      headline: 'Units in Ethereum',
      description:
        'Like any currency ethereum has sub unit actually sub units. For example for dollar we have a main unit 1 dolar, 2 dolar and and we also have cent.In ethereum world we have many sub units such as wei, kwei, mwei,gwei and so on. We try to use everything in main unit eth in our website.',
    },
  ];

  useEffect(() => {
    setNoteListPages(
      noteArray.slice((page - 1) * noteAmountPerPage, noteAmountPerPage * page)
    );
  }, [page]);

  return (
    <MainGrid>
      <Headline variant="h6">Important Notes Before Use Our Website</Headline>
      {noteListPaged.map((note) => {
        return (
          <>
            <SubHeadline>{note.headline}</SubHeadline>
            <Description variant="subtitle1">{note.description}</Description>
          </>
        );
      })}

      <PaginationGrid>
        <StyledPagination
          count={Math.ceil(noteArray.length / noteAmountPerPage)}
          onChange={paginationHandler}
          page={page}
          color="secondary"
        />
      </PaginationGrid>
    </MainGrid>
  );
};

export default NoteBox;
