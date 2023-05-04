import MuiAppBar from "@mui/material/AppBar";
import {Box, Drawer, SwipeableDrawer, Toolbar, Typography} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {SideBar} from "./SideBar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import React from "react";

import {styled, useTheme} from "@mui/material/styles";
import {LoginHeaderItem} from "./LoginHeaderItem";
import {useAppSelector} from "../store/hooks";


interface IProps {
    pWindow?: () => Window,
    drawerWidth: number,
    setDrawerWidthFunc: any
}

export function MainBars(props: IProps) {

    const theme = useTheme();



    const {pWindow} = props;

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        props.setDrawerWidthFunc(mobileOpen ? 55 : 240)
        setMobileOpen(!mobileOpen);
    };
    const container = pWindow !== undefined ? () => pWindow().document.body : undefined;

    const DrawerHeader = styled('div')(({theme}) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    }));

    return (
        <>
            <MuiAppBar
                position="fixed"
                sx={{
                    width: {sm: mobileOpen ? `calc(100% - ${props.drawerWidth}px)` : '100%'},
                    ml: {sm: mobileOpen ? `${props.drawerWidth}px` : 0},
                    zIndex: theme.zIndex.drawer + 1,
                }}
            >
                <Toolbar sx={{
                    display: 'flex',
                    width: '100%',
                    fontSize: '1em',
                    backgroundColor: theme.palette.primary.main
                }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: {sm: mobileOpen ? 'none' : 'inherit'}}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{
                        width: {
                            xs: 'calc( 100% - 120px )',
                            sm: 'calc( 100% - 140px )'
                        },
                        fontSize: {
                            sm: mobileOpen ? `min(calc((100vw - 205px - ${props.drawerWidth}px)/20 + 1px),35px)` : 'min(calc((100vw - 205px)/20 + 1px),35px)',
                            xs: 'calc((100vw - 205px)/20 + 1px)'
                        }
                    }}>


                    </Typography>
                    <LoginHeaderItem/>
                </Toolbar>
            </MuiAppBar>
            <Box
                component="nav"
                sx={{
                    width: {sm: props.drawerWidth}, flexShrink: {sm: 0},
                    backgroundColor: theme.palette.primary.main,
                    overflowX: 'hidden',
                    //height: '100vh'
                }}
                aria-label="mailbox folders"
            >
                <SwipeableDrawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onOpen={handleDrawerToggle}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: {xs: 'block', sm: 'none'},
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: props.drawerWidth,
                            backgroundColor: theme.palette.background.paper,
                            color: theme.palette.text.primary
                        },
                        backgroundColor: theme.palette.background.paper+'88',
                        overflowX: 'hidden',
                        color: theme.palette.text.primary
                    }}
                >
                    <div style={{
                        paddingTop: '56px'
                    }}>
                        <SideBar opened={mobileOpen}/>
                    </div>
                </SwipeableDrawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: {xs: 'none', sm: 'block'},
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: props.drawerWidth,
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            //backgroundColor: 'inherit'
                        },
                    }}
                    color="primary"
                    open
                >
                    <div>
                        <DrawerHeader>
                            {mobileOpen && (<IconButton onClick={handleDrawerToggle}>
                                <ChevronLeftIcon sx={{
                                    //color: theme.palette.primary.contrastText
                                }}/>
                            </IconButton>)}
                        </DrawerHeader>
                        <SideBar opened={mobileOpen}/>
                    </div>
                </Drawer>
            </Box>
        </>
    )
}