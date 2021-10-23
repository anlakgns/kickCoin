import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import SideBar from '../components/sidebar';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  height: '100vh',
}));

const DrawerMenu = ({ drawerOpen, setDrawerOpen }) => {
  return (
    <StyledDrawer
      anchor="left"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
    >
      <SideBar setDrawerOpen={setDrawerOpen}  />
    </StyledDrawer>
  );
};

export default DrawerMenu;
