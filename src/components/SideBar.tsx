import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import logo from '/asset/images/logo.svg';
import '../css/SideBar.css';
import home from '/asset/images/home.svg';
import marketplace from '/asset/images/marketplace.svg';
import social from '/asset/images/social.svg';
import messagerie from '/asset/images/messagerie.svg';
import calendar from '/asset/images/calendar.png';
import account from '/asset/images/account.svg';
import logout from '/asset/images/logout.svg';
import {Link} from "react-router-dom";
import {Button, Divider} from "@mui/material";
import {useAuth} from "./AuthProvider";
import {UserSearch} from "./UserSearch";

interface SidebarItemProps{
    icon: string;
    text: string;
    url: string;
}

const SideBarItem = ({icon, text, url}: SidebarItemProps) => (
    <ListItem>
        <Link to={url} className="sidebar-link">
            <ListItemButton>
                <ListItemIcon sx={{ mr: 0.5, height: "3rem", aspectRatio: 1 }}><img src={icon} alt={text}/></ListItemIcon>
                <ListItemText primary={text}/>
            </ListItemButton>
        </Link>
    </ListItem>
);

export default function SideBar() {
    const {onLogout} = useAuth();

    const handleClick = () => {
        onLogout();
    };

    const drawer = (
        <>
            <Box sx={{display: 'flex', justifyContent: 'center',  mt: 2}}>
                <Link to="/"><img src={logo} alt="logo" className='sidebar-logo'/></Link>
            </Box>
            <List>
                <ListItem>
                    <UserSearch/>
                </ListItem>
                <Divider sx={{mt: 2, mb: 2}} />
                <SideBarItem icon={home} text="Accueil" url="/"/>
                <SideBarItem icon={social} text="Social" url="/social"/>
                <SideBarItem icon={marketplace} text="Marketplace" url="/marketplace"/>
                <SideBarItem icon={messagerie} text="Messagerie" url="/messagerie"/>
                <SideBarItem icon={calendar} text="Calendrier" url="/calendar"/>
            </List>
            <List style={{ marginTop: `auto` }} >
                <SideBarItem icon={account} text="Mon compte" url="/compte"/>
                <ListItem>
                    <Button variant="contained"
                        fullWidth
                        sx={{borderRadius: '25px', backgroundColor: '#FFDCDC'}}
                        className="sidebar-logout"
                        color="error"
                        onClick={handleClick}
                    >
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
