import React, { useContext } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Avatar, Box } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';

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

    const { user } = useContext(AuthContext);

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
                    
                    <IconButton color="inherit">
                        <Avatar alt={user ? user.username : 'user'} src={user ? user.profilePic : ''} />
                    </IconButton>

                </Box>

            </Toolbar>

        </AppBar>
    );
}
