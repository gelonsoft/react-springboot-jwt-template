import {useNavigate} from "react-router-dom";
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import React from "react";
import {useTranslation} from "react-i18next";
import { FiSettings} from "react-icons/fi";
import {useTheme} from "@mui/material/styles";
import {useAppSelector} from "../store/hooks";
import {MenuHelper} from "../helper/MenuHelper";
import {FaQuestion} from "react-icons/fa";
import {CgProfile} from "react-icons/cg";
import {selectAppUser} from "../store/AppUserSlice";

interface IProps {
    opened: boolean
}

export function hSideBarGetIconFromUrl(pUrl: string) {
    switch (pUrl) {
        case "faq": {
            return (<FaQuestion/>)
        }
        case "protected/profile": {
            return (<CgProfile/>)
        }
        case "protected/admin/gameTypes": {
            return (<CgProfile/>)
        }
        case "settings": {
            return (<FiSettings/>)
        }
    }
    return (<></>)
}

export function SideBar(props: IProps) {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const theme = useTheme();
    const appUser=useAppSelector(selectAppUser)

    return (<List sx={{
        paddingTop: '10px',
        overflowX: 'hidden',
    }}>
        {MenuHelper.items.map( (text, index)  => {
            if (((text.need_login && appUser.hasAuth) || !text.need_login) && (!text?.need_admin || (text?.need_admin && appUser.isAdmin))) {
                const isActive = window.location.href.indexOf(text.url) >= 0;
                // console.log(text,isActive)
                const textColor = {
                    xs: isActive ? theme.palette.secondary.contrastText : theme.palette.text.primary,
                    sm: isActive ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText
                };
                return (<ListItem key={index} disablePadding sx={{
                    backgroundColor: (isActive ? theme.palette.secondary.main : 'inherit')
                }}>
                    <ListItemButton sx={{
                        paddingTop: 0,
                        paddingBottom: 0
                    }} onClick={() => {
                        navigate("/" + text.url)
                    }}>
                        <ListItemIcon sx={{
                            minWidth: 30, fontSize: '1.5em', marginTop: '4px', marginBottom: '4px',
                            color: textColor
                        }}>
                            {hSideBarGetIconFromUrl(text.url)}
                        </ListItemIcon>
                        <ListItemText primary={t(text.name)} sx={{
                            display: props.opened ? 'inherit' : 'none',
                            color: textColor
                        }}/>
                    </ListItemButton>
                </ListItem>)
            } else {
                return null
            }
        })}
    </List>)
}