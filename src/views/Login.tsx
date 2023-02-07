import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import logo from "/asset/images/logo.svg";
import login from "/asset/images/login.svg";
import '../css/Login.css';
import {Link} from "react-router-dom";
import {useState} from "react";
import {useAuth} from "../components/AuthProvider";
import {Navigate} from "react-router";
import {CircularProgress} from "@mui/material";


export default function Login() {
    const {onLogin, isLoggedIn} = useAuth();
    const [authError, setAuthError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, updateFormData] = React.useState({
        email: '',
        password: ''
    });


    if(isLoggedIn()){
        return <Navigate to="/" />;
    }

    const handleFormChange = (event: React.ChangeEvent<HTMLFormElement>) => {
        updateFormData({
            ...formData,
            [event.target.name]: event.target.value as string
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(onLogin) {
            setLoading(true);
            onLogin(formData.email, formData.password).catch(() => {
                setAuthError(true);
                setLoading(false);
            });
        }
    };

    return (
        <>
            <img src={logo} alt="logo"/>
            <Container component="main" maxWidth="md">
                <Typography component="h1" variant="h4" sx={{textAlign: 'center', marginTop: '10vh', fontWeight: 700}}>
                    Bienvenue sur Neighbook, le réseau social de proximité !
                </Typography>
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: '5vh',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Box component="form" onSubmit={handleSubmit} onChange={handleFormChange} sx={{ mt: 1 }}>
                            <TextField
                                name="email"
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
                                name="password"
                                margin="normal"
                                error={authError}
                                helperText={authError&&"L'email et le mot de passe ne correspondent pas"}
                                required
                                fullWidth
                                label="Mot de Passe"
                                type="password"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="standard"
                                autoComplete="email"
                            />

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <Link to="/register" style={{color: "#64675A"}}>Créer un compte</Link>
                                <Box sx={{ position: 'relative' }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                        size="large"
                                        disabled={loading}
                                        sx={{ mt: 3, mb: 2, borderRadius: 0 }}
                                    >
                                        Connexion
                                    </Button>
                                    {loading && (
                                        <CircularProgress
                                            size="30px"
                                            sx={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                marginTop: '-12px',
                                                marginLeft: '-15px',
                                            }}
                                        />
                                    )}
                                </Box>

                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Container>
            <img src={login} alt="logo" className="bottom-illustration" />
        </>
    );
}