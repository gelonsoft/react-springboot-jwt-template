import {Box} from "@mui/material";
import {useTranslation} from "react-i18next";

export function FAQScreen() {
    const {t} = useTranslation()
    return (<Box>{t('FAQ')}</Box>)
}