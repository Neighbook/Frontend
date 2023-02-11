import React from 'react';
import { Typography } from '@mui/material';
import ChatProfile from '../components/messagerie/ChatProfile';
import PermanentDrawerRight from '../components/messagerie/PermanentDrawerRight';

const Messagerie = () => (
    <div>
        <Typography variant="h1">
            Messagerie
        </Typography>
        <ChatProfile profilePictureSrc='' name='Ayouuuuub'/>
        <PermanentDrawerRight friends={[{
            nom:'ayoub',
            prenom:'ayoub'
        }]}/>
    </div>
);

export default Messagerie;
