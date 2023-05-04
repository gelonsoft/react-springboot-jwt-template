import {Route} from "react-router-dom";
import {ProtectedRoutes} from "../../components/ProtectedRoutes";
import {ProfileScreen} from "./ProfileScreen";


export default [
    <Route path={"protected"} element={<ProtectedRoutes/>}>
        <Route path={"profile"} element={<ProfileScreen/>} key={0}/>

        <Route path={"admin"} element={<ProtectedRoutes requiredRole={"ROLE_ADMIN"}/>}>

        </Route>
    </Route>]