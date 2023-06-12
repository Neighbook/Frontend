import React, { useState, useEffect, useRef } from 'react';
import { Typography, Container, Box } from '@mui/material';
import PermanentDrawerRight from '../components/PermanentDrawerRight';
import type { User } from '../hook/user';
import {useAuth} from "../components/AuthProvider";
import {getUsers} from "../hook/user";
import ChatProfile from '../components/ChatProfile';
import io, { type Socket } from "socket.io-client";
import ChatRoom from '../components/ChatRoom';
import type { ClientToServerEvents, ServerToClientEvents } from "../models/Socket";

interface Message {
    sender: string;
    message: string;
}

const Messagerie = () => {
    const {currentUser} = useAuth();
    const [chattingWith, setChatWith] = useState<User|null>(null);
    const [friends, setFriends] = useState<User[]>([]);
    const [messages, _setMessages] = useState<Array<Message>>([]);
    const _messages = useRef<Array<Message>>([]);
    const setMessages = (data: Array<Message>) => {
        _messages.current = data;
        _setMessages(data);
    };

    const [roomId, setRoomId] = useState<string>("");

    const socket = useRef<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);

    useEffect(() => {
        if(currentUser && currentUser.id) {
            socket.current = io("https://demo.neighbook.tech", {
                transports: ["websocket"],
            });
            socket.current.on("connect", () => {
                getUsers().then(list => {
                    if(list && list.length) {
                        setFriends(list);
                        startChattingWith(list[0]);
                    }
                }).catch(e => console.log(e));
            });

            socket.current.on("disconnect", () => {
                setChatWith(null);
            });

            socket.current.on("roomJoined", (data) => {
                setRoomId(data.roomId);
            });

            socket.current.on("messageReceived", (data) => {
                if(data) {
                    setMessages([..._messages.current, { sender: 'him', message: data.message }]);
                }
            });
            // socket.current.onAny((event, ...args) => {
            //     console.log(event, args);
            // });
        }
        return () => {
            if(socket.current) {
                socket.current.off("connect");
                socket.current.off("disconnect");
                socket.current.off("messageReceived");    
            }
        };
    }, [currentUser]);

    const startChattingWith = ( friend: User ) => {
        if(!socket.current || !currentUser || !currentUser.id || !friend || !friend.id) {
            return;
        }

        socket.current.emit("connectToSomeone", {
            receiverId: friend.id,
            senderId: currentUser.id,
        });
        setChatWith(friend);
    };

    const sendMessage = (msg: string) => {
        if(socket.current) {
            setMessages([...messages, { sender: 'me', message: msg}]);
            socket.current.emit("messageSended", {
                roomId: roomId,
                message: msg
            });
        }
    };

    return (
        <Container component="main" maxWidth="xl" sx={{ height: 'calc(100vh - 48px)'}} >
            <Box sx={{ width: 'calc(100% - 240px)', height: '100%', display: 'flex', flexDirection: 'column'}}>
                {
                    chattingWith &&
                    <>
                        <ChatProfile photo={chattingWith.photo} nom={chattingWith.nom} prenom={chattingWith.prenom} />
                        <ChatRoom sendMessage={sendMessage} receiver={chattingWith} messages={messages} />
                    </>
                }
            </Box>
            <PermanentDrawerRight onSelect={startChattingWith} friends={friends} />
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
