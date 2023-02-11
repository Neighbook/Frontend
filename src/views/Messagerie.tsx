import React, { useState, useEffect } from 'react';
import { Typography, Container, Box } from '@mui/material';
import PermanentDrawerRight from '../components/PermanentDrawerRight';
import type { User } from '../hook/user';
import ChatProfile from '../components/ChatProfile';

const Messagerie = () => {
    const [chattingWith, chatWith] = useState<User|null>(null);

    useEffect(() => {
        if(!chattingWith) {
            chatWith(FRIENDS[0]);
        }
    }, [chattingWith]);

    return (
        <Container component="main" maxWidth="xl">
            <Box sx={{ width: 'calc(100% - 240px)'}}>
                {
                    chattingWith &&
                    <ChatProfile photo={chattingWith.photo} nom={chattingWith.nom} prenom={chattingWith.prenom} />
                }
            </Box>
            <PermanentDrawerRight onSelect={chatWith} friends={FRIENDS} />
        </Container>
    );
};

export default Messagerie;

const FRIENDS = [
    {
        id: '123',
        prenom: 'Sofiane',
        nom: 'OUARDI',
        sexe: 'H',
        nom_utilisateur: 'soso',
        date_naissance: '',
        email: '',
        password: '',
        telephone: '',
        code_pays: '',
        photo: '',
        date_creation: new Date(),
        date_modification: new Date(),
        date_suppression: new Date(),
        actif: true
    },
    {
        id: '123',
        prenom: 'Audrey',
        nom: 'CISTERNE',
        sexe: 'H',
        nom_utilisateur: 'soso',
        date_naissance: '',
        email: '',
        password: '',
        telephone: '',
        code_pays: '',
        photo: '',
        date_creation: new Date(),
        date_modification: new Date(),
        date_suppression: new Date(),
        actif: true
    },
    {
        id: '123',
        prenom: 'Michel',
        nom: 'KAZADI',
        sexe: 'H',
        nom_utilisateur: 'tudi',
        date_naissance: '',
        email: '',
        password: '',
        telephone: '',
        code_pays: '',
        photo: '',
        date_creation: new Date(),
        date_modification: new Date(),
        date_suppression: new Date(),
        actif: true
    }
];
