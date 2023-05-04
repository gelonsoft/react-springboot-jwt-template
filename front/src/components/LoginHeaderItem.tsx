import {ACTION_LOGOUT, useAppDispatch, useAppSelector} from "../store/hooks";
import {selectAppUser} from "../store/AppUserSlice";
import {Avatar, Box, IconButton, Menu, MenuItem} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {genConfig} from "react-nice-avatar";
import {useNavigate} from "react-router-dom";

export function LoginHeaderItem() {
    const appUser=useAppSelector(selectAppUser)
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const [anchorEl, setAnchorEl] = useState(null)
    const {t} = useTranslation();
    const navigate = useNavigate()

    const avatarConfig = genConfig({});

    const loginClick = function () {
        navigate('/login');
    }

    const handleMenuClick = function (e: any) {
        setAnchorEl(e.currentTarget)
    }
    const handleMenuClose = function () {
        setAnchorEl(null)
    }
    const logoutClick = function () {
        dispatch({type: ACTION_LOGOUT})
        setAnchorEl(null);
    }

    return (<>
        <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={!!anchorEl}
            onClose={handleMenuClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            sx={{
                position: 'absolute',
                '& > .MuiPaper-root': {
                    left: 'initial !important',
                    right: '0 !important'
                }
            }}
        >
            {appUser.hasAuth && (<MenuItem key={1} onClick={logoutClick}>{t('Logout')}</MenuItem>)}
        </Menu>
        {appUser.hasAuth?(
            <IconButton sx={{display: 'flex',flexDirection:'column', fontSize: '0.8rem',alignItems: 'center',padding:'2px',
                color: theme.palette.primary.contrastText}} onClick={handleMenuClick}>
                <Avatar style={{width: '28px', height: '28px'}} {...avatarConfig} />
                {appUser.username}
            </IconButton>
        ):(
            <IconButton
                onClick={loginClick}
                style={{
                    height: '32px',
                    aspectRatio: 'auto 32 / 32',
                    borderRadius: '20%',
                    color: theme.palette.secondary.contrastText,
                    backgroundColor: theme.palette.secondary.main,
                    padding: '2px',
                    marginRight: '5px',
                    width: '55px',
                    fontSize: '1rem'
                }}
            >{t('Login')}</IconButton>
        )}
    </>)
}