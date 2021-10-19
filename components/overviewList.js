import React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import OverviewCard from './overviewCard';

const MainGrid = styled(Grid)(({ theme }) => ({
  gap: "2rem"
}));

const OverviewList = ({ cardsInfo }) => {
  return (
    <MainGrid item container direction="column">
      <Grid item container direction="row" justifyContent="space-between">
        {Object.entries(cardsInfo)
          .slice(0, 3)
          .map((item) => {
            return <OverviewCard info={item} />;
          })}
      </Grid>
      <Grid item container direction="row" justifyContent="space-between">
        {Object.entries(cardsInfo)
          .slice(3, 6)
          .map((item) => {
            return <OverviewCard info={item} />;
          })}
      </Grid>
    </MainGrid>
  );
};

export default OverviewList;
