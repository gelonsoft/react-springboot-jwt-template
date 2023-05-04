import {SnackbarProvider} from 'notistack';

import React from 'react';
import {createTheme, ThemeProvider} from "@mui/material";
import './App.css';
import './i18n';
import {MainScreen} from "./screens/MainScreen";
import {useAppSelector} from "./store/hooks";
import {AppThemes, selectAppTheme} from "./store/ThemeSlice";


function App() {
    const currentTheme = useAppSelector(selectAppTheme)

    return (
        <React.Suspense fallback="...is loading">
            <ThemeProvider theme={createTheme(AppThemes[currentTheme])}>
                <SnackbarProvider maxSnack={3}>
                    <MainScreen/>
                </SnackbarProvider>
            </ThemeProvider>
        </React.Suspense>

    );
}

export default App;
