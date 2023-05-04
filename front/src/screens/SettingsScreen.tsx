import {useState} from "react";
import {Box, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useTheme} from "@mui/material/styles";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {AppThemeIds, AppThemeUpdate, selectAppTheme} from "../store/ThemeSlice";

interface IProps {

}
export function SettingsScreen(props:IProps) {
    const { t } = useTranslation();
    const theme = useTheme();
    const dispatch = useAppDispatch()
    const currentTheme=useAppSelector(selectAppTheme)

    const handleChange=function (target:any,newValue:string) {
        dispatch(AppThemeUpdate(newValue))
    }
    return (<Box sx={{
        color: theme.palette.text.primary
    }}>
        <Card>
            <CardContent>
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group" style={{color: theme.palette.text.primary }}>{t('Theme')}</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={currentTheme}
                        onChange={handleChange}
                    >
                        {AppThemeIds.map((val,index)=>{
                            return (<FormControlLabel value={val} control={<Radio />} label={""+t(val)} key={index} />)
                        })}
                    </RadioGroup>
                </FormControl>
            </CardContent>
        </Card>
    </Box>)
}