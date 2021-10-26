import React from 'react';
import SideBar from './sidebar';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import NavBar from '../components/navBar';

const MainGrid = styled(Grid)(({ theme }) => ({
  background: theme.palette.custom.blueDark,
}));

const SubMainGrid = styled(Grid)(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'row',
  flexGrow: '1',
  '@media (max-width: 1000px)': {
    flexDirection: 'column',
  },
}));

const SideMenuGrid = styled(Grid)(({ theme }) => ({
  flex: 2,
}));
const NavBarGrid = styled(Grid)(({ theme }) => ({}));

const ContentGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  flex: 10,
  '@media (max-width: 1000px)': {
    flexGrow: 1,
  },
}));

const PatternGrid = styled('div')(({ theme }) => ({
  position: 'absolute',
  opacity: 0.15,
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  backgroundImage: `url(${'/patternClear.jpg'})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
}));

const Layout = ({ children }) => {
  // Responsive breakpoints
  const matches1000 = useMediaQuery('(max-width: 1000px)');

  return (
    <MainGrid container direction="row">
      <SubMainGrid>
        <PatternGrid />
        {matches1000 ? (
          <NavBarGrid>
            <NavBar />
          </NavBarGrid>
        ) : (
          <SideMenuGrid>
            <SideBar />
          </SideMenuGrid>
        )}
        <ContentGrid>{children}</ContentGrid>
      </SubMainGrid>
    </MainGrid>
  );
};

export default Layout;
