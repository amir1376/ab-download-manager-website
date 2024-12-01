import {PropsWithChildren} from "react";
import {getFooterData} from "~/data/footerdata";
import classNames from "classnames";
import {useTranslate} from "~/abstraction/i18n";
import {MyLink} from "~/abstraction/navigation";
import {useGetNameForSocialLink} from "~/utils/SocialLink.tsx";

function FooterItem(
    props: {
        name: string,
        link: string,
    }
) {
    return <MyLink href={props.link} target="_blank">
        <div className="text-sm sm:text-base opacity-75">
            {props.name}
        </div>
    </MyLink>
}

function FooterSection(
    props: PropsWithChildren & {
        title: string
    }
) {
    return <div className="flex flex-col justify-start">
        <div className="font-bold opacity-75 text-xl sm:text-2xl">
            {props.title}
        </div>
        <div className="h-6"/>
        <div className="flex flex-col space-y-4">
            {props.children}
        </div>
    </div>
}

export default function Footer() {
    const data = getFooterData()
    const t = useTranslate()
    return <div className={classNames(
        "container"
    )}>
        <div className="divider"/>
        <div className={classNames(
            " px-4 pb-16 pt-8",
            "flex flex-col",
            "sm:items-center"
        )}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-24 gap-y-12">
                <FooterSection title={t("social_and_community")}>
                    {
                        data.socials.map(i=>{
                            return <FooterItem key={i.link} name={useGetNameForSocialLink(i)} link={i.link}/>
                        })
                    }
                </FooterSection>
                <FooterSection title={t("footer_project")}>
                    <FooterItem name={t("footer_source_code")} link={data.sourceCodeUrl}/>
                    <FooterItem name={t("footer_issues")} link={data.issuesLink}/>
                    <FooterItem name={t("footer_discussion")} link={data.discussionLink}/>
                </FooterSection>
                <FooterSection title={t("footer_developer")}>
                    <FooterItem name={t("footer_my_personal_website")} link={data.developerSite}/>
                    <FooterItem name={t("footer_contact_me")} link={data.developerSite}/>
                    <FooterItem name={t("footer_my_github")} link={data.developerGithub}/>
                </FooterSection>
            </div>
            <div className="h-8"/>
            <div className="text-base sm:text-lg font-bold">
                {t("footer_developed_with_love")} <MyLink className="text-blue-500"
                      href={data.developerSite}>{data.developerName}</MyLink>
            </div>
            <div className="h-8"/>
            <div className="flex flex-col md:flex-row justify-center sm:items-center text-sm sm:text-base">
                <div>
                    {t("footer_released_under")} <MyLink className="text-blue-500" href={data.licence.link}>{data.licence.name}</MyLink>
                </div>
                <div className="divider md:divider-horizontal"/>
                <div dir="ltr">
                    © {data.copyright.since}-present {data.copyright.for}
                </div>
            </div>
        </div>
    </div>
}