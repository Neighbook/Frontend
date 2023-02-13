import React, { ChangeEvent, useRef, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { Container, TextField, CircularProgress } from "@mui/material";
import { addPost } from "../hook/social";

interface Post {
  title: string;
  description: string;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function NewEvent(props: any) {
  const [formData, updateFormData] = React.useState<Post>({
    title: "",
    description: "",
  });
  const [loading, setLoading] = React.useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>("loading");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    addPost(formData.title, formData.description)
      .then((res) => console.log(res))
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    updateFormData({
      ...formData,
      [event.target.name]: event.target.value as string,
    });
  };

  const handleUploadClick = () => {
    fileRef.current?.click();
  };

  const handleFileChange = (e: any) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    e.target.value = "";
    setFile(file);
    setImgUrl(URL.createObjectURL(file));
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.close}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
            <Button
              sx={{ position: "absolute", top: 10, right: 10 }}
              onClick={props.onClose}
            >
              <CloseIcon />
            </Button>
            <Container component="main" maxWidth="md">
              <Typography
                component="h1"
                variant="h4"
                sx={{ textAlign: "center", marginTop: "10vh", fontWeight: 700 }}
              >
                Nouvelle publication
              </Typography>
              <Container component="main" maxWidth="xs">
                <Box
                  sx={{
                    marginTop: "5vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    onChange={handleFormChange}
                    sx={{ mt: 1 }}
                  >
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
                      minRows={1}
                      maxRows={4}
                      fullWidth
                      label="Description"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                    />
                    <div>
                      <input
                        name="image"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                        type="file"
                        ref={fileRef}
                      />
                      <Button
                        type="button"
                        variant="contained"
                        color="secondary"
                        size="large"
                        sx={{ borderRadius: 1, mb: 2, justifyContent: "left" }}
                        onClick={handleUploadClick}
                      >
                        <b>Ajouter une photo</b>
                      </Button>
                      <label>//Afficher le nom de la photo {}</label>
                    </div>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ position: "relative" }}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="secondary"
                          size="large"
                          disabled={loading}
                          sx={{ mt: 3, mb: 2, borderRadius: 1 }}
                        >
                          Publier
                        </Button>
                        {loading && (
                          <CircularProgress
                            size="30px"
                            sx={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              marginTop: "-12px",
                              marginLeft: "-15px",
                            }}
                          />
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Container>
            </Container>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
