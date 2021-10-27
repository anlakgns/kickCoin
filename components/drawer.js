import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import SideBar from '../components/sidebar';

const StyledDrawer = styled(Drawer)(() => ({
  height: '100vh',
  ".MuiDrawer-paper": {
    display: "unset !important"
}
}));

const DrawerMenu = ({ drawerOpen, setDrawerOpen }) => {
  return (
    <StyledDrawer
      anchor="left"
      open={drawerOpen}
      ModalProps={{
        keepMounted: true,
      }}
      onClose={() => setDrawerOpen(false)}
    >
      <SideBar setDrawerOpen={setDrawerOpen} />
    </StyledDrawer>
  );
};

export default DrawerMenu;
