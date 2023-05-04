import axios, {AxiosRequestConfig} from "axios";

import {Config} from "./Config";

class APIHelper {
    static _instance:APIHelper
    static loadAccessToken() {
        const token=localStorage.getItem("accessToken")
        if (token && token?.length>0) {
            return token
        }
        return null
    }
    static accessToken=APIHelper.loadAccessToken()
    static get_instance() {
        if (!APIHelper._instance) {
            APIHelper._instance=new APIHelper()
        }
        return APIHelper._instance
    }
    static get(uri:string,addAuth=false,config: AxiosRequestConfig<any> | undefined={}) {
        if (!config) config={}
        if (!config.headers) config.headers={}
        if (addAuth && APIHelper.accessToken) {
            config.headers.Authorization = APIHelper.accessToken
        }
        return axios.get(Config.API_URL+uri,config)
    }
    static post(url:string,addAuth=false,data:any={},config:AxiosRequestConfig<any> | undefined={}) {
        if (!config) config={}
        if (!config.headers) config.headers={}
        if (addAuth && APIHelper.accessToken) {
            config.headers.Authorization = APIHelper.accessToken
        }
        return axios.post(Config.API_URL+url,data,config);
    }
    static postJSON(url:string,addAuth=false,data:any={},config:AxiosRequestConfig<any> | undefined={}) {
        if (!config) config={}
        if (!config.headers) config.headers={}
        config.headers["Content-Type"]="application/json"
        return APIHelper.post(url,addAuth,data,config)
    }
}

export default APIHelper;