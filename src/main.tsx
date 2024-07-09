import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import {ClientLayout} from "~/sections/ClientLayout.tsx";
import {AppRoutes} from "~/routes/route";
import {setUpIntl} from "~/i18n"
import "~/assets/styles/globals.css"


setUpIntl()
createRoot(document.getElementById("root")!,)
    .render(
        <BrowserRouter>
            <ClientLayout>
                <AppRoutes />
            </ClientLayout>
        </BrowserRouter>
    )