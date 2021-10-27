import React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import useMediaQuery from '@mui/material/useMediaQuery';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

const MainGrid = styled(Grid)(({ theme }) => ({
  minHeight: '12rem',
  overflow: 'hidden',
  zIndex: 1200,
  gap: '1rem',
  backgroundImage: `linear-gradient(to bottom, ${theme.palette.custom.gradient1}, ${theme.palette.custom.gradient2})`,
  borderRadius: '1rem',
  gap: '1rem',
  '@media (max-width: 600px)': {
    height: 'auto',
    display: 'flex',
    gap: '1rem',
    minWidth: '27.5rem',
  },
  '@media (min-width: 601px) and (max-width: 1000px)': {
    height: 'auto',
    display: 'flex',
    gap: '1rem',
    minWidth: '25rem',
    flex: 1,
  },
  '@media (min-width: 1001px)': {
    maxHeight: '18rem',
    display: 'flex',
    gap: '1rem',
    minWidth: '27.5rem',
  },
}));
const ImageDiv = styled('div')(({ theme }) => ({
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  minHeight: '12rem',
  width: '25rem',
  '@media (max-width: 1000px)': {
    width: '100%',
    height: '12rem',
  },
}));
const TextContentGrid = styled(Grid)(({ theme }) => ({
  padding: '1rem',
  '@media (min-width: 1000px)': {
    flex: 3,
  },
}));
const FundedGrid = styled(Grid)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  '@media (min-width: 1000px)': {
    flex: 1,
    maxHeight: '18rem',
  },
  '@media (min-width: 1001px) and (max-width: 1100px)': {
    marginRight: '1rem',
  },
}));
const ButtonGrid = styled(Grid)(({ theme }) => ({
  '@media (min-width: 1001px)': {
    flex: 1,
  },
}));
const LinearProgressGrid = styled(Grid)(({ theme }) => ({
  width: '100%',
  padding: '1rem',
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
  height: '4rem',
  width: '12rem',
  backgroundColor: theme.palette.custom.orange,
  color: theme.palette.custom.textWhite,
  fontWeight: 'bold',
  borderRadius: '1rem',
  '@media (max-width: 1000px)': {
    width: '100%',
    borderRadius: '0rem',
    borderRadiusBottom: '1rem',
    borderRadiusTop: '0rem',
  },
  '@media (min-width: 1001px)': {
    width: '100%',
    maxHeight: '18rem',
    height: '100%',
    borderRadius: '0rem',
    borderRadiusBottom: '1rem',
    borderRadiusTop: '0rem',
  },
}));
const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: '0.4rem',
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: theme.palette.custom.orangeLight,
  },
}));
const StyledLinearProgressBox = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '1rem',
  paddingBottom: '1.5rem',
  backgroundColor: theme.palette.custom.gradient1,
  borderRadius: '1rem',
}));
const FundedTextMobile = styled(Typography)(({ theme }) => ({
  color: theme.palette.custom.orangeLight,
  fontWeight: 'bold',
  fontSize: '1.3rem',
}));

const CampaignCard = ({ campaingInfo, preview }) => {
  const router = useRouter();
  const matches1000 = useMediaQuery('(max-width: 1000px)');

  return (
    <MainGrid
      item
      container
      direction={matches1000 ? 'column' : 'row'}
      justifyContent="space-between"
    >
      {/* Image Part */}
      <ImageDiv
        sx={{
          backgroundImage: `url(${campaingInfo.imageURL})`,
        }}
      />

      {/* Text Part */}
      <TextContentGrid
        item
        container
        direction={matches1000 ? 'column' : 'row'}
        justifyContent="space-between"
      >
        <Headline variant="h6">{campaingInfo.projectName}</Headline>
        <Description variant="subtitle2">{campaingInfo.projectAim}</Description>
      </TextContentGrid>

      {/* Funded Circle */}
      {matches1000 ? (
        <LinearProgressGrid>
          <StyledLinearProgressBox>
            <FundedTextMobile variant="body2" align="left">
              %
              {(
                (campaingInfo.balance / campaingInfo.financialAim) *
                100
              ).toFixed(0)}{' '}
              funded
            </FundedTextMobile>
            <StyledLinearProgress
              variant="determinate"
              value={
                (campaingInfo.balance / campaingInfo.financialAim) * 100 > 100
                  ? 100
                  : (campaingInfo.balance / campaingInfo.financialAim) * 100
              }
            />
          </StyledLinearProgressBox>
        </LinearProgressGrid>
      ) : (
        <FundedGrid>
          <Circle />
          <Percentage variant="h6" align="center">
            %{' '}
            {((campaingInfo.balance / campaingInfo.financialAim) * 100).toFixed(
              0
            )}
          </Percentage>
          <FundedText align="center">funded</FundedText>
        </FundedGrid>
      )}

      {/* Button Part */}
      <ButtonGrid>
        <ViewButton
          onClick={() =>
            preview === 'true'
              ? ''
              : router.push(`campaigns/${campaingInfo.address}`)
          }
        >
          View Campaign
        </ViewButton>
      </ButtonGrid>
    </MainGrid>
  );
};

export default CampaignCard;
