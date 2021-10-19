import React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

const MainGrid = styled(Grid)(({ theme }) => ({
  height: '10rem',
  width: '30rem',
  backgroundImage: `linear-gradient(to bottom, ${theme.palette.custom.gradient1}, ${theme.palette.custom.gradient2})`,
  borderRadius: '1rem',
  overflow: 'hidden',
}));

const OverviewCard = ({ info }) => {
  const router = useRouter();
  console.log(info);

  return (
    <MainGrid item>
      <div>{info[0]}</div>
      <div>{info[1]}</div>
    </MainGrid>
  );
};

export default OverviewCard;
