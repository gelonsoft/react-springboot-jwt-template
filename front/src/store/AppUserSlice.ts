import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';
import {ACTION_LOGOUT} from "./hooks";

export type IAppUserRole = 'ROLE_USER' | 'ROLE_MODERATOR' | 'ROLE_ADMIN' | 'ROLE_SUPER_ADMIN'

export interface IUser {
    id?: number;
    username?: string;
    email?:string;
    roles?: IAppUserRole[];
}

export interface IAppUserState {
    hasAuth?: boolean;
    id?: number;
    username?: string;
    email?:string;
    roles?: IAppUserRole[];
    isUser?: boolean;
    isModerator?: boolean;
    isAdmin?:boolean;
    isSuperAdmin?:boolean;
}

const initialState: IAppUserState = {
    hasAuth: false
};

function loadState() {
    try {
        return JSON.parse(localStorage.getItem('appUser') || 'bad') as IAppUserState
    } catch (e) {
    }
    return initialState
}

export const AppUserSlice = createSlice({
    name: 'AppUser',
    initialState: loadState(),
    extraReducers:
        (builder) => {
            builder
                .addCase(ACTION_LOGOUT, (state) => {
                    console.log(ACTION_LOGOUT)
                    Object.assign(state, initialState);
                    localStorage.removeItem('appUser')
                })
        },
    reducers:
        {
            update: (state, action: PayloadAction<any>) => {
                console.log("update", state, action)
                if ((action.payload?.id || -1) <= 0) {
                    return initialState
                }
                action.payload.hasAuth = true
                action.payload.roles=action.payload.roles.map((r:any,i:number)=>{return r.name})
                action.payload=action.payload as IAppUserState
                if (action.payload.roles?.find((p:string)=>p==='ROLE_SUPER_ADMIN')) action.payload.isSuperAdmin=true;
                if (action.payload.isSuperAdmin || action.payload.roles?.find((p:string)=>p==='ROLE_ADMIN')) action.payload.isAdmin=true;
                if (action.payload.isAdmin || action.payload.roles?.find((p:string)=>p==='ROLE_MODERATOR')) action.payload.isModerator=true;
                if (action.payload.isModerator || action.payload.roles?.find((p:string)=>p==='ROLE_USER')) action.payload.isUser=true;
                localStorage.setItem('appUser', JSON.stringify(action.payload))
                return {...action.payload}
            }
        }
    ,
})

export const appUserUpdate = AppUserSlice.actions.update
export const selectAppUser = (state: RootState) => state.appUser
export default AppUserSlice.reducer
