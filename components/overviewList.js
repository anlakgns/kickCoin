import React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import OverviewCard from './overviewCard';

const MainGrid = styled(Grid)(({ theme }) => ({
  gap: '2rem',
  display:"flex",
  flexDirection: "row",
  flexWrap: "wrap",
}));

const OverviewList = ({ cardsInfo }) => {
  const explanations = [
    'This is the minimum contribution amount for this campaign.',
    'The total amount of ethereum collected to support this campaign.',
    'Total number of spending request made by manager of this campaign.',
    'Total number of supporters for this campaign.',
    'Budget aim to be succesful for this campaign which is decided by manager.',
    'The address of the manager of this campaign in the network.',
  ];

  return (
    <MainGrid>
      {cardsInfo &&
        Object.entries(cardsInfo).map((item, i) => {
          return (
            <OverviewCard
              key={item[0]}
              info={item}
              explanation={explanations[i]}
            />
          );
        })}
    </MainGrid>
  );
};

export default OverviewList;
