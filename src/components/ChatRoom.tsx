import { Typography, Box, TextField, Button } from "@mui/material";
import type { User } from "../hook/user";
import React, { useState } from 'react';
import type { Message } from "../hook/messagerie";
import { useAuth } from "./AuthProvider";
import { getOpenGraphTags } from "../utils/OpenGraph";
import type { OG_DATA } from "../utils/OpenGraph";

type Props = {
    members: Array<User>;
    messages: Array<Message>;
    sendMessage: Function;
}

const extractUrlsInText = (text: string) : RegExpMatchArray | null => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.match(urlRegex);
};

export default function ChatRoom({ members, messages, sendMessage }: Props) {
    const { currentUser } = useAuth();
    const [draft, setDraft] = useState<String>('');
    const [ogTags, setOgTags] = useState<Array<OG_DATA>>([]);

    const send = async () => {
        sendMessage(draft);
        setDraft('');
        const urls = extractUrlsInText(draft as string);
        if(urls && urls.length) {
            const res = await getOpenGraphTags(urls[0]);
            if(!(res instanceof Error)) {
                setOgTags([...ogTags, res]);
            }
        }
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
                                maxWidth: '420px',
                                background: msg.senderId === currentUser?.id ? '#E4E6BF' : '#879472',
                                padding: '5px 10px',
                                borderRadius: '5px'
                            }}>
                                <Typography
                                    variant="h6"
                                    fontWeight='bold'
                                    color='#64675A'
                                    component="div"
                                    style={{
                                        whiteSpace: 'pre-wrap',
                                        wordBreak: 'break-all'
                                    }}
                                >
                                    {msg.content}
                                </Typography>
                                {/* Open Graph integration */}
                                {
                                    ogTags.find(o => msg.content.includes(o.requestUrl)) ? 
                                        <Box
                                            style={{
                                                position: 'relative',
                                                borderRadius: '16px',
                                                border: '1px solid #ccc',
                                                background: '#f2f2f2',
                                                overflow: 'hidden',
                                                maxWidth: '400px'
                                            }}
                                        >
                                            <img
                                                style={{
                                                    width: 'auto',
                                                    height: 'auto',
                                                    maxWidth: '100%',
                                                    objectFit: 'cover'
                                                }}
                                                src={ogTags.find(o => msg.content.includes(o.requestUrl))?.ogImage.url}
                                                alt={ogTags.find(o => msg.content.includes(o.requestUrl))?.ogTitle}
                                            />
                                            <Box
                                                style={{
                                                    padding: '12px',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '1px'
                                                }}
                                            >
                                                <Typography
                                                    style={{
                                                        fontWeight: 'bold',
                                                        width: '100%',
                                                        overflow: 'hidden',
                                                        whiteSpace: 'nowrap',
                                                        textOverflow: 'ellipsis'
                                                    }}
                                                >
                                                    {
                                                        ogTags.find(o => msg.content.includes(o.requestUrl))?.ogTitle
                                                    }
                                                </Typography>
                                                <Typography
                                                    style={{
                                                        fontWeight: 'thin',
                                                        fontSize: '15px',
                                                        width: '100%',
                                                        overflow: 'hidden',
                                                        whiteSpace: 'nowrap',
                                                        textOverflow: 'ellipsis'
                                                    }}
                                                >
                                                    { ogTags.find(o => msg.content.includes(o.requestUrl))?.ogDescription}
                                                </Typography>
                                            </Box>
                                        </Box> : ''
                                }
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
                            void send();
                        }
                    }}
                /> 
                <Button type="button"
                    variant="contained"
                    color="secondary"
                    size="large" sx={{ height: '100%', justifyContent: 'left' }}
                    onClick={() => {
                        void send();
                    }}
                >
                    <b>Envoyer</b>
                </Button>
            </Box>
        </Box>
    );
}