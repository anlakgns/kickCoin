import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useMediaQuery from '@mui/material/useMediaQuery';

const MainGrid = styled(Grid)(({ theme }) => ({
  padding: '1rem 1rem',
  paddingTop: '4rem',
  display: 'flex',
  position: 'fixed',
  width: '16.666%',
  left: '0px',
  gap: '3rem',
  flexDirection: 'column',
  '@media (min-width: 1000px) and (max-width: 1200px)': {
    width: '20%',
    height: '100vh',
    marginTop: '0rem',
    paddingTop: '2rem',
  },
  '@media (max-width: 1000px)': {
    backgroundColor: theme.palette.custom.blueDark,
    height: '100vh',
    marginTop: '0rem',
    paddingTop: '2rem',
  },
  '@media (min-width: 0px) and (max-width: 450px)': {
    width: '50%',
  },
  '@media (min-width: 451px) and (max-width: 600px)': {
    width: '45%',
  },
  '@media (min-width: 601px) and (max-width: 800px)': {
    width: '35%',
  },
  '@media (min-width: 801px) and (max-width: 1000px)': {
    width: '30%',
  },
}));

const LogoGrid = styled(Grid)(({ theme }) => ({
  flex: 1,
  flexGrow: 1,
}));

const MenuGrid = styled(Grid)(({ theme }) => ({
  flex: 1,
  flexGrow: 1,
  width: '100%',
}));

const AboutGrid = styled(Grid)(({ theme }) => ({
  flexGrow: 1,
  flex: 2,
}));

const HeadlineButton = styled(Button)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.custom.blueLight,
  width: '100%',
  padding: 0,
  '& 	.MuiButton-root': {
    transition: 'none',
  },
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

const Headline = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.custom.blueLight,
  width: '100%',
}));

const HeadlineWarning = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.custom.red,
  width: '100%',
}));

const Description = styled(Typography)(({ theme }) => ({
  color: theme.palette.custom.textWhite,
  width: '100%',
  opacity: 0.7,
  padding: '0rem 1rem',
  marginTop: '2rem',
  '@media (max-width: 1000px)': {
    marginTop: '1rem',
  },
}));

const About = styled(Typography)(({ theme }) => ({
  color: theme.palette.custom.textWhite,
  width: '100%',
  opacity: 0.7,
  padding: '0rem 1rem',
  marginTop: '2rem',
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.custom.textWhite,
  '& .Mui-selected': {
    color: `${theme.palette.secondary.main}!important`,
  },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .Mui-selected': {
    color: theme.palette.custom.orange,
  },
  '& .MuiTabs-indicator': {
    width: '0.4rem',
    borderRadius: '1rem',
    backgroundColor: theme.palette.custom.orange,
    left: 0,
  },
}));

const Divider = styled('div')(({ theme }) => ({
  border: `0.20rem solid ${theme.palette.custom.blueLight} `,
  backgroundColor: theme.palette.custom.blueLight,
  width: '100%',
  borderRadius: '0.15rem',
  marginBottom: '0.5rem',
  opacity: 0.7,
}));

const DividerWarning = styled('div')(({ theme }) => ({
  border: `0.20rem solid ${theme.palette.custom.red} `,
  backgroundColor: theme.palette.custom.red,
  width: '100%',
  borderRadius: '0.15rem',
  marginBottom: '0.5rem',
  opacity: 0.7,
}));

const WarningSpan = styled('span')(({ theme }) => ({
  color: theme.palette.custom.orangeLight,
}));

const Sidebar = ({ setDrawerOpen }) => {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [warningMessage, setWarningMessage] = useState();
  const matches1000 = useMediaQuery('(max-width: 1000px)');

  // Routing
  useEffect(() => {
    switch (value) {
      case 0:
        router.push('/');
        matches1000 ? setDrawerOpen(false) : '';
        break;
      case 1:
        router.push('/campaigns/new');
        matches1000 ? setDrawerOpen(false) : '';

        break;
      case 2:
        router.push('/notes');
        matches1000 ? setDrawerOpen(false) : '';

        break;
      default:
        router.push('/');
        matches1000 ? setDrawerOpen(false) : '';
    }
  }, [value]);

  // Pathname check for consistency for tabs
  useEffect(() => {
    switch (router.pathname) {
      case '/':
        setValue(0);
        break;
      case '/campaigns/new':
        setValue(1);
        break;
      case '/notes':
        setValue(2);
        break;
    }
  }, [router.pathname]);

  // Dynamic warning message
  useEffect(() => {
    const manageWarningMessage = () => {
      switch (router.pathname) {
        case '/':
          return (
            <span>
              <WarningSpan>View Campaign</WarningSpan> : no gas. You can check
              campaigns safely.
            </span>
          );

        case '/campaigns/[campaignAddress]':
          return (
            <span>
              <WarningSpan>View Results</WarningSpan> : no gas. <br />
              <WarningSpan>Contribute</WarningSpan> costs some trivial amount of
              gas and contribution amount. <br />
              <WarningSpan>Delete</WarningSpan> costs some trivial amount of
              gas.
            </span>
          );
        case '/campaigns/[campaignAddress]/requests':
          return (
            <span>
              <WarningSpan>Approve, Finalize</WarningSpan> and{' '}
              <WarningSpan>Add Request</WarningSpan> actions can only be taken
              by the manager of this campaign.
            </span>
          );

        case '/campaigns/[campaignAddress]/requests/new':
          return (
            <span>
              <WarningSpan>Create</WarningSpan> action can only be taken by the
              manager of this campaign.
            </span>
          );

        case '/campaigns/new':
          return (
            <span>
              <WarningSpan>Create</WarningSpan> : costs some trivial amount of
              gas.
              <br />
              <WarningSpan>Campaigns</WarningSpan> can not be editted later.
              Please make sure everything is correct.
            </span>
          );

        case '/notes':
          return (
            <span>
              Please take a look at me while you hang around our website.
            </span>
          );
      }
    };
    setWarningMessage(manageWarningMessage());
  }, [router.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MainGrid container direciton="column">
      <LogoGrid>
        <HeadlineButton
          variation="text"
          size="large"
          onClick={() => router.push('/')}
          style={{ fontSize: '2.5rem' }}
        >
          Kick Coin
        </HeadlineButton>
        <Description align="left" variant="subtitle2">
          Kick Coin is a crowdfunding project that enchanced with blockchain
          technology on the ethereum network. We aim to provide fraud-free
          crowdfunding platform.
        </Description>
      </LogoGrid>

      <MenuGrid>
        <Headline align="left" variant="subtitle1">
          Menu{' '}
        </Headline>
        <Divider />

        <StyledTabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          textColor="secondary"
        >
          <StyledTab
            label="Campaigns List"
            value={0}
            onClick={() => router.push('/')}
          />
          <StyledTab label="Create a Campaign" value={1} />
          <StyledTab label="Notes" value={2} />
        </StyledTabs>
      </MenuGrid>

      <AboutGrid>
        <HeadlineWarning align="left" variant="subtitle1">
          Warnings{' '}
        </HeadlineWarning>
        <DividerWarning />
        <About align="left" variant="subtitle2">
          {warningMessage}
        </About>
      </AboutGrid>
    </MainGrid>
  );
};

export default Sidebar;
