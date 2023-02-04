import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import logo from "/asset/images/logo.svg";
import CountrySelect from "../components/CountrySelect";
import {Grid, MenuItem} from "@mui/material";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {useState} from "react";
import {Link} from "react-router-dom";



export default function Register() {
    const [passwordError, setPasswordError] = useState(false);
    const [birthday, setBirthday] = useState<dayjs.Dayjs | null>(
        dayjs('2014-08-18T21:11:54')
    );
    const [formData, updateFormData] = React.useState({
        name: null,
        surname: null,
        username: null,
        birthday: '',
        country: null,
        number: null,
        sex: '',
        email: null,
        password: '',
        password2: '',
    });

    const handleFormChange = (event: React.ChangeEvent<HTMLFormElement>) => {
        updateFormData({
            ...formData,
            [event.target.name]: event.target.value as string
        });
    };

    const handleSelecthange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        updateFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(formData.password !== formData.password2){
            setPasswordError(true);
        }
        formData.birthday = birthday ? birthday.toISOString() : '';

        console.log(formData);
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
                                name="name"
                                margin="normal"
                                required
                                fullWidth
                                label="Nom"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="standard"
                                autoComplete="name"
                            />
                            <TextField
                                name="surname"
                                margin="normal"
                                required
                                fullWidth
                                label="Prenom"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="standard"
                                autoComplete="surname"
                            />
                            <TextField
                                name="username"
                                margin="normal"
                                required
                                fullWidth
                                label="Nom d'utilisateur"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="standard"
                                autoComplete="username"
                            />
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <TextField
                                        name="sex"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Sexe"
                                        select
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="standard"
                                        onChange={handleSelecthange}
                                        value={formData.sex}
                                    >
                                        <MenuItem value="M">M</MenuItem>
                                        <MenuItem value="F">F</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={9}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DesktopDatePicker
                                            label="Anniversaire"
                                            inputFormat="DD/MM/YYYY"
                                            value={birthday}
                                            onChange={setBirthday}
                                            renderInput={(params) => <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="standard"
                                                {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <CountrySelect onChange={handleSelecthange} value={formData.country} name="country"/>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        name="number"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Téléphone"
                                        type="tel"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="standard"
                                        autoComplete="phone"
                                    />
                                </Grid>
                            </Grid>
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
                            />
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        name="password"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Mot de Passe"
                                        type="password"
                                        error={passwordError}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="standard"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        name="password2"
                                        margin="normal"
                                        required
                                        error={passwordError}
                                        fullWidth
                                        label="Verification du mot de Passe"
                                        type="password"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="standard"
                                        autoComplete="new-password"
                                        helperText={passwordError&&"mot de passes différents."}
                                    />
                                </Grid>
                            </Grid>

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <Link to="/login">Se connecter</Link>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    sx={{ mt: 3, mb: 2, borderRadius: 0 }}
                                >
                            Inscription
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Container>
        </>
    );
}