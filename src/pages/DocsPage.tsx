import Docs, {DocsProps} from "~/sections/docs";
import {getDocsData, SidebarCategoryData} from "~/data/docsdata";
import {useEffect, useMemo} from "react";
import {useParams} from "react-router-dom";
import {useTranslate} from "~/abstraction/i18n";
import {WithPageInfo} from "~/components/PageInfo.tsx";
import Constants from "~/data/Constants.ts";

function useDocsTitle(
    data: SidebarCategoryData[],
    docId?: string,
) {
    const t = useTranslate()
    const title = useMemo(
        () => {
            const item = data.flatMap(cat => cat.items)
                .find(item => item.id === docId);
            if (!item) return null;
            return t(item.title)
        },
        [docId, t],
    )
    let result
    if (title){
        result = `${title} | ${t("seo_title")}`;
    }else {
        result = t("docs_not_found_title")
    }
    return { fullTitle: result, itemTitle: title }
}

export default function DocsPage() {
    const data = getDocsData();
    const { docId: paramDocId } = useParams<{ docId?: string }>();
    const defaultDocId = data.length > 0 && data[0].items.length > 0 ? data[0].items[0].id : "";
    const docId = paramDocId || defaultDocId;
    const { fullTitle, itemTitle } = useDocsTitle(data, docId)
    const t = useTranslate()
    
    const breadcrumbs = [
        { name: t("home"), item: Constants.website },
        { name: t("docs"), item: `${Constants.website}/docs` }
    ];
    if (itemTitle) {
        breadcrumbs.push({ name: itemTitle, item: `${Constants.website}/docs/${docId}` });
    }
    
    return <WithPageInfo 
        title={fullTitle}
        breadcrumbs={breadcrumbs}
    >
        <Docs data={data} docId={docId} />
    </WithPageInfo>;
}
