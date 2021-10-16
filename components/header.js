import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/"> CrowdCoin </Link>
          </Typography>
          <Button variant="outline" endIcon={<AddIcon />}>
            <Link href="/campaigns/new"> Create Campaings </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
