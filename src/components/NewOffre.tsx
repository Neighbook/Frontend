import React, {useEffect, useState} from 'react';
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
    defaultValue: number | object | string | null,
    // optionnals
    multiline?: boolean,
    rows?: number,
    required?: boolean
    errors?: Array<string>,
    maxLength?: number,

}

interface FormResults {
    libelle: string,
    description: string,
}

const formItems: Array<InputParams> = [
    {
        name: "libelle",
        label: "Libelle de l'annonce",
        type: 'textfield',
        defaultValue: "",
        required: true,
        maxLength: 50,
    },
    {
        name: "description",
        label: "Description de l'annonce",
        type: 'textfield',
        defaultValue: "",
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
    const [formComponents, setFormComponents] = useState<Array<JSX.Element>>([]);
    const [formData, setFormData] = useState<Array<InputParams>>(formItems);
    const [formResults, setFormResults] = useState<FormResults>({libelle: "", description: ""});
    // const fileRef = useRef<Array<(HTMLInputElement | null)>>(Array(4));

    const handleSubmit = () => {
        const formWithErrors = formData.slice();
        let error = false;
        console.log("submit");
        formData.forEach((item, idx) => {
            const {type} = item;
            const errors: Array<string> = [];
            // TEXTFIELD
            if(type === 'textfield') {
                const val = formResults[item.name as keyof FormResults];
                console.log(val);
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

        console.log(formResults, error);
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if(error) {
            setFormData(formWithErrors);
        } else {
            onSubmit(formResults);
            setFormData(formItems);
            if(closeAfterSuccessfulSubmit) {
                handleClose();
            }
        }
    };

    const handleFormChange = (event: React.ChangeEvent<HTMLFormElement>) => {
        const { name, value } = event.target;
        const updated = {...formResults};
        updated[name as keyof FormResults] = value;
        setFormResults(updated);
    };

    // TODO Create custom component to render the form once, and then update the data
    // For now infinite reload hell :(

    // Updates the layout
    useEffect(() => {
        const components: Array<JSX.Element> = [];
        formData.forEach((item, idx) => {
            components.push(renderFormItem(item, idx));
        });
        console.log("render components");
        setFormComponents(components);
    }, [formData]);

    const renderFormItem = (item: InputParams, idx: number): JSX.Element => {
        console.log("renderFormItem");
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
                    error={(item.errors?.length ?? 0) > 0}
                    helperText={(item.errors !== undefined && item.errors.length>0) ? item.errors[0] : ""}
                />
            );
        default:
            return <Box></Box>;
        }
    };

    // Lorsque la modal est fermée, on réinitialise les valeurs
    // Si les items ont été modifiés (erreurs) et que la fenêtre est fermée, alors on réinitialise les items
    useEffect(() => {
        if(!open) {
            console.log("reinit");
            setFormResults({libelle: "", description: ""});
            setFormData(formItems);
        }
    }, [open]);

    return (
        <>
            <BootstrapDialog
                open={open}
                onClose={() => {
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
                            {formComponents.map((item, idx) => { return (
                                <React.Fragment key={idx}>
                                    {item}
                                </React.Fragment>);
                            })}
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