import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';
import {ACTION_LOGOUT} from "./hooks";
import { green, purple, blue, red, brown } from '@mui/material/colors';

export const AppThemes = {
    'brown': {
        palette: {
            mode: 'light',
            type: 'light',
            primary: {
                main: brown[500],
            },
            secondary: {
                main: green[500],
            },
        }
    },
    'brown dark': {
        palette: {
            mode: 'dark',
            type: 'dark',
            primary: {
                main: brown[500],
            },
            secondary: {
                main: green[500],
            },
        }
    },
    'purple': {
        palette: {
            mode: 'light',
            type: 'light',
            primary: {
                main: purple[500],
            },
            secondary: {
                main: red[500],
            },
        }
    },
    'purple dark': {
        palette: {
            mode: 'dark',
            type: 'dark',
            primary: {
                main: purple[500],
            },
            secondary: {
                main: red[500],
            },
        }
    },
    'blue': {
        palette: {
            type: 'light',
            mode: 'light',
            primary: {
                main: blue[500],
            },
            secondary: {
                main: green[500],
            },
        },
    },
    'blue dark': {
        palette: {
            type: 'dark',
            mode: 'dark',
            primary: {
                main: blue[500],
            },
            secondary: {
                main: green[500],
            },
        },
    }
} as const
export const AppThemeIds=Object.keys(AppThemes)

export type IAppThemeState = keyof typeof AppThemes


const initialState: IAppThemeState = 'brown'

function loadState() {
    const loadedItem=localStorage.getItem('AppTheme') as IAppThemeState
    if (loadedItem && AppThemes[loadedItem]) {
        if (loadedItem!==initialState) {
            return loadedItem
        }
    }
    return initialState
}

export const AppThemeSlice = createSlice({
    name: 'AppTheme',
    initialState: loadState(),
    reducers:
        {
            update: (state, action: PayloadAction<string>) => {
                const p= action.payload as IAppThemeState
                if (AppThemes[p]) {
                    localStorage.setItem('AppTheme',action.payload)
                    return p
                }
                return initialState
            }
        }
    ,
})

export const AppThemeUpdate = AppThemeSlice.actions.update
export const selectAppTheme = (state: RootState) => state.appTheme
export default AppThemeSlice.reducer
