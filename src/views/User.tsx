import React, {useEffect, useState} from 'react';
import { Box, Button, Divider, Typography} from '@mui/material';
import type {User} from "../hook/user";
import {UserLoading} from "../components/Loading";
import '../css/Compte.css';
import defaultPfp from "/asset/images/pfp.png";
import {useParams} from "react-router";
import {useAuth} from "../components/AuthProvider";
import {unfollow, follow, getFollowers} from "../hook/follow";

const UserView = () => {
    const { userId } = useParams();
    const {currentUser, usersBase, follows, reloadFollows} = useAuth();
    const [userInfo, setUserInfo] = useState<User|null>(null);
    const [followers, setFollowers] = useState<number|null>(null);

    const isFollowing = follows?.find(follow=>follow.id === userId);


    useEffect(() => {
        const controller = new AbortController();
        setFollowers(null);
        if(userId !== undefined) {
            getFollowers(userId, controller.signal).then(res=> {
                setFollowers(res.length);
            }).catch(()=>null);
        }
        return () => {
            controller.abort();
        };
    },[userId]);

    useEffect(()=>{
        if(userId !== undefined && usersBase){
            setUserInfo(usersBase.find(user=>user.id===userId) ?? null);
        }
    }, [userId, usersBase]);

    const handleFollow = () => {
        if(userId !== undefined && followers !== null) {
            let promise;
            if (isFollowing) {
                promise = unfollow(userId);
                setFollowers(followers-1);
            } else {
                promise = follow(userId);
                setFollowers(followers+1);
            }
            promise.then(()=> {
                reloadFollows();
            }).catch(()=>null);
        }
    };

    if(!userInfo){
        return <UserLoading />;
    }
    return (
        <Box ml={5}>
            <Typography variant="h5">
                <b>{userInfo.nom_utilisateur}</b><br/>
                {followers} Followers
            </Typography>
            <Box mt={5} ml={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <img src={userInfo.photo ?? defaultPfp}
                    className="pfp"
                    style={{aspectRatio:'1/1', objectFit: 'cover'}}
                    alt="profile"
                    onError={({currentTarget})=>currentTarget.src=defaultPfp}
                />
                <Box ml={3} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Button type="button"
                        variant="contained"
                        color="secondary"
                        size="large" sx={{borderRadius: 0, mb: 2, justifyContent: 'left' }}
                        disabled={currentUser?.id === userId}
                        onClick={handleFollow}
                    >
                        <b>{isFollowing?"✓ Suivi":"+ Suivre"}</b>
                    </Button>
                    <Button type="button"
                        variant="contained"
                        color="error"
                        disabled={currentUser?.id === userId}
                        size="large" sx={{borderRadius: 0, justifyContent: 'left', backgroundColor: '#FFDCDC', color: "#FF5656" }}
                    >
                        <b>Bloquer</b>
                    </Button>
                </Box>
                <Divider/>
            </Box>
        </Box>
    );
};

export default UserView;
