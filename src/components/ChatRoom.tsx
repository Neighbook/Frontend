import { Typography, Box, TextField, Button } from "@mui/material";
import type { User } from "../hook/user";
import React, { useState } from 'react';
import type { Message } from "../hook/messagerie";
import { useAuth } from "./AuthProvider";

type Props = {
    members: Array<User>;
    messages: Array<Message>;
    sendMessage: Function;
}

export default function ChatRoom({ members, messages, sendMessage }: Props) {
    const { currentUser } = useAuth();
    const [draft, setDraft] = useState<String>('');

    const send = () => {
        sendMessage(draft);
        setDraft('');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '5px',
                flexGrow: 1
            }}
        >
            {/* Messages history */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: '5px',
                    flexGrow: 1,
                    width: '100%'
                }}
            >
                {
                    messages.map( (msg, id) => (
                        <Box key={id} sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: msg.senderId === currentUser?.id ? 'flex-end' : 'flex-start'
                        }}>
                            {
                                id === 0 || messages[id-1].senderId !== msg.senderId ?
                                    <Typography>
                                        {msg.senderId === currentUser?.id ? 'Moi' : members?.find(m => m.id === msg.senderId)?.prenom}
                                    </Typography> : ''
                            }
                            <Box sx={{
                                background: msg.senderId === currentUser?.id ? '#E4E6BF' : '#879472',
                                padding: '5px 10px',
                                borderRadius: '5px',
                                maxWidth: 'calc(100% - 50px)'
                            }}>
                                <Typography variant="h6" fontWeight='bold' color='#64675A' noWrap component="div">
                                    {msg.content}
                                </Typography>
                            </Box>
                            
                        </Box>
                    ))
                }
            </Box>

            <Box sx={{ margin: '10px', width: '100%', display: 'flex', position: 'relative', alignItems: 'center', gap: '5px' }}>
                <TextField
                    sx={{ flexGrow: 1 }}
                    type="text"
                    placeholder='Ton message ici'
                    value={draft}
                    onChange={e => { setDraft(e.target.value); }}
                    onKeyDown={e => {
                        const key=e.keyCode || e.which;
                        if (key===13){
                            send();
                        }
                    }}
                /> 
                <Button type="button"
                    variant="contained"
                    color="secondary"
                    size="large" sx={{ height: '100%', justifyContent: 'left' }}
                    onClick={send}
                >
                    <b>Envoyer</b>
                </Button>
            </Box>
        </Box>
    );
}