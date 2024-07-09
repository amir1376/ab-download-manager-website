import React from "react";
import {Providers} from "~/components/Providers.tsx";
import {AppLayout} from "~/sections/AppLayout.tsx";
import {ILanguageData} from "~/i18n/ILanguageData.ts";

export function ClientLayout(
    props: {
        children?: React.ReactNode,
    }
) {
    return <Providers>
        <AppLayout>
            <div className="content">
                {props.children}
            </div>
        </AppLayout>
    </Providers>
}