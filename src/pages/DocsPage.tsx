import Docs, {DocsProps} from "~/sections/docs";
import {getDocsData, SidebarCategoryData} from "~/data/docsdata";
import {useEffect, useMemo} from "react";
import {useParams} from "react-router-dom";
import {useTranslate} from "~/abstraction/i18n";
import {WithPageInfo} from "~/components/PageInfo.tsx";

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
    return result
}

export default function DocsPage() {
    const data = getDocsData();
    const { docId: paramDocId } = useParams<{ docId?: string }>();
    const defaultDocId = data.length > 0 && data[0].items.length > 0 ? data[0].items[0].id : "";
    const docId = paramDocId || defaultDocId;
    const title = useDocsTitle(data, docId)
    return <WithPageInfo title={title}>
        <Docs data={data} docId={docId} />
    </WithPageInfo>;
}
