import {Box, Card, CardContent,  Typography} from "@mui/material";

import {useTranslation} from "react-i18next";
import {useAppSelector} from "../../store/hooks";
import {selectAppUser} from "../../store/AppUserSlice";


export function ProfileScreen() {
    const appUser = useAppSelector(selectAppUser)
    const {t} = useTranslation()

    return (<Box sx={{height:'100%',width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Card>
            <CardContent sx={{display: 'grid',gridTemplateColumns:'1fr min-content',columnGap: '1rem' }}>
               <Typography>{t("Username")+":"}</Typography><Typography>{appUser?.username}</Typography>
               <Typography>{t("Email")+":"}</Typography><Typography>{appUser?.email}</Typography>
                <Typography>{t("Roles")+":"}</Typography><Typography>{appUser?.roles?.map((value,index)=>{
                    return (<Box key={index}>{value}</Box>)
                })}</Typography>

            </CardContent>
        </Card>
    </Box>)
}