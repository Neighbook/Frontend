import React, {useState} from 'react';
import {styled, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import DialogActions from "@mui/material/DialogActions";
import Stack from "@mui/material/Stack";

interface props{
    open: boolean
    handleClose: Function
    onSubmit: Function,
    closeAfterSuccessfulSubmit: boolean
}

interface InputParams {
    // required
    name: string
    label: string,
    type: string,
    value: number | object | string | null,
    // optionnals
    multiline?: boolean,
    rows?: number,
    required?: boolean
    errors?: Array<string>,
    maxLength?: number,

}

const defaultItems: Array<InputParams> = [
    {
        name: "libelle",
        label: "Libelle de l'annonce",
        type: 'textfield',
        value: "",
        required: true,
        maxLength: 50,
    },
    {
        name: "description",
        label: "Description de l'annonce",
        type: 'textfield',
        value: "",
        multiline: true,
        rows: 10,
        required: true,
        maxLength: 500,
    },
];


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));



export const NewOffre = ({open, handleClose, onSubmit, closeAfterSuccessfulSubmit}: props) => {
    // const [loading, setLoading] = useState<number>(-1);
    // const [files, setFiles] = useState<Array<(File | null)>>([null, null, null, null]);
    // const [imgUrls, setImgUrls] = useState<Array<string>>(["", "", "", ""]);
    const [formData, setFormData] = useState<Array<InputParams>>(defaultItems);
    // const fileRef = useRef<Array<(HTMLInputElement | null)>>(Array(4));

    const handleSubmit = () => {
        const formWithErrors = formData.slice();
        let error = false;

        formData.forEach((item, idx) => {
            const {type} = item;
            const errors: Array<string> = [];
            // TEXTFIELD
            if(type === 'textfield') {
                const val = item.value as string;
                const {
                    required,
                    maxLength,
                } = item;

                if((required ?? false) && val.length <= 0) {
                    error = true;
                    errors.push(`Veuillez remplir ce champ.`);
                }

                if(maxLength !== undefined && val.length > maxLength) {
                    error = true;
                    errors.push(`Veuillez entrer ${maxLength} caractères au maximum.`);
                }
                formWithErrors[idx].errors = errors;
            }
            // TODO MySelect
            // if(type === 'myselect') { }
        });

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if(error) {
            setFormData(formWithErrors);
        } else {
            const formOutput: Record<string, number | object | string | null> = {};
            formData.forEach((element) => {
                formOutput[element.name] = element.value;
            });

            onSubmit(formOutput);
            setFormData(defaultItems);
            if(closeAfterSuccessfulSubmit) {
                handleClose();
            }
        }
    };

    const handleFormChange = (event: React.ChangeEvent<HTMLFormElement>) => {
        const { name, value } = event.target;
        const updated: Array<InputParams> = formData.slice();
        const idx = formData.findIndex((el) => el.name === name);
        if(idx > -1) {
            // Update form data
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            updated[idx].value = value;
            setFormData(updated);
        }
    };

    // TODO Create custom component to render the form once, and then update the data
    // For now infinite reload hell :(
    const renderFormItem = (item: InputParams, idx: number): JSX.Element => {
        // console.trace("render");
        switch(item.type) {
        case "textfield":
            return (
                <TextField
                    key={idx}
                    name={item.name}
                    margin={"normal"}
                    multiline={item.multiline ?? false}
                    rows={item.rows ?? 1}
                    required={item.required ?? false}
                    label={item.label}
                    InputLabelProps={{shrink: true}}
                    inputProps={(item.maxLength ?? 0) > 0 ? {maxLength: item.maxLength}: {}}
                    variant={"standard"}
                    sx={{mb: 3}}
                    value={formData[idx].value}
                    error={(item.errors?.length ?? 0) > 0}
                    helperText={(item.errors !== undefined && item.errors.length>0) ? item.errors[0] : ""}
                />
            );
        default:
            return <Box></Box>;
        }
    };

    // const handleUploadClick = (index: number) => {
    //     fileRef.current[index]?.click();
    // };
    //

    //
    // const handleFileChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    //     if (!e.target.files) {
    //         return;
    //     }
    //     const file = e.target.files[0];
    //     e.target.value = "";
    //     const filesCopy = [...files];
    //     filesCopy[index] = file;
    //     setFiles(filesCopy);
    //     const urlsCopy = [...imgUrls];
    //     urlsCopy[index] = URL.createObjectURL(file);
    //     setImgUrls(urlsCopy);
    // };

    return (
        <>
            <BootstrapDialog
                open={open}
                onClose={() => {
                    setFormData(defaultItems);
                    handleClose();
                }}
                fullWidth
                maxWidth={"md"}
            >
                <DialogTitle sx={{m: 0, p: 2}}>
                    Déposer une nouvelle annonce
                    <IconButton
                        aria-label="close"
                        onClick={() => {
                            setFormData(defaultItems);
                            handleClose();
                        }}
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
                    <Box component={"form"} onChange={handleFormChange}>
                        <Stack>
                            {formData.map((item, idx) => { return renderFormItem(item, idx); })}
                        </Stack>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit}>Valider</Button>
                </DialogActions>
            </BootstrapDialog>

        </>
    );
};