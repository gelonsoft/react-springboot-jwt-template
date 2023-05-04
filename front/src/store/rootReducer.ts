import { combineReducers } from 'redux'
import AppUserSlice from "./AppUserSlice";
import AppThemeSlice from "./ThemeSlice";



const rootReducer = combineReducers({
    // Define a top-level state field named `todos`, handled by `todosReducer`
    appUser: AppUserSlice,
    appTheme: AppThemeSlice
})

export default rootReducer