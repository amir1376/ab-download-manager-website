import {Route, Routes} from "react-router-dom";
import HomePage from "~/pages/HomePage.tsx";
import NotFound from "~/pages/NotFound.tsx";


export function AppRoutes(){
    return <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/*" element={<NotFound/>}/>
    </Routes>
}