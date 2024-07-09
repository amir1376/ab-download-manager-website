import React, {PropsWithChildren} from "react";
import classNames from "classnames";
import Header from "~/sections/Header";
import Footer from "~/sections/Footer";
export function AppLayout(
    {
        children,
        // initialTheme
    }: PropsWithChildren&{
        // initialTheme:string
    }
) {
    return <div className={
        classNames(
            "flex flex-col bg-base-100 transition-colors",
            "min-h-screen w-full",
        )
    }>
        <Header/>
        {children}
        <div className="flex-grow"/>
        <Footer/>
    </div>
}