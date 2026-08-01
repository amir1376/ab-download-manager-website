import {Route, Routes} from "react-router-dom";
import HomePage from "~/pages/HomePage.tsx";
import DocsPage from "~/pages/DocsPage.tsx";
import NotFound from "~/pages/NotFound.tsx";
import DonatePage from "~/pages/DonatePage.tsx";


export function AppRoutes(){
    return <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/docs/:docId?" element={<DocsPage/>}/>
        <Route path="/donate" element={<DonatePage/>}/>
        <Route path="/*" element={<NotFound/>}/>
    </Routes>
}