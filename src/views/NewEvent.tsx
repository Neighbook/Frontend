import type {ChangeEvent} from "react";
import React, { useRef, useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import {Container, TextField, styled, Grid, LinearProgress} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import {addPost, addPostImage} from "../hook/social";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';


interface Post{
    titre: string
    description: string
}

interface props{
  open: boolean
  handleClose: Function
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export const NewEvent = ({open, handleClose}: props) => {
    const [formData, updateFormData] = React.useState<Post>({
        titre: "",
        description: "",
    });
    const [loading, setLoading] = useState<number>(-1);
    const fileRef = useRef<Array<(HTMLInputElement | null)>>(Array(4));
    const [files, setFiles] = useState<Array<(File | null)>>([null, null, null, null]);
    const [imgUrls, setImgUrls] = useState<Array<string>>(["", "", "", ""]);

    const handleSubmit = () => {
        setLoading(0);
        addPost(formData.titre, formData.description)
            .then((post) => {
                Promise.all(files.map((file)=>{
                    if(file) {
                        return addPostImage(post.id, file).then(()=>{ setLoading(loading+1); });
                    }
                    return null;
                })).then(()=>{
                    setFiles([null, null, null, null]);
                    setImgUrls(["", "", "", ""]);
                    setLoading(-1);
                    fileRef.current.forEach(c=>{
                        if(c !== null){
                            c.value="";
                        }
                    });
                    handleClose();
                }).catch(()=>null);
            })
            .catch((err) => {
                setLoading(-1);
                console.log(err);
            });
    };

    const handleFormChange = (event: React.ChangeEvent<HTMLFormElement>) => {
        updateFormData({
            ...formData,
            [event.target.name]: event.target.value as string,
        });
    };

    const handleUploadClick = (index: number) => {
        fileRef.current[index]?.click();
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        if (!e.target.files) {
            return;
        }
        const file = e.target.files[0];
        e.target.value = "";
        const filesCopy = [...files];
        filesCopy[index] = file;
        setFiles(filesCopy);
        const urlsCopy = [...imgUrls];
        urlsCopy[index] = URL.createObjectURL(file);
        setImgUrls(urlsCopy);
    };

    return (
        <BootstrapDialog
            onClose={()=>{handleClose();}}
            open={open}
        >
            <DialogTitle sx={{ m: 0, p: 2 }}>
                Nouvelle publication
                <IconButton
                    aria-label="close"
                    onClick={()=>{handleClose();}}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Container component="main" maxWidth="md">
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: "100%"
                        }}
                    >
                        <Box component="form" onChange={handleFormChange}>
                            <TextField
                                name="titre"
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
                                rows={4}
                                fullWidth
                                label="Description"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="standard"
                                sx={{mb: 3}}
                            />
                            <Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                {imgUrls.map((img, i)=><Grid item xs={6} key={`img${i}`}>
                                    <Box sx={{display: "flex", alignItems: 'center', justifyContent: 'center', outline: "dashed #00000036 0.15em", height: "6rem"}} onClick={()=>{handleUploadClick(i);}}>
                                        {img?<img src={img} style={{height: "100%", width: "100%", objectFit: 'cover'}} alt='uploaded'/>:<AddPhotoAlternateIcon/>}
                                        <input
                                            name="image"
                                            onChange={(e)=>{ handleFileChange(e, i); }}
                                            style={{ display: "none" }}
                                            type="file"
                                            ref={e=>fileRef.current[i]=e}
                                        />
                                    </Box>
                                </Grid>)}
                            </Grid>
                            {loading!==-1&&<LinearProgress variant={loading?"determinate":"indeterminate"} value={loading*25} sx={{mt: 2}}/>}
                        </Box>
                    </Box>
                </Container>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>{handleSubmit();}}>
                    Publier
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
};
