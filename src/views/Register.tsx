import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import logo from "/logo.svg";
import login from "/login.svg";
import CountrySelect from "../components/CountrySelect";
import {Grid, MenuItem} from "@mui/material";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {useState} from "react";



export default function Register() {
    const [passwordError, setPasswordError] = useState(false)
    const [birthday, setBirthday] = useState<Dayjs | null>(
        dayjs('2014-08-18T21:11:54')
    );
    const [formData, updateFormData] = React.useState({
            name: null,
            surname: null,
            country: null,
            number: null,
            sex: '',
            email: null,
            password: null,
            password2: null,
        });

    const handleChange = (e: any) => {
        console.log(e)
        updateFormData({
            ...formData,
            [e.target.id || e.target.name]: e.target.value
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData);
        if(formData.password !== formData.password2){
            setPasswordError(true)
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
                        <Box component="form" onSubmit={handleSubmit} onChange={handleChange} noValidate sx={{ mt: 1 }}>
                            <TextField
                                id="name"
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
                                id="surname"
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
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <TextField
                                        id="sex"
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
                                        onChange={handleChange}
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
                                    <CountrySelect onChange={handleChange} value={formData.country} id="country"/>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id="number"
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
                            />
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        id="password"
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
                                        id="password2"
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