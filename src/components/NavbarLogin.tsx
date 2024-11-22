import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";


const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];
const container = undefined;

interface NavbarProps {
    toggleTheme: () => void;  // Function that toggles the theme
    isDarkMode: boolean;      // Boolean indicating dark mode state
  }

const NavbarLogin: React.FC<NavbarProps> = ({toggleTheme, isDarkMode}) => {


  return (
    <>
    <CssBaseline />
            <div style={{ display: 'flex', justifyContent:'flex-end', alignItems: 'center', paddingRight:'10px' }}>
                <IconButton onClick={toggleTheme} color="inherit" size="large">
                {isDarkMode ? <LightModeIcon fontSize="large" /> : <DarkModeIcon fontSize="large"/>}
                </IconButton>
            </div>
    </>
  );
}

export default NavbarLogin;