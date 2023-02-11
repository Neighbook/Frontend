import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { TextField } from '@mui/material';
import type { User } from '../hook/user';

const drawerWidth = 240;

interface Props {
	friends: Array<User>;
    onSelect: Function;
}

export default function PermanentDrawerRight({friends, onSelect}: Props) {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
                    
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="right"
            >
                <Typography variant="h6" sx={{ marginTop: '10px', fontWeight: 'bold' }} color='#64675A' textAlign={'center'}>Messagerie</Typography>
                <TextField sx={{ margin: '10px' }} type="text" placeholder='Rechercher'/> 
                <List>
                    {friends.map((friend, index) => (
                        <ListItem key={friend.nom} disablePadding onClick={() => {onSelect(friend);}}>
                            <ListItemButton>
                                <img
                                    style={{ marginRight: '10px', clipPath: 'circle()' }}
                                    src={friend.photo || 'https://cdn-icons-png.flaticon.com/128/1144/1144760.png'}
                                    alt={friend.nom}
                                    width={30}
                                />
                                <ListItemText primary={`${friend.nom || ''} ${friend.prenom || ''}`} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}