import React from 'react';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { Button, Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import factory from '../ethereum/factory';
import web3 from '../ethereum/web3';
import CircularProgress from '@mui/material/CircularProgress';
import CampaignCard from './campaignCard';

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

const NoteCard = () => {
  return (
    <MainGrid>
      <Headline variant="h6">Important Notes Before Use Our Website</Headline>
      <SubHeadline>Warning Box</SubHeadline>
      <Description variant="subtitle1">
        The most important thing to consider is the warning area on the bottom
        left of the page that we provided for you. We are aware of that the
        blockchain technology is not well-know form many users so we put dynamic
        notes there page specificly for your actions.
      </Description>

      <SubHeadline>Ethereum Gas</SubHeadline>
      <Description variant="subtitle1">
        In the ethereum network, actions to change blockchain costs you some trivial amount of ether or in the ethereum world "gas". We will provide information about that on the warning area.
      </Description>


    </MainGrid>
  );
};

export default NoteCard;
