import React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

const MainGrid = styled(Grid)(({ theme }) => ({
  height: '12rem',
  backgroundImage: `linear-gradient(to bottom, ${theme.palette.custom.gradient1}, ${theme.palette.custom.gradient2})`,
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
  fontWeight: 'bold',
  borderRadius: '1rem',
}));

const CampaignCard = ({ campaingInfo, preview }) => {
  const router = useRouter();
  console.log(campaingInfo)
  return (
    <MainGrid item container direction="row" justifyContent="space-between">
      <ImageDiv
        sx={{
          backgroundImage: `url(${campaingInfo.imageURL})`,
        }}
      />
      <TextContentGrid
        item
        xs={5}
        container
        direction="column"
        justifyContent="center"
      >
        <Headline variant="h6">{campaingInfo.projectName}</Headline>
        <Description variant="subtitle2">{campaingInfo.projectAim}</Description>
      </TextContentGrid>
      <FundedGrid item xs={1}>
        <Circle />
        <Percentage variant="h6" align="center">
          {(campaingInfo.balance / campaingInfo.financialAim) * 100}%
        </Percentage>
        <FundedText align="center">funded</FundedText>
      </FundedGrid>
      <ViewButton
        onClick={() => preview==="true" ? "" :router.push(`campaigns/${campaingInfo.address}`)}
      >
        View Campaign
      </ViewButton>
    </MainGrid>
  );
};

export default CampaignCard;
