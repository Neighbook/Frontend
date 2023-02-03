import React from 'react';
import { Typography } from '@mui/material';
import {useAuth} from "../components/AuthProvider";

const Compte = () => {
    const {user} = useAuth();

    return (
        <>
            <Typography variant="h3">
                Compte:
            </Typography>
            <Typography variant="h5">
                prenom: {user?.firstname}
                <br/>
                nom: {user?.lastname}
                <br/>
            </Typography>
        </>
    );
};

export default Compte;
