import React from "react";
import {Providers} from "~/components/Providers.tsx";
import {AppLayout} from "~/sections/AppLayout.tsx";
import CommonMetaTags from "~/components/CommonMetaTags.tsx";

export function ClientLayout(
    props: {
        children?: React.ReactNode,
    }
) {
    return <Providers>
        <CommonMetaTags/>
        <AppLayout>
            <div className="content">
                {props.children}
            </div>
        </AppLayout>
    </Providers>
}
