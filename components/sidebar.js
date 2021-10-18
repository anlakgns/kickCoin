import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const MainGrid = styled(Grid)(({ theme }) => ({
  padding: '1rem 1rem',
  marginTop: '4rem',
}));

const Headline = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.custom.blueLight,
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
  color: theme.palette.custom.blueLight,
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

const LogoGrid = styled(Grid)(({ theme }) => ({}));

const MenuGrid = styled(Grid)(({ theme }) => ({
  marginTop: '5rem',
}));

const AboutGrid = styled(Grid)(({ theme }) => ({
  marginTop: '4rem',
}));

const Header = () => {
  const router = useRouter();
  const [value, setValue] = useState(0);

  useEffect(() => {
    switch (value) {
      case 0:
        router.push('/');
        break;
      case 1:
        router.push('/campaigns/new');
        break;
      default:
        router.push('/');
    }
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MainGrid container direciton="column" alignItems="center">
      <LogoGrid item>
        <Headline align="center" variant="h4">
          Kick Coin
        </Headline>
        <Description align="left" variant="subtitle2">
          This project is developed in order to meet the basic needs of african
          people by making the water available for as many as people we can
        </Description>
      </LogoGrid>

      <MenuGrid item>
        <Headline align="left" variant="subtitle1">
          Menu{' '}
        </Headline>
        <Divider />

        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <StyledTabs
              orientation="vertical"
              value={value}
              onChange={handleChange}
              textColor="secondary"
            >
              <StyledTab label="Campaigns List" value={0} />
              <StyledTab label="Create a Campaign" value={1} />
              <StyledTab label="Contribute a Campaign" value={2} />
            </StyledTabs>
          </Box>
        </Box>
      </MenuGrid>

      <AboutGrid>
        <Headline align="left" variant="subtitle1">
          About{' '}
        </Headline>
        <Divider />
        <About align="left" variant="subtitle2">
          This project is developed in order to meet the basic needs of african
          people by making the water available for as many as people we can
        </About>
      </AboutGrid>
    </MainGrid>
  );
};

export default Header;
