import React from 'react';
import {
    Routes,
    Route
} from 'react-router';

import {
    Marketplace,
    PageNotFound,
    Acceuil,
    Messagerie,
    Social, Login, Compte, Register, UserView
} from './views';

import {AuthenticatedLayout} from './views/AuthenticatedLayout';
import {createTheme, ThemeProvider} from "@mui/material";
import {AuthProvider} from "./components/AuthProvider";


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
        secondary: {main: "#879472"}
    }
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <Routes>
                    <Route index element={<AuthenticatedLayout><Acceuil /></AuthenticatedLayout>} />
                    <Route path="marketplace" element={<AuthenticatedLayout><Marketplace /></AuthenticatedLayout>} />
                    <Route path="social" element={<AuthenticatedLayout><Social /></AuthenticatedLayout>} />
                    <Route path="messagerie" element={<AuthenticatedLayout><Messagerie /></AuthenticatedLayout>} />
                    <Route path="compte" element={<AuthenticatedLayout><Compte /></AuthenticatedLayout>} />
                    <Route path="user/:userId" element={<AuthenticatedLayout><UserView /></AuthenticatedLayout>} />
                    <Route path="post/:postId" element={<AuthenticatedLayout><Social /></AuthenticatedLayout>} />
                    <Route path="*" element={<PageNotFound />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Routes>
            </AuthProvider>
        </ThemeProvider>
    );
};


export default App;
