import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { FC } from "react";

export interface AnnonceProps {
    idUtilisateur: string;
    titreOffre: string;
    dateOffre: string;
    descriptionOffre: string;
    prixOffre: number;
    imageOffre: string;
    estActiveOffre: boolean;
    idTypeOffre: number;
    idStatus: number;
}


export const Annonce: FC<AnnonceProps> = ({ idUtilisateur, titreOffre, dateOffre, descriptionOffre, prixOffre, imageOffre, estActiveOffre, idTypeOffre, idStatus }) => (
<Card>
    <CardMedia
        sx={{ height: 140 }}
        image={imageOffre}
        title="offre"
    />
    <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            {titreOffre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            <b>Date : </b> {dateOffre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {descriptionOffre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            <b>Prix : </b> {prixOffre}
        </Typography>
    </CardContent>
    <CardActions>
        <Button size="small">Contacter</Button>
    </CardActions>
</Card>
);