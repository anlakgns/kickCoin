import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import CampaignCard from './campaignCard';
import Pagination from '@mui/material/Pagination';

const MainGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  marginBottom: "5rem"
}));
const CardsGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  gap: '3rem',
}));
const PaginationGrid = styled(Grid)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  padding: '1rem',
  '@media (max-width: 1000px)': {
    marginBottom: '5rem',
    marginTop: '2rem',
  },
}));
const StyledPagination = styled(Pagination)(({ theme }) => ({
  '& .MuiPaginationItem-root': {
    color: theme.palette.custom.textWhite,
  },
}));

const CampaignList = ({ summaryList }) => {
  const [page, setPage] = useState(1);
  const [campaignAmountPerPage, setCampaignAmountPerPage] = useState(8);
  const [summaryListPaged, setSummaryListPages] = useState([]);

  // page render logic
  useEffect(() => {
    setSummaryListPages(
      summaryList.slice(
        (page - 1) * campaignAmountPerPage,
        campaignAmountPerPage * page
      )
    );
  }, [page]);

  const paginationHandler = (_, value) => {
    setPage(value);
  };

  return (
    <MainGrid item container>
      <CardsGrid item container direction="row">
        {summaryListPaged.map((campaingInfo) => {
          return (
            <CampaignCard
              key={campaingInfo.address}
              campaingInfo={campaingInfo}
            />
          );
        })}
      </CardsGrid>
      {summaryList.length > 8 ? (
        <PaginationGrid>
          <StyledPagination
            count={Math.ceil(summaryList.length / campaignAmountPerPage)}
            onChange={paginationHandler}
            page={page}
            color="secondary"
          />
        </PaginationGrid>
      ) : (
        ''
      )}
    </MainGrid>
  );
};

export default CampaignList;
