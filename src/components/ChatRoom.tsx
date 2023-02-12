import { Typography, Box, TextField, Button } from "@mui/material";
import type { User } from "../hook/user";
import React, { useState } from 'react';

type Props = {
	me: User;
	receiver: User;
  messages: [];
  sendMessage: Function;
}

export default function ChatRoom({ me, receiver, messages, sendMessage }: Props) {
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
                    alignItems: 'center',
                    gap: '5px',
                    flexGrow: 1
                }}
            >

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
                            send()
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