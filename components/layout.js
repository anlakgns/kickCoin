import React from 'react';
import SideBar from './sidebar';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

const MainGrid = styled(Grid)(({ theme }) => ({
  height: '100vh',
  position:"relative"
}));

const SideMenuGrid = styled(Grid)(({ theme }) => ({
  background: theme.palette.custom.blueDark,
}));

const ContentGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const PatternGrid = styled('div')(({ theme }) => ({
  position: 'absolute',
  opacity: 0.15,
  top: 0,
  left: 0,
  height: '100vh',
  width: "100%",
  backgroundImage: `url(${'/patternClear.jpg'})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
}));

const Layout = ({ children }) => {
  return (
    <MainGrid container direction="row">
      <PatternGrid />
      <SideMenuGrid item xs={2}>
        <SideBar />
      </SideMenuGrid>
      <ContentGrid item xs={10}>
        {children}
      </ContentGrid>
    </MainGrid>
  );
};

export default Layout;
