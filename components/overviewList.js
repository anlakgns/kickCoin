import React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import OverviewCard from './overviewCard';

const MainGrid = styled(Grid)(({ theme }) => ({
  gap: '2rem',
}));

const OverviewList = ({ cardsInfo }) => {
  const explanations = [
    'This is the minimum contribution amount for this campaign.',
    'The total amount of ethereum collected to support this campaign.',
    'Total number of spending request made by manager of this campaign.',
    'Total number of supporters for this campaign',
    'Budget aim to be succesful for this campaign which is decided by manager.',
    'The address of the manager of this campaign in the network',
  ];

  return (
    <MainGrid item container direction="column">
      <Grid item container direction="row" justifyContent="space-between">
        {cardsInfo &&
          Object.entries(cardsInfo)
            .slice(0, 3)
            .map((item, i) => {
              return (
                <OverviewCard
                  key={item[0]}
                  info={item}
                  explanation={explanations[i]}
                />
              );
            })}
      </Grid>
      <Grid item container direction="row" justifyContent="space-between">
        {cardsInfo &&
          Object.entries(cardsInfo)
            .slice(3, 6)
            .map((item, i) => {
              return (
                <OverviewCard
                  key={item[0]}
                  info={item}
                  explanation={explanations[i + 3]}
                />
              );
            })}
      </Grid>
    </MainGrid>
  );
};

export default OverviewList;
