import { useState} from "react";
import AccountCircle from '@mui/icons-material/AccountCircle';
import AuthService from "../services/AuthService";
import {
    Box, Button,
    Card,
    CardContent,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput
} from "@mui/material";
import {LoadingButton} from '@mui/lab';
import {useNavigate} from "react-router-dom";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {appUserUpdate, selectAppUser} from "../store/AppUserSlice";
import AppRoutes from "../helper/AppRoutes";




export function Login() {
    const [username, set_username] = useState("")
    const [password, set_password] = useState("")
    const [loading, set_loading] = useState(false)
    const [message, set_message] = useState("")
    const [showPassword, set_showPassword] = useState(false)
    const navigate = useNavigate();
    const {t} = useTranslation();
    const appUser = useAppSelector(selectAppUser)

    const dispatch = useAppDispatch()

    const onChangeUsername = (e: any) => set_username(e?.target?.value);
    const onChangePassword = (e: any) => set_password(e?.target?.value);
    const handleClickShowPassword = () => set_showPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

    const validate = () => {
        return true;
    }

    const handleLogin = (e: any) => {
        e.preventDefault();
        set_loading(true)
        set_message("")
        if (validate()) {
            AuthService.login(username, password).then(
                (respData) => {
                    dispatch(appUserUpdate(respData.user))
                    navigate(AppRoutes.profile);
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    set_loading(false)
                    set_message(resMessage)
                }
            );
        } else {
            set_loading(false)
        }
    }

    return (
        <Card>
            <CardContent>
                <Box sx={{display:'flex',alignItems:'center',flexDirection:'column',gap:'1rem'}}>
                    <Box>
                    <InputLabel htmlFor="input-with-icon-adornment">
                        {t('Login')}
                    </InputLabel>
                    <OutlinedInput
                        id="input-with-icon-adornment"
                        type={'text'}
                        endAdornment={
                            <InputAdornment position="end">
                                <AccountCircle/>
                            </InputAdornment>
                        }
                        onChange={onChangeUsername}
                    /></Box>
                    <Box><InputLabel htmlFor="outlined-adornment-password">{t('Password')}</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        onChange={onChangePassword}
                        label="Password"
                    /></Box>
                    {loading ? (<LoadingButton loading={!loading}/>) : (
                        <Button variant={"outlined"} onClick={handleLogin}>{t('Submit')}</Button>)
                    }
                    {message && (<Box>{message}</Box>)}

                </Box>
            </CardContent>
        </Card>


    );

}

/*
  <div className="col-md-12">
                <div className="card card-container">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />

                    <Form
                        onSubmit={this.handleLogin}
                        ref={form}
                    >
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="username"
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <button
                                className="btn btn-primary btn-block"
                                disabled={this.state.loading}
                            >
                                {this.state.loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Login</span>
                            </button>
                        </div>

                        {this.state.message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{ display: "none" }}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>
                </div>
            </div>
 */
export default Login