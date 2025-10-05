import React from "react";
import {Providers} from "~/components/Providers.tsx";
import {AppLayout} from "~/sections/AppLayout.tsx";
import CommonMetaTags from "~/components/CommonMetaTags.tsx";
import StructuredData from "~/components/StructuredData.tsx";

export function ClientLayout(
    props: {
        children?: React.ReactNode,
    }
) {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://abdownloadmanager.com';

    return <Providers>
        <CommonMetaTags/>
        <StructuredData currentUrl={currentUrl}/>
        <AppLayout>
            <div className="content">
                {props.children}
            </div>
        </AppLayout>
    </Providers>
}
