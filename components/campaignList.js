import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import CampaignCard from './campaignCard';
import Pagination from '@mui/material/Pagination';

const MainGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
}));

const CardsGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexWrap: "wrap",
  flexDirection: 'row',
  gap: '3rem',
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

const CampaignList = ({ summaryList }) => {
  const [page, setPage] = useState(1);
  const [campaignAmountPerPage, setCampaignAmountPerPage] = useState(4);
  const [summaryListPaged, setSummaryListPages] = useState([]);

  useEffect(() => {
    setSummaryListPages(
      summaryList.slice(
        (page - 1) * (campaignAmountPerPage),
        campaignAmountPerPage * page
      )
    );
  }, [page]);

  const paginationHandler = (_, value) => {
    setPage(value);
  };

  return (
    <MainGrid item container >
      <CardsGrid item container direction="row">
      {summaryListPaged.map((campaingInfo) => {
        return (
          <CampaignCard
            key={campaingInfo.projectName}
            campaingInfo={campaingInfo}
          />
        );
      })}
      </CardsGrid>
      <PaginationGrid>
        <StyledPagination
          count={Math.ceil(summaryList.length / campaignAmountPerPage)}
          onChange={paginationHandler}
          page={page}
          color="secondary"
        />
      </PaginationGrid>
    </MainGrid>
  );
};

export default CampaignList;
