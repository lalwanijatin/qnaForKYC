import  { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Box,
  Link,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRecoilState } from 'recoil';
import { currentUserInfoState } from '../state/CurrentUser';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../utils/properties';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [currentUserInfo, setCurrentUserInfo] = useRecoilState(currentUserInfoState);
  const navigate = useNavigate();

  function handleLogout(){
    setCurrentUserInfo(null)
  } 
  // Handle avatar menu
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseLogout = () => {
    setAnchorEl(null);

    const request = {
        method: "post",
        url: `${baseURL}api/logout`,
        withCredentials: true
      }

    axios.request(request);

    handleLogout()
    navigate("/")
  };

  // Handle mobile drawer toggle
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  // Navigation links
  const navLinks = currentUserInfo && currentUserInfo.upi_id ? 
  [
    { text: 'Home', href: '/' },
    { text: 'Comments', href: '/comments' },
  ] 
  : 
  [{text: 'Creators\' Login', href:"/login"}];

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        {/* Menu Icon for Mobile */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ display: { sm: 'none' }, mr: 2 }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>

        {/* Brand Logo */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" color="inherit" underline="none" sx={{ display: "flex", alignItems: "center" }}>
            <img 
              src="/askme/AskMeLogo.png" 
              alt="AskMe Logo" 
              style={{ height: "40px", marginRight: "8px" }}
            />
          </Link>
        </Typography>

        {/* Navigation Links for Larger Screens */}
        <Box sx={{ display: { xs: 'none', sm: 'block' }, mr: 2 }}>
            {navLinks.map((link) => (
                <Link
                key={link.text}
                component={RouterLink}  // Use RouterLink for client-side navigation
                to={link.href}          // Replace href with 'to'
                color="inherit"
                underline="none"
                sx={{ mx: 2 }}
                >
                {link.text}
                </Link>
            ))}
        </Box>

        { currentUserInfo && currentUserInfo.profile_picture &&
        <>
            <IconButton onClick={handleAvatarClick} color="inherit">
                {/* {currentUserInfo && currentUserInfo.profile_picture ? <Avatar referrerPolicy="no-referrer" src={currentUserInfo.profile_picture} alt="User Avatar" /> : <Avatar alt="User Avatar" />} */}
                <img
                    src={currentUserInfo.profile_picture}
                    referrerPolicy="no-referrer"
                    alt="User Avatar"
                    style={{
                      width: '40px',          // Adjust based on your Avatar size
                      height: '40px',
                      borderRadius: '50%',    // Makes it circular
                      objectFit: 'cover',     // Ensures the image maintains aspect ratio
                      border: '1px solid #ccc' // Optional: a subtle border for better visual appeal
                      }}
                />
            </IconButton>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={() => navigate("/creator")}>Profile</MenuItem>
                <MenuItem onClick={handleCloseLogout}>Logout</MenuItem>
            </Menu>
        </>
        }

      

        {/* Drawer for Mobile Navigation */}
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
                {navLinks.map((link) => (
                    <ListItem button key={link.text} component={RouterLink} to={link.href}>
                    <ListItemText primary={link.text} />
                    </ListItem>
                ))}
                </List>
          </Box>
          
        </Drawer>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
