import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import logo from "/logo.svg";
import login from "/login.svg";



export default function Login() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <>
            <img src={logo} alt="logo"/>
            <Container component="main" maxWidth="md">
                <Typography component="h1" variant="h4" sx={{textAlign: 'center', marginTop: 15, fontWeight: 700}}>
                Bienvenue sur Neighbook, le réseau social de proximité !
                </Typography>
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                id="email"
                                margin="normal"
                                required
                                fullWidth
                                label="Email"
                                type="email"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="standard"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                id="email"
                                margin="normal"
                                required
                                fullWidth
                                label="Mot de Passe"
                                type="password"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="standard"
                                autoComplete="email"
                                autoFocus
                            />

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row-reverse',
                                }}
                            >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    sx={{ mt: 3, mb: 2, borderRadius: 0 }}
                                >
                            Connexion
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Container>
            <img src={login} alt="logo" style={{width: '100%', height: '40vh', position: 'absolute', left: '0px', bottom: '0px', 'object-fit': 'cover', 'object-position': "0 0"}}/>
        </>
    );
}