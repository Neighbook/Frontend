import React from 'react';
import {
    Routes,
    Route, useNavigate,
} from 'react-router';

import {
    Marketplace,
    PageNotFound,
    Acceuil,
    Messagerie,
    Social, Login, Compte, Register
} from './views';

import {Layout} from './views/Layout';
import {createTheme, ThemeProvider} from "@mui/material";
import {fakeAuth} from "./hook/auth";


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

const AuthContext = React.createContext(null);

const App = () => {
    const [token, setToken] = React.useState<string | null>(null);

    const handleLogin = async (email: string, password: string) => {
        const token = await fakeAuth(email, password);
        setToken(token);
    };

    return (
        <ThemeProvider theme={theme}>
            <AuthContext.Provider value={token}>
                <Routes>
                    <Route index element={<Layout><Acceuil /></Layout>} />
                    <Route path="marketplace" element={<Layout><Marketplace /></Layout>} />
                    <Route path="social" element={<Layout><Social /></Layout>} />
                    <Route path="messagerie" element={<Layout><Messagerie /></Layout>} />
                    <Route path="compte" element={<Layout><Compte /></Layout>} />
                    <Route path="*" element={<PageNotFound />} />
                    <Route path="login" element={<Login handleLogin={handleLogin} />} />
                    <Route path="register" element={<Register />} />
                </Routes>
            </AuthContext.Provider>
        </ThemeProvider>
    );
};


export default App;
