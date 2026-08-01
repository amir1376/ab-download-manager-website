import {useTranslate} from "~/abstraction/i18n";
import {WithPageInfo} from "~/components/PageInfo.tsx";
import {DonatePageContent} from "~/sections/donate/Donate.tsx";
import {getDonationMethods} from "~/data/DonationMethods.ts";

export default function DonatePage() {
    const t = useTranslate()
    return (
        <WithPageInfo breadcrumbs={[{name: t("donate"), item: "/donate"}]}>
            <DonatePageContent
                getData={getDonationMethods}
            />
        </WithPageInfo>
    )
}
