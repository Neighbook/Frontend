import React from 'react';
import { Outlet } from 'react-router';
import {
    AppBar,
    Toolbar,
    Button,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <>
        <AppBar position="static">
            <Toolbar>
                <Button><NavLink to="/">Accueil</NavLink></Button>
                <Button><NavLink to="/marketplace">Marketplace</NavLink></Button>
                <Button><NavLink to="/health">Status</NavLink></Button>
            </Toolbar>
        </AppBar>
        <Outlet />
    </>
);

export default Header;
