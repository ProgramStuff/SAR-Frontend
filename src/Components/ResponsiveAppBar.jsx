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
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import { extendTheme, ThemeProvider } from '@mui/material';
import 'tailwindcss';
import Dashboard from './Dashboard';
import Login from '../app/Login/page';

const pages = ['About', 'Login'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function ResponsiveAppBar() {
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
                <Dashboard user={user} />
            ) : (
                <AppBar color="white" sx={{ width: '100%' }} position="static">
                    <Container maxWidth="xl" sx={{ ml: 0, width: '100%' }}>
                        <Toolbar sx={{ width: '100%' }} disableGutters>
                            <Link href="/">
                                <Box
                                    component="img"
                                    src="src\app\Branding\icon.png"
                                    sx={{
                                        width: '3vw',
                                        display: { xs: 'none', md: 'flex' },
                                    }}
                                />
                            </Link>
                            <Link href="/">
                                <Box
                                    component="img"
                                    src="src\app\Branding\profileThin.png"
                                    sx={{
                                        width: '10vw',
                                        display: { xs: 'none', md: 'flex' },
                                    }}
                                />
                            </Link>

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
                                            sx={{ color: '#037AFF' }}
                                            key={page}
                                            onClick={handleCloseNavMenu}
                                        >
                                            <Button
                                                href={`/${page}`}
                                                sx={{
                                                    textDecoration: 'none',
                                                    color: '#037AFF',
                                                    display: 'block',
                                                }}
                                            >
                                                <Typography
                                                    sx={{ textAlign: 'center' }}
                                                >
                                                    {page}
                                                </Typography>
                                            </Button>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>

                            <Link href="/">
                                <Box
                                    component="img"
                                    src="src\app\Branding\icon.png"
                                    sx={{
                                        width: '8vw',
                                        display: { md: 'none' },
                                    }}
                                />
                            </Link>
                            <Link href="/">
                                <Box
                                    component="img"
                                    src="src\app\Branding\profileThin.png"
                                    sx={{
                                        width: '32vw',
                                        display: { md: 'none' },
                                    }}
                                />
                            </Link>
                            <Box
                                sx={{
                                    textDecoration: 'none',
                                    flexGrow: 1,
                                    display: {
                                        xs: 'none',
                                        md: 'flex',
                                        lg: 'flex',
                                    },
                                    justifyContent: 'flex-end',
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
                                            color: '#037AFF     ',
                                            display: 'block',
                                        }}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            )}

            <Outlet context={{ user, setUser, logoutUser }} />
        </ThemeProvider>
    );
}
