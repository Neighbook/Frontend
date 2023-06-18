import Box from "@mui/material/Box";
import {AppBar, Button, TextField, Toolbar, Typography} from "@mui/material";
import {Link, Outlet} from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MenuIcon from '@mui/icons-material/Menu';
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import {useState} from "react";

const MarketPlaceLayout: React.FC = () => {
    const [toolbarRender, setToolbarRender] = useState<JSX.Element>();

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position={"absolute"}>
                { toolbarRender ? (
                    <Toolbar
                        sx={{height: 40}}
                    >
                        {toolbarRender}
                    </Toolbar>
                ) : (<div></div>)
                }
            </AppBar>
            <Box
                sx={{height: 75}}
            />
            <Outlet context={[toolbarRender, setToolbarRender]}/>
        </Box>
    )
}
export default MarketPlaceLayout;