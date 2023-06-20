import React, { useEffect, useState } from 'react';
import MyCard from '../components/MyCard';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import type {Offre} from '../hook/marketplace';
import {Alert, Modal, Snackbar} from "@mui/material";
import MarketplaceFilter from './MarketplaceFilter';
import CardOffre from '../components/CardOffre';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MenuIcon from "@mui/icons-material/Menu";
import {getOffres, postOffre} from "../hook/marketplace";
import {NewOffre} from "../components/NewOffre";

const Marketplace: React.FC = () => {
    const [data, setData] = useState<Array<Offre>|null>([]);
    const [offreModal, setOffreModal] = useState<boolean>(false);
    const [newOffreModalOpened, setNewOffreModalOppened] = useState<boolean>(false);
    const [adData, setAdData] = useState<Offre>();
    const [filtersOpened, setFiltersOpened] = useState<boolean>(false);
    const [openedAlert, setOpenedAlert] = useState<boolean>(false);
    const [postError, setPostError] = useState<string>("");
    // const [toolbarRender, setToolbarRender] = useOutletContext();
    const [filters, setFilters] = useState<object>({});
    // const navigate = useNavigate();

    /**
     * Request the backend with the filtered offers
     */
    // useEffect(() => {
    //     const controller = new AbortController();
    //     getOffres(controller.signal).then((offres: Array<Offre>|null) => {
    //         setData(offres);
    //     }).catch(() => null);
    // }, [filters])

    /**
     * Request the backend for the offers
     */
    useEffect(() => {
        // const controller = new AbortController();
        // getOffres(controller.signal).then((offres: Array<Offre>|null) => {
        //     setData(offres);
        // }).catch(() => null);

        // PLACEHOLDER DATA
        const placeholderData: Array<Offre> = [
            {
                idOffre: 1,
                libelleOffre: "Title 1",
                descriptionOffre:"    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fteamsters848.org%2Fwp-content%2Fuploads%2F2017%2F04%2Freject-job-offer-903x600.jpg&f=1&nofb=1&ipt=bc5a8ee75e41a48a24ed023f02cebecb80eeec878f2e0533704dba375d93e449&ipo=images",
            },
            {
                idOffre: 2,
                libelleOffre: "Title 2",
                descriptionOffre:"    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fteamsters848.org%2Fwp-content%2Fuploads%2F2017%2F04%2Freject-job-offer-903x600.jpg&f=1&nofb=1&ipt=bc5a8ee75e41a48a24ed023f02cebecb80eeec878f2e0533704dba375d93e449&ipo=images",
            },
            {
                idOffre: 3,
                libelleOffre: "Title 3",
                descriptionOffre:"    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fteamsters848.org%2Fwp-content%2Fuploads%2F2017%2F04%2Freject-job-offer-903x600.jpg&f=1&nofb=1&ipt=bc5a8ee75e41a48a24ed023f02cebecb80eeec878f2e0533704dba375d93e449&ipo=images",
            },
            {
                idOffre: 4,
                libelleOffre: "Title 4",
                descriptionOffre:"    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fteamsters848.org%2Fwp-content%2Fuploads%2F2017%2F04%2Freject-job-offer-903x600.jpg&f=1&nofb=1&ipt=bc5a8ee75e41a48a24ed023f02cebecb80eeec878f2e0533704dba375d93e449&ipo=images",
            },
            {
                idOffre: 5,
                libelleOffre: "Title 5",
                descriptionOffre:"    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fteamsters848.org%2Fwp-content%2Fuploads%2F2017%2F04%2Freject-job-offer-903x600.jpg&f=1&nofb=1&ipt=bc5a8ee75e41a48a24ed023f02cebecb80eeec878f2e0533704dba375d93e449&ipo=images",
            },
            {
                idOffre: 6,
                libelleOffre: "Title 6",
                descriptionOffre:"    Lore ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fteamsters848.org%2Fwp-content%2Fuploads%2F2017%2F04%2Freject-job-offer-903x600.jpg&f=1&nofb=1&ipt=bc5a8ee75e41a48a24ed023f02cebecb80eeec878f2e0533704dba375d93e449&ipo=images",
            },
            {
                idOffre: 7,
                libelleOffre: "Title 7",
                descriptionOffre:"    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fteamsters848.org%2Fwp-content%2Fuploads%2F2017%2F04%2Freject-job-offer-903x600.jpg&f=1&nofb=1&ipt=bc5a8ee75e41a48a24ed023f02cebecb80eeec878f2e0533704dba375d93e449&ipo=images",
            },
            {
                idOffre: 8,
                libelleOffre: "Title 8",
                descriptionOffre:"    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fteamsters848.org%2Fwp-content%2Fuploads%2F2017%2F04%2Freject-job-offer-903x600.jpg&f=1&nofb=1&ipt=bc5a8ee75e41a48a24ed023f02cebecb80eeec878f2e0533704dba375d93e449&ipo=images",
            },
            {
                idOffre: 9,
                libelleOffre: "Title 9",
                descriptionOffre:"    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fteamsters848.org%2Fwp-content%2Fuploads%2F2017%2F04%2Freject-job-offer-903x600.jpg&f=1&nofb=1&ipt=bc5a8ee75e41a48a24ed023f02cebecb80eeec878f2e0533704dba375d93e449&ipo=images",
            }
        ];
        setData(placeholderData);
    }, [data]);


    const cardActionRender = (ad: Offre): JSX.Element => {
        return (<ButtonGroup>
            <Button
                startIcon={<LibraryAddIcon />}
                onClick={() => { follow(ad); }}
            >
                Suivre
            </Button>
            <Button
                endIcon={<VisibilityIcon/>}
                onClick={() => { show(ad); }}
            >
                Consulter
            </Button>
        </ButtonGroup>);
    };

    const follow = (ad: Offre): void => {
        console.log("Suivre ", ad.idOffre);
    };

    const show = (ad: Offre): void => {
        console.log("show", ad.idOffre);
        setAdData(ad);
        toggleAdModal(true);
    };

    const toggleAdModal = (state: boolean) => {
        setOffreModal(state);
    };

    const handleNewOffre = (data: object) => {
        const controller = new AbortController();
        postOffre(data as Offre, controller.signal)
            .then((res) => {
                if(res !== null) {
                    setPostError(res);
                } else {
                    setPostError("");
                }
                openAlert(true);
            })
            .catch(() => null);
    };

    const openAlert = (state: boolean) => {
        if(state !== openedAlert) {
            setOpenedAlert(state);
        }
    };

    return (
    // MARKETPLACE PAGE
        <Box sx={{flexGrow: 1}}>
            <ButtonGroup variant={"contained"} sx={{marginBottom: 2}} fullWidth={true} size={"large"}>
                <Button
                    sx={{width: '87%'}}
                    color="primary"
                    startIcon={<AddCircleIcon />}
                    onClick={() => {setNewOffreModalOppened(true);}}
                >
                    Ajouter une annonce
                </Button>

                <Button
                    sx={{width: '13%'}}
                    onClick={() => { setFiltersOpened(true); }}
                    endIcon={<MenuIcon/>}
                >
                    Filtres
                </Button>
            </ButtonGroup>

            {/* ADMODAL */}
            <Modal
                open={offreModal}
                onClose={() => { toggleAdModal(false); }}
                sx={{
                    maxWidth: 1000,
                    p: 30,
                }}
            >
                <Box>
                    <CardOffre
                        ad={adData}
                        buttonName={"Ajouter aux annonces suivies"}
                        callback={() => { toggleAdModal(false); }}
                    />
                </Box>
            </Modal>

            {/* FILTRES */}
            <Drawer
                anchor={'right'}
                open={filtersOpened}
                onClose={() => { setFiltersOpened(false); }}
            >
                <MarketplaceFilter
                    values={filters}
                    callback={(f: object) => {
                        setFilters(f);
                        console.log(f);
                    }}
                />
            </Drawer>

            {/* BROWSE OFFRES */}
            <Box sx={{ flexGrow: 1 }}>
                <Grid container rowSpacing={3} columnSpacing={3}>
                    {data === null ? <Box></Box>
                        : data.map((ad: Offre) => (
                            <Grid item xs={12} md={6} lg={3} key={ad.idOffre}>
                                <MyCard
                                    sx={{ maxHeight: 500 }}
                                    id={ad.idOffre}
                                    title={ad.libelleOffre}
                                    text={ad.descriptionOffre }
                                    image={ad.image}
                                    renderCardActions={cardActionRender(ad)}
                                />
                            </Grid>
                        ))}
                </Grid>
            </Box>

            <NewOffre
                open={newOffreModalOpened}
                handleClose={() => {
                    setNewOffreModalOppened(false);}}
                onSubmit={handleNewOffre}
                closeAfterSuccessfulSubmit={true}
            />


            <Snackbar
                open={openedAlert}
                autoHideDuration={3000}
                onClose={()=>{openAlert(false);}}
            >
                <Alert
                    onClose={()=>{openAlert(false);}}
                    severity={postError.length===0 ? "success" : "error"}
                    sx={{ width: '100%' }}
                >
                    {postError.length===0
                        ? "La nouvelle annonce a été postée !"
                        : postError
                    }
                </Alert>
            </Snackbar>

        </Box>
    );
};

export default Marketplace;
