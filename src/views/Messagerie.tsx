import React, { useState, useEffect, useRef } from "react";
import { Typography, Container, Box } from "@mui/material";
import PermanentDrawerRight from "../components/PermanentDrawerRight";
import type { User } from "../hook/user";
import { useAuth } from "../components/AuthProvider";
import { getUsers } from "../hook/user";
import ChatProfile from "../components/ChatProfile";
import io, { type Socket } from "socket.io-client";
import ChatRoom from "../components/ChatRoom";
import type { ClientToServerEvents, ServerToClientEvents } from "../models/Socket";
import { GroupRoom, getGroups, getMessages } from "../hook/messagerie";
import type { Message } from "../hook/messagerie";

const Messagerie = () => {
    const { currentUser } = useAuth();
    const [chattingWith, setChatWith] = useState<User | GroupRoom | null>(null);
    const [friends, setFriends] = useState<Array<User>>([]);
    const [groups, setGroups] = useState<Array<GroupRoom>>([]);
    const [messages, _setMessages] = useState<Array<Message>>([]);
    const _messages = useRef<Array<Message>>([]);
    const setMessages = (data: Array<Message>) => {
        _messages.current = data;
        _setMessages(data);
    };

    const [roomId, setRoomId] = useState<string>("");

    const socket = useRef<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        if (currentUser && currentUser.id) {
            socket.current = io("https://demo.neighbook.tech/", {
                transports: ["websocket"],
            });
            socket.current.on("connect", () => {
                getUsers(controller.signal)
                    .then((list) => {
                        if (list && list.length) {
                            setFriends(list);
                            startChattingWithFriend(list[0]);
                        }
                    })
                    .catch((e) => { console.log(e); });
                if(currentUser) {
                    getGroups(currentUser.id, controller.signal)
                        .then((list) => {
                            if (list && list.length) {
                                setGroups(list);
                                console.log(list);
                            }
                        })
                        .catch((e) => { console.log(e); });
                }
            });

            socket.current.on("disconnect", () => {
                setChatWith(null);
            });

            socket.current.on("roomJoined", (data) => {
                setRoomId(data.roomId);
            });

            socket.current.on("messageReceived", (data) => {
                if (data.content) {
                    setMessages([..._messages.current, { senderId: data.senderId, content: data.content }]);
                }
            });
            // socket.current.onAny((event, ...args) => {
            //     console.log(event, args);
            // });
        }
        return () => {
            if (socket.current) {
                socket.current.off("connect");
                socket.current.off("disconnect");
                socket.current.off("messageReceived");
            }
            controller.abort();
        };
    }, [currentUser]);

    const startChattingWithFriend = (target: User) => {
        if (!socket.current || !currentUser || !currentUser.id || !target || !target.id) {
            return;
        }

        socket.current.emit("connectToSomeone", {
            receiverId: target.id,
            senderId: currentUser.id,
        });
        setChatWith(target);

        // fetch messages history
        const controller = new AbortController();
        getMessages(currentUser.id, target.id, controller.signal)
            .then(history => {
                if(history) {
                    setMessages(history);
                }
            })
            .catch(e => {
                console.log(e);
            });
    };

    const startChattingWithGroup = (target: GroupRoom) => {
        if (!socket.current || !currentUser || !currentUser.id || !target || !target.id) {
            return;
        }

        socket.current.emit("connectToGroup", {
            roomId: target.id
        });
        setChatWith(target);

        // fetch messages history
        const controller = new AbortController();
        getMessages(currentUser.id, target.id, controller.signal)
            .then(history => {
                if(history) {
                    setMessages(history);
                }
            })
            .catch(e => {
                console.log(e);
            });
        
    };

    const sendMessage = (msg: string) => {
        if (!socket.current || !currentUser || !chattingWith) return;
        setMessages([...messages, { senderId: currentUser.id, content: msg }]);
        socket.current.emit("messageSended", {
            roomId: roomId,
            content: msg,
            date: new Date(),
            isRoomMessage: false,
            receiverOrRoomId: chattingWith.id,
            senderId: currentUser.id,
        });
    };

    return (
        <Container component="main" maxWidth="xl" sx={{ height: "calc(100vh - 48px)" }}>
            <Box sx={{ width: "calc(100% - 240px)", height: "100%", display: "flex", flexDirection: "column" }}>
                {chattingWith && (
                    <>
                        <ChatProfile
                            photo={chattingWith?.name ? 'https://cdn-icons-png.flaticon.com/128/1769/1769041.png': 'https://cdn-icons-png.flaticon.com/128/1144/1144760.png'}
                            nom={chattingWith?.name || `${chattingWith.nom || ''} ${chattingWith.prenom || ''}`}
                        />
                        <ChatRoom
                            sendMessage={sendMessage}
                            members={(chattingWith && chattingWith.idUtilisateurs) ? friends.filter(f => chattingWith.idUtilisateurs.includes(f.id)) : [chattingWith]}
                            messages={messages}
                        />
                    </>
                )}
            </Box>
            <PermanentDrawerRight
                onSelectFriend={startChattingWithFriend}
                onSelectGroup={startChattingWithGroup}
                onCreateGroup={(group: GroupRoom) => setGroups([...groups, group])}
                friends={friends}
                groups={groups}
            />
        </Container>
    );
};

export default Messagerie;

const FRIENDS = [
    {
        id: "123",
        prenom: "Sofiane",
        nom: "OUARDI",
        sexe: "H",
        nom_utilisateur: "soso",
        date_naissance: "",
        email: "",
        password: "",
        telephone: "",
        code_pays: "",
        photo: "",
        date_creation: new Date(),
        date_modification: new Date(),
        date_suppression: new Date(),
        actif: true,
    },
    {
        id: "123",
        prenom: "Audrey",
        nom: "CISTERNE",
        sexe: "H",
        nom_utilisateur: "soso",
        date_naissance: "",
        email: "",
        password: "",
        telephone: "",
        code_pays: "",
        photo: "",
        date_creation: new Date(),
        date_modification: new Date(),
        date_suppression: new Date(),
        actif: true,
    },
    {
        id: "123",
        prenom: "Michel",
        nom: "KAZADI",
        sexe: "H",
        nom_utilisateur: "tudi",
        date_naissance: "",
        email: "",
        password: "",
        telephone: "",
        code_pays: "",
        photo: "",
        date_creation: new Date(),
        date_modification: new Date(),
        date_suppression: new Date(),
        actif: true,
    },
];
