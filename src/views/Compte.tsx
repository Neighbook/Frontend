import React, {useEffect, useState} from 'react';
import { Typography } from '@mui/material';
import {useAuth} from "../components/AuthProvider";
import type {User} from "../hook/user";
import {getUser} from "../hook/user";
import {CompteLoading} from "../components/Loading";

const Compte = () => {
    const {currentUser} = useAuth();
    const [userInfo, setUserInfo] = useState<User|null>(null);

    useEffect(()=>{
        const controller = new AbortController();
        if(currentUser) {
            getUser(currentUser.id, controller.signal).then(res => {
                setUserInfo(res);
                console.log(res);
            }).catch(()=>{
                controller.abort();
            });
        }
        return () => {
            controller.abort();
        };
    }, [currentUser]);

    if(!userInfo){
        return <CompteLoading />;
    }
    return (
        <>
            <Typography variant="h3">
                Compte:
            </Typography>
            <Typography variant="h5">
                prenom: {userInfo.prenom}
                <br/>
                nom: {userInfo.nom}
                <br/>
            </Typography>
        </>
    );
};

export default Compte;
