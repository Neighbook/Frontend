import React from 'react';
import {
    Routes,
    Route,
} from 'react-router';

import {
    Marketplace,
    PageNotFound,
    Acceuil,
    Messagerie,
    Social, Login, Compte
} from './views';

import {Layout} from './views/Layout';
import {createTheme, ThemeProvider} from "@mui/material";


const theme = createTheme({
    typography: {
        fontFamily: 'Raleway',
        h1: {
            color: "#64675A"
        },
        h2: {
            color: "#64675A"
        },
        h3: {
            color: "#64675A"
        },
        h4: {
            color: "#64675A"
        },
        h5: {
            color: "#64675A"
        }
    },
    palette: {
        primary: {main: "#64675A"},
        secondary: {main: "#879472"},
        error: {main: "#FFDCDC"}
    }
});

const App = () => (
    <ThemeProvider theme={theme}>
        <Routes>
            <Route path="/">
                <Route index element={<Layout><Acceuil /></Layout>} />
                <Route path="marketplace" element={<Layout><Marketplace /></Layout>} />
                <Route path="social" element={<Layout><Social /></Layout>} />
                <Route path="messagerie" element={<Layout><Messagerie /></Layout>} />
                <Route path="compte" element={<Layout><Compte /></Layout>} />
                <Route path="*" element={<PageNotFound />} />
                <Route path="login" element={<Login />} />
            </Route>
        </Routes>
    </ThemeProvider>
);


export default App;
