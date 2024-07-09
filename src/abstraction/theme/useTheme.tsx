import {PropsWithChildren, useEffect} from "react";
import {useLocalStorage} from 'usehooks-ts';

export function useTheme(){
    const [theme,setTheme]=useLocalStorage("theme","")
    const isDark = theme === "dark"
    return {
        theme,setTheme,isDark
    }
}

export function ThemeProvider(
    props:PropsWithChildren
){
    const {theme}=useTheme()
    useEffect(()=>{
        document.documentElement.setAttribute("data-theme",theme!)
    },[theme])
    return <>
        {props.children}
    </>
}