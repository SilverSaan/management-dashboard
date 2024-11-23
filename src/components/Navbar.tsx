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
import { Badge } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import { BatIcon } from './CustomIcons/CustomIcons';
import Notifications from './NotificationBar';
import { redirect } from 'next/navigation'

const drawerWidth = 240;
const navItems = [

  {text:'Home', href: '/'},
  {text:'About', href: '/about'},
  {text:'Contact', href: '/'}
];
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

const Navbar: React.FC<NavbarProps> = ({toggleTheme, themeMode}) => {
    
  const [mobileOpen, setMobileOpen] = React.useState(false);


  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        ABP: ARC 
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} onClick={(e) => {
                e.preventDefault();
                redirect(item.href);
              }}
              >
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
    <CssBaseline /><AppBar component="nav" position="static">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: 'none' } }}
              >
                  <MenuIcon />
              </IconButton>
              <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                  Admin Bot Panel: Arc
              </Typography>
              <Notifications/>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  {navItems.map((item) => (
                      <Button key={item.text} sx={{ color: '#fff' }} onClick={() => redirect(item.href)}>
                          {item.text}
                      </Button>
                  ))}
              </Box>
              
            <div style={{ justifyContent:'right', alignItems: 'center' }}>
                <IconButton onClick={toggleTheme} color="inherit" size="large">
                  <IconThemeChange themeMode={themeMode}/>
                </IconButton>
            </div>
          </Toolbar>
      </AppBar>
      <nav>
        <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
        >
            {drawer}
        </Drawer>
    </nav>
    </>
  );
}

export default Navbar;