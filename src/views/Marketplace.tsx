import React from 'react';
import { Box, Grid, makeStyles, Typography } from '@mui/material';
import { Annonce } from '../components/Annonce';
import SideBar from '../components/SideBar';
import marketplace from '/asset/images/marketplace.svg';
import {Link} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";


let annonces = [
    {
        "idUtilisateur": "1", 
        "titreOffre": "Recherche babysitter",
        "dateOffre": "20/01/2023",
        "descriptionOffre": "Bonjour je recherche une babysitter les soirs de semaine entre 16h et 18h30 pour mon fils de 7 ans, le temps que je rentre du travail.",
        "prixOffre": 10,
        "imageOffre": "https://www.parentmap.com/sites/default/files/styles/1180x660_scaled_cropped/public/2022-03/iStock-1270939875.jpg?itok=vZA93_g4",
        "estActiveOffre": true,
        "idTypeOffre": 1,
        "idStatus": 1
    }, 
    {
        "idUtilisateur": "1", 
        "titreOffre": "Travaux en tous genres",
        "dateOffre": "22/01/2023",
        "descriptionOffre": "Bonjour je propose des travaux en tous genre, bricolage, rénovation, peinture, jardinage. Le prix varie selon la nature des travaux.",
        "prixOffre": 20,
        "imageOffre": "https://www.bricopro.fr/sites/default/files/styles/home_slider/public/universe/header-bricolage-iStock-1147804793.jpg?itok=hMNAUG16",
        "estActiveOffre": true,
        "idTypeOffre": 1,
        "idStatus": 1
    }, 
]
const drawerWidth = 280

const Marketplace = () => (
// à modifier quand on aura un backend fonctionnel 

    <Box sx = {{display: 'flex'}}>
        <Box
            component="nav"
            sx={{width: {sm: 280}, flexShrink: {sm: 0}}}>
            <SideBar/>
        </Box>
        <Box
            component="main"
            sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${drawerWidth}px)`}}}
        >
        <Typography variant="h4">
            <img src={marketplace} alt="" />
            Marketplace
        </Typography>

        {annonces.map((annonce) => (
            <Box display="flex" flexDirection="row">
                <Box flexBasis="33.3333%">
                    <Annonce 
                        
                        idUtilisateur={annonce.idUtilisateur}
                        titreOffre={annonce.titreOffre}
                        dateOffre={annonce.dateOffre}
                        descriptionOffre={annonce.descriptionOffre}
                        prixOffre={annonce.prixOffre}
                        imageOffre={annonce.imageOffre}
                        estActiveOffre={annonce.estActiveOffre}
                        idTypeOffre={annonce.idTypeOffre}
                        idStatus={annonce.idStatus}
                    />                    
                </Box>

            </Box>
        ))}
        </Box>
        <Box>
            <Link to={'new'}>
               <IconButton aria-label={"add"}>
                   <AddCircleIcon />
               </IconButton>
            </Link>
        </Box>
    </Box>
        
);

export default Marketplace;
