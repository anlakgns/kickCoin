import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import DrawerMenu from './drawer';
import { useRouter } from 'next/router';

const MainGrid = styled(Grid)(({ theme }) => ({
  height: '6rem',
  padding: ' 1rem 2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const HeadlineButton = styled(Button)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.custom.blueLight,
  padding: 0,
  margin: 0,
  marginTop: '0.2rem',
  '& 	.MuiButton-root': {
    transition: 'none',
  },
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

const StyledMenuIcon = styled(MenuIcon)(({ theme }) => ({
  fontSize: '3rem',
  color: theme.palette.custom.blueLight,
}));

const NavBar = () => {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const drawerToggler = () => {
    setDrawerOpen(true);
  };

  return (
    <>
      <MainGrid>
        <HeadlineButton
          variation="text"
          size="large"
          onClick={() => router.push('/')}
          style={{ fontSize: '2.2rem' }}
        >
          Kick Coin
        </HeadlineButton>
        <IconButton onClick={drawerToggler}>
          <StyledMenuIcon />
        </IconButton>
      </MainGrid>
      <DrawerMenu drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
    </>
  );
};

export default NavBar;
