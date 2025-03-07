import * as React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
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
import AdbIcon from '@mui/icons-material/Adb';
import { extendTheme, ThemeProvider } from '@mui/material';
import 'tailwindcss';
import Dashboard from './Dashboard';
import Register from '../app/Regsiter/page';
import Login from '../app/Login/page';
import LandingPage from '../app/LandingPage/page';

const pages = ['About', 'Register', 'Login'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function ResponsiveAppBar() {
    console.log(window.location.pathname);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [pageChoice, setPageChoice] = React.useState('');

    const [user, setUser] = useState(null);

    const logoutUser = () => {
        setUser(null);
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (event) => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const lightDarkTheme = extendTheme({
        colorSchemes: { light: true, dark: false },
        colorSchemeSelector: 'class',
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 600,
                lg: 1200,
                xl: 1536,
            },
        },
    });

    return (
        <ThemeProvider theme={lightDarkTheme}>
            {user ? (
                <Dashboard />
            ) : (
                <AppBar color="white" sx={{ width: '100%' }} position="static">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <AdbIcon
                                sx={{
                                    display: { xs: 'none', md: 'flex' },
                                    mr: 1,
                                }}
                            />
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="#app-bar-with-responsive-menu"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                SAR FORGE
                            </Typography>

                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: { xs: 'flex', md: 'none' },
                                }}
                            >
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
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
                                        display: { xs: 'block', md: 'none' },
                                    }}
                                >
                                    {pages.map((page) => (
                                        <MenuItem
                                            sx={{ color: 'black' }}
                                            key={page}
                                            onClick={handleCloseNavMenu}
                                        >
                                            <Typography
                                                sx={{ textAlign: 'center' }}
                                            >
                                                {page}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                            <AdbIcon
                                sx={{
                                    display: { xs: 'flex', md: 'none' },
                                    mr: 1,
                                }}
                            />
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                href="#app-bar-with-responsive-menu"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'flex', md: 'none' },
                                    flexGrow: 1,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                SAR FORGE
                            </Typography>
                            <Box
                                sx={{
                                    textDecoration: 'none',
                                    flexGrow: 1,
                                    display: { xs: 'none', md: 'flex' },
                                }}
                            >
                                {pages.map((page) => (
                                    <Button
                                        key={page}
                                        href={`/${page}`}
                                        onClick={handleCloseNavMenu}
                                        sx={{
                                            textDecoration: 'none',
                                            my: 2,
                                            color: 'black',
                                            display: 'block',
                                        }}
                                    >
                                        {/* <Button 
                                        onClick={(e) => window.location.pathname = `/${e.target.value}`}
                                        >
                                        </Button> */}
                                        {page}
                                    </Button>
                                ))}
                            </Box>
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton
                                        onClick={handleOpenUserMenu}
                                        sx={{ p: 0 }}
                                    >
                                        <Avatar
                                            alt="J"
                                            src="/static/images/avatar/2.jpg"
                                        />
                                    </IconButton>
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
                                    {settings.map((setting) => (
                                        <MenuItem
                                            key={setting}
                                            onClick={handleCloseUserMenu}
                                        >
                                            <Typography
                                                sx={{ textAlign: 'center' }}
                                            >
                                                {setting}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            )}

            <Outlet context={{ user, setUser, logoutUser }} />
        </ThemeProvider>
    );
}
