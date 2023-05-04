import axios from "axios";
import {Config} from "../helper/Config";
import APIHelper from "../helper/APIHelper";

class AuthService {
    login(username:string, password:string) {
        return axios
            .post(Config.API_URL + "auth/signin", {
                username,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    APIHelper.accessToken=response.data.tokenType+' '+response.data.accessToken
                    localStorage.setItem("accessToken", APIHelper.accessToken);
                    delete response.data.accessToken
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username:string, email:string, password:string) {
        return axios.post(Config.API_URL + "signup", {
            username,
            email,
            password
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user')||'');
    }
}

export default new AuthService();

