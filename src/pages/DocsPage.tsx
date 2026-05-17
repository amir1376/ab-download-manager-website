import Docs from "~/sections/docs";
import { getDocsData } from "~/data/docsdata";

export default function DocsPage() {
    const data = getDocsData();
    return <Docs data={data} />;
}
