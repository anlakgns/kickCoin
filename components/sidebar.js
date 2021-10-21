import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const MainGrid = styled(Grid)(({ theme }) => ({
  padding: '1rem 1rem',
  marginTop: '4rem',
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
  '& .MuiButton-text': {},
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
  width: '100%',
  borderRadius: '0.15rem',
  marginBottom: '0.5rem',
  opacity: 0.7,
}));

const DividerWarning = styled('div')(({ theme }) => ({
  border: `0.20rem solid ${theme.palette.custom.red} `,
  width: '100%',
  borderRadius: '0.15rem',
  marginBottom: '0.5rem',
  opacity: 0.7,
}));

const LogoGrid = styled(Grid)(({ theme }) => ({}));

const MenuGrid = styled(Grid)(({ theme }) => ({
  marginTop: '3rem',
  width: '100%',
}));

const AboutGrid = styled(Grid)(({ theme }) => ({
  marginTop: '3rem',
}));

const WarningSpan = styled('span')(({ theme }) => ({
  color: theme.palette.custom.orangeLight,
}));

const Header = () => {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [warningMessage, setWarningMessage] = useState();

  // Routing
  useEffect(() => {
    switch (value) {
      case 0:
        router.push('/');
        break;
      case 1:
        router.push('/campaigns/new');
        break;
      case 2:
        router.push('/notes');
        break;
      default:
        router.push('/');
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
              <WarningSpan>View Campaign</WarningSpan> action doesn't cost any
              gas for you. You can check campaigns safely.
            </span>
          );

        case '/campaigns/[campaignAddress]':
          return (
            <span>
              <WarningSpan>View Results</WarningSpan> action doesn't cost any
              gas for you. You can check campaigns. However{' '}
              <WarningSpan>Contribute</WarningSpan> costs you the amount of
              contribution you make and some trivial gas.
            </span>
          );
        case '/campaigns/[campaignAddress]/requests':
          return (
            <span>
              <WarningSpan>Approve, Finalize</WarningSpan> and{' '}
              <WarningSpan>Add Request</WarningSpan> actions can only be taken
              by the manager of this campaign
            </span>
          );

        case '/campaigns/new':
          return (
            <span>
              <WarningSpan>Create</WarningSpan> action will cost some amount of
              gas for you.
            </span>
          );

        case '/notes':
          return (
            <span>
              Please take a look at me when you hang around our website.
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
    <MainGrid container direciton="column" alignItems="center">
      <LogoGrid item>
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

      <MenuGrid item>
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
          <StyledTab label="Campaigns List" value={0} />
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

export default Header;

/*
switch (router.pathname) {
      case '/':
        setWarningMessage(
          "View Campaign action doesn't cost any gas for you. You can check campaigns safely."
        );
        break;
      case '/campaigns/[campaignAddress]':
        setWarningMessage(
          "View Results action doesn't cost any gas for you. You can check campaigns. However Contribute cost you the amount of contribution you make and some trivial gas. "
        );
        break;
    }
 
 */
