import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Avatar, Box, Menu, MenuItem } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function TopAppBar() {

    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {

        handleMenuClose();
        logout(navigate);

    };

    const handleSettings = () => {

        handleMenuClose();
        navigate('/settings');

    };

    return (

        <AppBar position="fixed">

            <Toolbar>

                <Typography variant="h6" noWrap component="div" sx={{ mr: 5 }}>
                    Inscribed
                </Typography>

                <Search>

                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>

                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />

                </Search>

                <Box sx={{ flexGrow: 1 }} />

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                }}>

                    <Typography>{user ? user.username : '...Fetching'}</Typography>
                    
                    <IconButton color="inherit" onClick={handleAvatarClick}>
                        <Avatar alt={user ? user.username : 'user'} src={user ? user.profilePic : ''} />
                    </IconButton>

                </Box>

            </Toolbar>

            {/* Menu options */}
            <Menu
                id="avatar-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={handleSettings}>Settings</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>

        </AppBar>
    );
}
