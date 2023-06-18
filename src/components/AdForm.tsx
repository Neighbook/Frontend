import {useEffect, useState} from 'react';
import Stack from "@mui/material/Stack";
import {TextField } from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate, useOutletContext} from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import routes from '../../services/services'

type Form = {
    idUser: number;
    libelleOffre: string;
    dateOffre:string;
    descriptionOffre: string;
    prixOffre: number;
    is_activeTypeOffre: boolean;
    idTypeOffre : number;
    idStatus: number
}

const AdForm: React.FC = () => {
    const [formData, setFormData] = useState<Form>();
    // @ts-ignore
    const [toolbarRender, setToolbarRender] = useOutletContext();
    const navigate = useNavigate();

    useEffect(() => {
        setToolbarRender(() => toolbarRenderMarketplace());
    }, []);

    function toolbarRenderMarketplace(): JSX.Element {
        return (
            <>
                <Button
                    fullWidth={true}
                    size="large"
                    color="inherit"
                    startIcon={<ClearIcon />}
                    sx={{ mr: 2 }}
                    onClick={() => navigate("/offres")}
                >
                        Retourner à la page des annonces
                </Button>
            </>
        );
    }

    const handleChange = (from: string, value: any) => {
        let copy : Form = {...formData};
        copy[from] = value;
        copy.idUser = 1;
        copy.dateOffre = "2023-06-15T00:31:30.124Z";
        copy.prixOffre = 0;
        copy.is_activeTypeOffre = true;
        copy.idTypeOffre = 1;
        copy.idStatus= 1;
        setFormData(copy);
    }

    const sendOffre = () => {
        routes.sendOffre(formData)
    }

    return (
        <>
            <Stack spacing={3} alignItems={"center"} justifyContent="center">
                <h3>Déposer une nouvelle annonce </h3>
                <TextField
                    required={true}
                    label={"Titre de l'annonce"}
                    onChange={(event) => {handleChange('libelleOffre', event.target.value)}}

                    
                />
                <TextField
                    onChange={(event) => {handleChange('title', event.target.value)}}
                    required={true}
                    label={"Description de l'annonce"}
                    multiline
                    rows={10}

                />
                <TextField
                    required={true}
                    label={""}
                />
                <Button onClick={sendOffre}>Valider</Button>
            </Stack>
        </>
    );
}
export default AdForm;