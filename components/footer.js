import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

const Footer = () => {
  return (
    <Box sx={{ width: "100%", marginTop:"5rem", backgroundColor:"red" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CrowdCoin
          </Typography>
          <Button variant="outline" endIcon={<AddIcon />}>
            Create Campaing
          </Button>
        </Toolbar>
    </Box>
  );
};

export default Footer;
