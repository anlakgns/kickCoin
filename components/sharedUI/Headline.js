import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';

const HeadlineText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.custom.textWhite,
  width: '100%',
  marginTop: '2rem',
}));

const Divider = styled('div')(({ theme }) => ({
  border: `0.20rem solid ${theme.palette.custom.blueLight} `,
  width: '100%',
  marginTop: '0.4rem',
  marginBottom: '2rem',
  borderRadius: '0.15rem',
  opacity: 0.7,
}));

const StyledIcon = styled(ArrowBackIcon)(({ theme }) => ({
  color: theme.palette.custom.blueLight,
}));

const Headline = ({ headlineText, backRouter = false }) => {
  const router = useRouter();

  return (
    <>
      <HeadlineText variant="h5">
        {backRouter ? (
          <IconButton onClick={() => router.back()}>
            <StyledIcon />
          </IconButton>
        ) : (
          ''
        )}

        {headlineText}
      </HeadlineText>
      <Divider />
    </>
  );
};

export default Headline;
