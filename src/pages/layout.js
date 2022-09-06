/**
 * Projet brisq
 * Auteurs        : De Bleser Dimitri, Peer Vincent, Rausis Justin
 * Nom de fichier : layout.js
 * Description    : Gestion des vues selon l'accès d'un client ou d'un employeur.
 *                  Le client perçoit uniquement une page de rendez-vous alors que
 *                  l'employeur a accès à diverses autres pour gérer la compagnie.
 */


import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { getToken, getUser } from '../auth';
import { Outlet, Link, useNavigate } from "react-router-dom";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Drawer } from "@mui/material";

const token = getToken();

// Les pages à afficher pour un employeur logué
const loggedPages = [
  {link: 'home', text: 'Home', icon: <HomeIcon />},
  {link: 'manageEmployee', text: 'Employee', icon: <PeopleAltIcon />},
];

// Les pages à afficher pour un client non logué
const unLoggedPages = [{link: 'home', text: 'Home', icon: <HomeIcon />}]

const pages = token == null ? unLoggedPages : loggedPages;

// Gestion de l'affichage de l'ensemble de l'application
const Layout = () => {
  React.useEffect(() => {
    document.body.classList.add('nav-padding');
  })

  // Variable d'état pour le volet ouvrant d'un compte logué
  const [openDrawer, setOpenDrawer] = React.useState(false); 
  
  // Adaptation de l'affichage selon que l'utilisateur est sur modile ou non
  const list = (mobile) => (
    
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={mobile == false ? () => {} : toggleDrawer}
      onKeyDown={mobile == false ? () => {} : toggleDrawer}
    >
      <List>
        {pages.map((page, index) => (
          <ListItem key={page.link} onClick={() => navigateClick(page.link)} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {page.icon}
              </ListItemIcon>
              <ListItemText primary={page.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const navigate = useNavigate();
  const token = getToken();
  const user = getUser();
  
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // Déconnecte un utilisateur
  const logout = (envent) => {
    localStorage.removeItem("token");
    window.location.replace("/login");
  }
  
  const toggleDrawer = (event) => { 
    setOpenDrawer(!openDrawer);
  };

  // Les handle à venir gèrent les ouvertures et fermetures du menu
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Redirige vers le profile après un clic sur le bouton profile
  const handleClickProfile = () => {
    window.location.replace("/profile");
  }

  // Remplace l'url actuel par un éventuel lien ciblé par un clic
  const navigateClick = (link) => {
    navigate(link, {replace: true})
    handleCloseNavMenu();
  };

  // Retourne le contenu html
  return (
    <>    
    <Drawer
      anchor={"left"}
      open={openDrawer}
      onClose={toggleDrawer}
      sx={{
        width: "260px",
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: "260px", boxSizing: 'border-box' },
        display : {xs: 'block', md: 'none' }
      }}
    >
    <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        {list(true)}
      </Box>
    </Drawer>

    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigateClick("/")}
            sx={{
              mr: 2,
              fontSize: '2.5rem',
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Nova Round',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#FFFFFF',
              textDecoration: 'none',
            }}
          >
            brisq
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              onClick={toggleDrawer}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => navigateClick("/")}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Nova Round',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            brisq
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          </Box>

          <Box sx={{ flexGrow: 0 }} style={{display: "inherit"}}>
            <Tooltip title="Open settings" style={{display: "inherit"}}>
              {
                token == null ?
                <Box sx={{ display: {xs: 'none', md: 'flex'} }}>
                  <Button 
                    onClick={() => navigateClick("/login")}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Se connecter
                  </Button> 
                  <Button 
                    onClick={() => navigateClick("/register")}
                    sx={{ my: 2, color: 'white', display: {xs: 'none', md: 'block' }}}
                  >
                    Créer un compte
                  </Button> 
                </Box>
                :
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user?.name} src="/static/images/avatar/2.jpg" />
                </IconButton>
              }
            </Tooltip>
            
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

              <MenuItem key={"profile"} onClick={handleClickProfile}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem key={"logout"} onClick={logout}>
                <Typography textAlign="center">Se déconnecter</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <Drawer
        variant="permanent"
        key="desktop"
        sx={{
          width: "260px",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: "260px", boxSizing: 'border-box' },
          display : {xs: 'none', md: 'block' }
        }}
    >
      <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          {list(false)}
        </Box>
    </Drawer>
    <Outlet style="backgound-color: 'red'"/>
    </>
  );
};
export default Layout;
