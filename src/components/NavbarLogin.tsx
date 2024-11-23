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
import { BatIcon } from './CustomIcons/CustomIcons';


const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];
const container = undefined;

interface NavbarProps {
    toggleTheme: () => void;  // Function that toggles the theme
    themeMode: "light" | "dark" | "dracula" ;      // Boolean indicating dark mode state
  }

interface IconChangeProps {
  themeMode: "light" | "dark" | "dracula" ;      // Boolean indicating dark mode state
}

function IconThemeChange({themeMode}: IconChangeProps){
  if(themeMode == "light"){
    return (
      <LightModeIcon fontSize="large" />
    )
  }else if(themeMode == "dark"){
    return(
    <DarkModeIcon fontSize="large"/>
    )
  }else{
    return(
      <BatIcon fontSize='large'/>
    )
  }

}

const NavbarLogin: React.FC<NavbarProps> = ({toggleTheme, themeMode}) => {


  

  return (
    <>
    <CssBaseline />
            <div style={{ display: 'flex', justifyContent:'flex-end', alignItems: 'center', paddingRight:'10px' }}>
                <IconButton onClick={toggleTheme} color="inherit" size="large">
                  <IconThemeChange themeMode={themeMode}/>
                </IconButton>
            </div>
    </>
  );
}

export default NavbarLogin;