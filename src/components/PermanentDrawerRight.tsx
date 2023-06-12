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
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import { Button, Fab, TextField } from '@mui/material';
import type { User } from '../hook/user';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Form } from 'react-router-dom';

const drawerWidth = 240;

interface Props {
	friends: Array<User>;
    onSelect: Function;
}

const modalStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
  
const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

const getStyles = (name: string, personName: Array<string>, theme: Theme) => {
    return {
        fontWeight:
            !personName.includes(name)
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
};


export default function PermanentDrawerRight({friends, onSelect}: Props) {
    const [modalOpen, setModalOpen] = React.useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);
    const [personName, setPersonName] = React.useState<string[]>([]);
    const theme = useTheme();
    



    const handleNewGroupChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleNewGroupCreation = () => {
        //TODO call backend to create group, add group to right panel
        setPersonName([]);
        setModalOpen(false);
    };

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
                
                <Button variant='outlined' onClick={handleModalOpen}>
                    <AddIcon />
                    Créer un groupe
                </Button>
                <Modal
                    open={modalOpen}
                    onClose={handleModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <Box sx={modalStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Nouveau groupe
                        </Typography>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            {/* <InputLabel id="new_group_name">Nom</InputLabel> */}
                            <TextField type='text' label='Nom'/>
                        </FormControl>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="members-label">Membres</InputLabel>
                            <Select
                                labelId="members-label"
                                id="members-select"
                                multiple
                                value={personName}
                                onChange={handleNewGroupChange}
                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {friends.map((friend, index) => (
                                    <MenuItem
                                        key={index}
                                        value={friend.nom}
                                    >
                                        {friend.nom} {friend.prenom}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, width: 20 }}>
                            <Button variant='contained' onClick={handleNewGroupCreation}>Créer</Button>
                        </FormControl>
                        
                    </Box>
                </Modal>
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