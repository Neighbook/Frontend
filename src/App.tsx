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
    Social, Login, Compte, Register, UserView, Calendar
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
                    <Route index element={<Acceuil />} />
                    <Route path="marketplace" element={<AuthenticatedLayout><Marketplace /></AuthenticatedLayout>} />
                    {/*<Route path="marketplace" element={<Marketplace />} />*/}
                    <Route path="social" element={<AuthenticatedLayout><Social /></AuthenticatedLayout>} />
                    {/*<Route path="social" element={<Social />} />*/}
                    <Route path="calendar" element={<AuthenticatedLayout><Calendar /></AuthenticatedLayout>} />
                    {/*<Route path="calendar" element={<Calendar />} />*/}
                    <Route path="messagerie" element={<AuthenticatedLayout><Messagerie /></AuthenticatedLayout>} />
                    {/*<Route path="messagerie" element={<Messagerie />} />*/}
                    <Route path="compte" element={<AuthenticatedLayout><Compte /></AuthenticatedLayout>} />
                    {/*<Route path="compte" element={<Compte />} />*/}
                    <Route path="user/:userId" element={<AuthenticatedLayout><UserView /></AuthenticatedLayout>} />
                    {/*<Route path="user/:userId" element={<UserView />} />*/}
                    <Route path="post/:postId" element={<AuthenticatedLayout><Social /></AuthenticatedLayout>} />
                    {/*<Route path="post/:postId" element={<Social />} />*/}
                    <Route path="*" element={<PageNotFound />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Routes>
            </AuthProvider>
        </ThemeProvider>
    );
};


export default App;
