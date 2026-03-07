
import ButtonSecondary from "./buttons/button-secondary.component";
import ButtonLogin from "./buttons/button-login.component";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import NotesIcon from '@mui/icons-material/Notes';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

const pages = ['Features', 'How it works', 'Pricing', 'Blog'];
const pagesMobile = ['Features', 'How it works', 'Pricing', 'Blog', 'Request Demo', 'Login'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);


  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  


  return (
    <AppBar
      position="static"
      sx={{ pb: 1, pt: 1, mb: 6, backgroundColor: '#f5f5f5' }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component='img'
            src="/MENUUI_6_o6upjt.png"
            alt="logo"
            sx={{
              height: 45,
              width: 200,
              maxHeight: { xs: 35, md: 45 },
            }}
          />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>

            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: 'block', textTransform: 'none', fontWeight: '500' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>

            <ButtonLogin />
            <ButtonSecondary />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', justifyContent: 'flex-end' } }}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{
                color: '#5e2791'
              }}
            >
              <NotesIcon
                style={{ color: '#5e2791' }}
                sx={{ fontSize: 40 }}
              />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none', backgroundColor: 'inherit' },

              }}

            >
              {pagesMobile.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography color='text.secondary' textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
