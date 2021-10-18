import React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const MainGrid = styled(Grid)(({ theme }) => ({
  height: '12rem',
  backgroundImage: 'linear-gradient(to bottom, #016986, #0392B4)',
  borderRadius: '1rem',
  overflow: 'hidden',
}));

const TextContentGrid = styled(Grid)(({ theme }) => ({
  height: '100%',
}));
const FundedGrid = styled(Grid)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));
const ImageDiv = styled('div')(({ theme }) => ({
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  height: '12rem',
  width: '25rem',
}));

const Headline = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.custom.textWhite,
  width: '100%',
}));

const Description = styled(Typography)(({ theme }) => ({
  color: theme.palette.custom.textWhite,
  width: '100%',
  opacity: 0.7,
  marginTop: '0.5rem',
  marginBottom: '0.5rem',
}));

const Percentage = styled(Typography)(({ theme }) => ({
  color: theme.palette.custom.textWhite,
}));
const FundedText = styled(Typography)(({ theme }) => ({
  color: theme.palette.custom.orange,
  fontWeight: 'bold',
}));

const Circle = styled('div')(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  border: `4px solid ${theme.palette.custom.orange}`,
  height: '10rem',
  width: '10rem',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}));

const ViewButton = styled(Button)(({ theme }) => ({
  height: '100%',
  width: '12rem',
  backgroundColor: theme.palette.custom.orange,
  color: theme.palette.custom.textWhite,
  fontWeight:"bold",
  borderRadius: '1rem',
}));

const CampaignCard = (props) => {
  return (
    <MainGrid item container direction="row" justifyContent="space-between">
      <ImageDiv
        sx={{
          backgroundImage: `url(${'/africa.png'})`,
        }}
      />
      <TextContentGrid
        item
        xs={5}
        container
        direction="column"
        justifyContent="center"
      >
        <Headline variant="h6">Water Project in Africa</Headline>
        <Description variant="subtitle2">
          This project is developed in order to meet the basic needs of african
          people by making the water available for as many as people we can
        </Description>
      </TextContentGrid>
      <FundedGrid item xs={1}>
        <Circle />
        <Percentage variant="h6" align="center">
          50%
        </Percentage>
        <FundedText align="center">funded</FundedText>
      </FundedGrid>
      <ViewButton>View Campaign</ViewButton>
    </MainGrid>
  );
};

export default CampaignCard;
