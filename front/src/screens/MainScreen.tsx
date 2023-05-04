import {Box} from "@mui/material";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom"
import ProtectedRoute from "./protected/ProtectedRoute";
import {LoginScreen} from "./LoginScreen";
import {MainBars} from "../components/MainBars";
import {useTheme} from '@mui/material/styles';
import {useState} from "react";
import {SettingsScreen} from "./SettingsScreen";
import {useAppSelector} from "../store/hooks";
import {selectAppUser} from "../store/AppUserSlice";
import {FAQScreen} from "./FAQScreen";

export function MainScreen() {
    const theme = useTheme()
    const [drawerWidth, setDrawerWidth] = useState(55);
    const appUser = useAppSelector(selectAppUser)

    const setDrawerWidthFunc = function (newDrawerWidth: number) {
        setDrawerWidth(newDrawerWidth)
    }

    return (<Box sx={{height: '100vh', width: '100vw',
        background: theme.palette.background.paper,
        color: theme.palette.text.primary
    }}>
        <HashRouter>
            <MainBars drawerWidth={drawerWidth} setDrawerWidthFunc={setDrawerWidthFunc}/>
            <Box sx={{
                display: 'flex',
                color: theme.palette.text.primary,
                'a': {
                    color: theme.palette.secondary.main
                },
                'a:visited': {
                    color: theme.palette.secondary.main
                }
            }}>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1, p: 3, width: {sm: `calc(100vw - ${drawerWidth}px)`, xs: '100vw'},
                        //paddingTop: '95px',
                        paddingTop: '30px',
                        marginTop: '65px',
                        overflowY: 'auto',
                        maxHeight: 'calc( 100vh - 100px )',
                        //maxWidth: '100vw',
                        marginLeft: {sm: `${drawerWidth}px`, xs: 0}
                    }}
                >
                    <Routes>
                        {ProtectedRoute}
                        <Route path={"/login"} element={
                            <>
                                {appUser.hasAuth?(<Navigate replace to={"/protected/profile"}/>):(<LoginScreen/>)}
                            </>
                        }/>
                        <Route path={"/settings"} element={
                            <SettingsScreen/>
                        }/>
                        <Route path={"/faq"} element={
                            <FAQScreen/>
                        }/>

                        <Route path={"*"} element={
                            <Navigate replace to={appUser.hasAuth?"/protected/profile":"/login"}/>
                        }
                        />
                    </Routes>
                </Box>
            </Box>
        </HashRouter>

    </Box>)
}