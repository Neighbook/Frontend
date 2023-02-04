import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import logo from '/asset/images/logo.svg';
import './SideBar.css';
import home from '/asset/images/home.svg';
import marketplace from '/asset/images/marketplace.svg';
import social from '/asset/images/social.svg';
import messagerie from '/asset/images/messagerie.svg';
import account from '/asset/images/account.svg';
import logout from '/asset/images/logout.svg';
import {Link} from "react-router-dom";
import {Button} from "@mui/material";

interface Props{
    icon: string;
    text: string;
    url: string;
}

const SideBarItem = ({icon, text, url}: Props) => (
    <ListItem>
        <Link to={url} className="sidebar-link">
            <ListItemButton>
                <ListItemIcon sx={{ mr: 0.5 }}><img src={icon} alt={text}/></ListItemIcon>
                <ListItemText primary={text}/>
            </ListItemButton>
        </Link>
    </ListItem>
);

export default function SideBar() {
    const drawer = (
        <>
            <Box sx={{display: 'flex', justifyContent: 'center',  m: 4}}>
                <Link to="/"><img src={logo} alt="logo" className='sidebar-logo'/></Link>
            </Box>
            <List>
                <SideBarItem icon={home} text="Accueil" url="/"/>
                <SideBarItem icon={social} text="Social" url="/social"/>
                <SideBarItem icon={marketplace} text="Marketplace" url="/marketplace"/>
                <SideBarItem icon={messagerie} text="Messagerie" url="/messagerie"/>
            </List>
            <List style={{ marginTop: `auto` }} >
                <SideBarItem icon={account} text="Mon compte" url="/compte"/>
                <ListItem>
                    <Button variant="contained" fullWidth sx={{borderRadius: '25px'}} color="error" className="sidebar-logout">
                        <img src={logout} alt="Déconnexion"/>
                        <span>Déconnexion</span>
                    </Button>
                </ListItem>
            </List>
        </>
    );

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 287,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 287, boxSizing: 'border-box', boxShadow: 4 },
            }}
        >
            {drawer}
        </Drawer>
    );
}
