import React from 'react';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Logo from '../Logo/Logo';

const Header = ({ toggleTheme, isDarkMode }) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Logo />
                <IconButton color="inherit" onClick={toggleTheme}>
                    {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;