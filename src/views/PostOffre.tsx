import * as React from 'react';
import {useState} from "react";
import logo from "/asset/images/logo.svg";
import {
    Box, Button,
    CircularProgress,
    Container,
    FormControlLabel, FormGroup,
    Grid, ImageList, ImageListItem,
    Switch,
    TextField,
    Typography
} from "@mui/material";
import {useAuth} from "../components/AuthProvider";
import {addOffre, Offre} from "../hook/marketplace";
import SideBar from "../components/SideBar";

interface offreFormData {
    title: string,
    description: string,
    prix: number,
    isActive: boolean,
    idTypeOffre: number,
    tags: Array<number>,
    //images: Array<Image>,
}

const imageItems: any[] = [
    {url: "https://cdn.shopify.com/s/files/1/2196/9775/files/convert_59.jpg?v=1574781222", title: "velo1"},
    {url: "https://cdn.urbancookery.com/2021/01/tates_7.jpg__900x1205_q85_crop.jpg", title: "cookies1"},
    {url: "https://images.frandroid.com/wp-content/uploads/2021/08/bose-companion.jpg", title: "pc1"},
];

export const PostOffre = () => {
    const {currentUser, usersBase} = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, updateFormData] = React.useState<offreFormData>({
        title: '',
        description: '',
        prix: 0,
        isActive: true,
        idTypeOffre: -1,
        tags: [],
    });

    const handleFormChange = (event: React.ChangeEvent<HTMLFormElement>) => {
        updateFormData({
            ...formData,
            [event.target.name]: event.target.value as string
        });
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        updateFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        updateFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        addOffre(
            formData.title,
            formData.description,
            formData.prix,
            formData.isActive,
            formData.idTypeOffre,
            formData.tags,
        );
    };

    return (
        <Box sx={{display: 'flex'}}>
            <Box
                component="nav"
                sx={{width: {sm: 280}, flexShrink: {sm: 0}}}>
                <SideBar/>
            </Box>
            <Container component="main" maxWidth="lg">
                <Typography component="h1" variant="h4" sx={{textAlign: 'center', marginTop: '10vh', fontWeight: 700}}>
                    Créez une nouvelle annonce !
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
                        <Box component="form" onSubmit={handleSubmit} onChange={handleFormChange} sx={{mt: 1}}>
                            <TextField
                                name="title"
                                margin="normal"
                                required
                                fullWidth
                                label="Titre"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="standard"
                            />
                            <TextField
                                name="description"
                                margin="normal"
                                multiline
                                required
                                fullWidth
                                label="Description de l'annonce"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="standard"
                            />
                            <Grid container spacing={2}>
                                <Grid item xs={9}>
                                    <TextField
                                        name="prix"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Prix"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    defaultChecked
                                                    name="isActive"
                                                    onChange={handleSwitchChange}
                                                />
                                            }
                                            label="Annonce active"
                                        />
                                    </FormGroup>
                                </Grid>
                            </Grid>

                            <Box sx={{position: 'relative'}}>
                                <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={150}>
                                    {imageItems.map((item) => (
                                        <ImageListItem key={item.img}>
                                            <img
                                                src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                                                srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                alt={item.title}
                                                loading="lazy"
                                            />
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            </Box>

                            <Box sx={{position: 'relative'}}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    disabled={loading}
                                    sx={{mt: 3, mb: 2, borderRadius: 0}}
                                >
                                    Poster l'annonce !
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
                </Container>
            </Container>
        </Box>
    );
}
