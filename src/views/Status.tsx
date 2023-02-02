/* eslint-disable */
import React from "react";
import axios from "axios";
import { Container, Skeleton, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { green, red } from "@mui/material/colors";

class Status extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      globalStatus: null,
      storage: null,
      vault: null,
      user: null,
      auth: null,
      loading: true,
    };
    this.getStatus();
  }
  /*
  {"status":"ok","services":{"storage":"up","vault":"up","user":"up","auth":"up"}}
   */

  getStatus() {
    axios.get("https://dev.api.neighbook.tech/health").then((response) => {
      this.setState({ loading: false });
      if (response.data.status === "ok") {
        this.setState({ globalStatus: true });
      }
      if (response.data.services.storage === "up") {
        this.setState({ storage: true });
      }
      if (response.data.services.vault === "up") {
        this.setState({ vault: true });
      }
      if (response.data.services.user === "up") {
        this.setState({ user: true });
      }
      if (response.data.services.auth === "up") {
        this.setState({ auth: true });
      }
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <Container>
          <Skeleton
            variant="rectangular"
            animation="wave"
            height={400}
            sx={{ borderRadius: 2, top: 80 }}
          />
        </Container>
      );
    } else {
      return (
        <Container>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <List>
              <ListItem disablePadding sx={{ width: "100%", marginLeft: 25 }}>
                <ListItemIcon>
                  {this.state.globalStatus ? (
                    <CheckCircleIcon
                      sx={{ fontSize: 200, color: green[300] }}
                      className="statusIcon"
                    />
                  ) : (
                    <CancelIcon
                      className="statusIcon"
                      sx={{ color: red[500], fontSize: 200 }}
                    />
                  )}
                </ListItemIcon>
              </ListItem>
              <ListItem disablePadding>
                <Typography variant="h2">
                  {this.state.globalStatus
                    ? "Neighbook fonctionne"
                    : "Neighbook est en panne"}
                </Typography>
              </ListItem>
            </List>
            <Divider />
            <ListItem sx={{ backgroundColor: "whitesmoke", borderRadius: 2 }}>
              <Typography>Fonctionne : </Typography>
              <CheckCircleIcon sx={{ color: green[300], paddingRight: 5 }} />
              <Typography>En panne : </Typography>
              <CancelIcon sx={{ color: red[500] }} />
            </ListItem>
            <List
              sx={{
                marginTop: 200,
                width: "100%",
                backgroundColor: "#FAFAFB",
                borderRadius: 2,
              }}
            >
              <ListItem>
                <ListItemIcon>
                  {this.state.storage ? (
                    <CheckCircleIcon sx={{ color: green[300] }} />
                  ) : (
                    <CancelIcon sx={{ color: red[500] }} />
                  )}
                </ListItemIcon>
                <ListItemText primary="Stockage" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  {this.state.user ? (
                    <CheckCircleIcon sx={{ color: green[300] }} />
                  ) : (
                    <CancelIcon sx={{ color: red[500] }} />
                  )}
                </ListItemIcon>
                <ListItemText primary="Utilisateur" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  {this.state.vault ? (
                    <CheckCircleIcon sx={{ color: green[300] }} />
                  ) : (
                    <CancelIcon sx={{ color: red[500] }} />
                  )}
                </ListItemIcon>
                <ListItemText primary="Coffre-fort" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  {this.state.auth ? (
                    <CheckCircleIcon sx={{ color: green[300] }} />
                  ) : (
                    <CancelIcon sx={{ color: red[500] }} />
                  )}
                </ListItemIcon>
                <ListItemText primary="Authentification" />
              </ListItem>
            </List>
          </Stack>
        </Container>
      );
    }
  }
}

export default Status;
