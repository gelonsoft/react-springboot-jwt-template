import {Outlet} from "react-router-dom";
import React from "react";
import {useTranslation} from "react-i18next";
import {useAppSelector} from "../store/hooks";
import {IAppUserRole, selectAppUser} from "../store/AppUserSlice";


interface IProps {
    requiredRole?: IAppUserRole
}

export function ProtectedRoutes(props: IProps) {
    const {t} = useTranslation();
    const appUser = useAppSelector(selectAppUser)
    return (
        <>
            {appUser.hasAuth && (
                !props.requiredRole || (
                    (props.requiredRole === "ROLE_MODERATOR" && appUser.isModerator) ||
                    (props.requiredRole === "ROLE_ADMIN" && appUser.isAdmin) ||
                    (props.requiredRole === "ROLE_SUPER_ADMIN" && appUser.isSuperAdmin)
                )
            ) ? (<Outlet/>) :
                (<div>{t('Please login first')}</div>)
            }
        </>
    )
}