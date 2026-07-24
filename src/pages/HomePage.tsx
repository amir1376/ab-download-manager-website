import Home from "~/sections/home";
import {getHomeData} from "~/data/homedata";
import {useTranslate} from "~/abstraction/i18n";
import Constants from "~/data/Constants.ts";
import {WithPageInfo} from "~/components/PageInfo.tsx";

export default function HomePage() {
    const data = getHomeData()
    const t = useTranslate()
    
    return <WithPageInfo breadcrumbs={[
        { name: t("home"), item: Constants.website }
    ]}>
        <Home data={data} />
    </WithPageInfo>
}