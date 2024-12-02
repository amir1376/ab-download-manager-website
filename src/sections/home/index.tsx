import classNames from "classnames";
import React, {PropsWithChildren} from "react";
import {FeatureProp, HomeData, ImageProp, MainAppScreenshot} from "~/data/homedata";
import {Icon} from "@iconify/react";
import {MyLink} from "~/abstraction/navigation";
import {useCurrentDirection, useTranslate} from "~/abstraction/i18n";
import {useLocation, useNavigate} from "react-router-dom";
import DownloadModal from "~/sections/download/DownloadModal.tsx";
import {ProvideDownloadData} from "~/sections/download/DownloadDataContext.tsx";
import {useTheme} from "~/abstraction/theme/useTheme.tsx";
import {VersionData} from "~/data/LatestAppVersionData.ts";
import Constants from "~/data/Constants.ts";

function Hero(props: { icon: ImageProp, title: string, description: string }) {
    const t = useTranslate()
    const iconSource = props.icon.src
    return <div className="container flex flex-col md:flex-row justify-center items-center">
        <div className="mx-auto relative p-8 flex items-center justify-center flex-shrink-0">
            <div
                className={classNames(
                    "z-[0] h-64 w-64 scale-100",
                    "absolute",
                    `blur-3xl bg-gradient-to-br my-primary-gradient-colors`
                )}
            />
            <img className="h-52 sm:h-64 w-52 sm:w-64 z-[1]"
                 src={iconSource}
                 alt={props.icon.alt}
            />
        </div>
        <div className="flex flex-col space-y-10 p-4 md:max-w-[55%]">
            <h2 className={classNames(
                "text-4xl md:text-5xl lg:text-6xl font-extrabold text-center md:text-left"
            )}>{props.title}</h2>
            <h5 className={classNames(
                "text-xl sm:text-2xl lg:text-3xl font-medium leading-normal text-center md:text-left"
            )}>{props.description}</h5>
            <div className="flex flex-row flex-wrap gap-4 justify-center md:justify-start">
                <MyLink href={`/#download`}>
                    <div className={classNames(
                        "btn btn-primary btn-lg rounded-full border-2",
                        "min-w-48",
                        "font-bold",
                        "shadow-btn-blur shadow-primary/50"
                    )}>
                        <Icon height={32} width={32} icon="material-symbols:download"/>
                        <span>{t("home_hero_get_app")}</span>
                    </div>
                </MyLink>
                {/*<MyLink href={Constants.openSource.sourceCodeUrl} target="_blank">*/}
                {/*    <div className={classNames(*/}
                {/*        "btn btn-primary btn-outline btn-lg rounded-full border-2",*/}
                {/*        "min-w-48",*/}
                {/*        "font-bold",*/}
                {/*    )}>*/}
                {/*        <Icon height={32} width={32} icon="mdi:github"/>*/}
                {/*        <span>{t("source_code")}</span>*/}
                {/*    </div>*/}
                {/*</MyLink>*/}
                {/*
                <div className={classNames(
                    "btn btn-outline btn-primary btn-lg rounded-full border-2",
                    "min-w-48",
                    "font-bold",
                )}>
                    {t("home_hero_see_guides")}
                </div>
*/}

            </div>
        </div>
    </div>
}

function SectionWithTitle(
    props: {
        title: string,
        className: string,
        id: string,
    } & PropsWithChildren
) {
    return <div id={props.id} className={classNames(
        props.className,
        "space-y-8"
    )}>
        <MyLink href={`#${props.id}`}>
            <div className="inline-block font-bold text-3xl sm:text-4xl">
                {props.title}
            </div>
        </MyLink>
        {props.children}
    </div>
}

function Screenshots(props: { images: MainAppScreenshot }) {
    const {isDark} = useTheme()
    const variant = isDark ? "dark" : "light"
    const homeScreenshot = props.images.home[variant]
    const downloadScreenshot = props.images.download[variant]
    return <div className="bg-base-200/25 py-8">
        <div dir="ltr"
             className="z-10 container justify-center space-y-4 lg:space-y-0 lg:space-x-2 lg:flex-wrap flex flex-col lg:flex-row">
            <img className="object-cover lg:h-[26rem]" src={homeScreenshot.src} alt={homeScreenshot.alt}/>
            <img className="object-cover lg:h-[26rem]" src={downloadScreenshot.src} alt={downloadScreenshot.alt}/>
        </div>
    </div>
}


function Feature({feature}: {
    feature: FeatureProp,
}) {
    const t = useTranslate()
    return <div className={classNames(
        "flex flex-col transition-all hover:scale-105",
        "py-8 px-8 rounded-lg cursor-default",
        "bg-base-200 text-base-content",
        "border border-base-content/10",
        "shadow hover:shadow-lg",
        "gradient-border"
    )}>
        <div className="text-xl sm:text-2xl font-bold">
            {t(feature.title)}
        </div>
        <div className="mt-2"/>
        <div className="text-sm sm:text-base opacity-75">
            {t(feature.description)}
        </div>
    </div>
}


function Features(props: { features: FeatureProp[] }) {
    const t = useTranslate()
    return <SectionWithTitle
        className="container"
        title={t("home_features")}
        id="features">
        <div className={classNames(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-8",
        )}>
            {
                props.features.map((feature, index) => {
                    return <Feature
                        key={feature.title}
                        feature={feature}
                    />
                })
            }
        </div>
    </SectionWithTitle>
}

interface HomeProps {
    data: HomeData
}

export default function Home(
    {data}: HomeProps
) {
    const t = useTranslate()
    const dir = useCurrentDirection()
    const location = useLocation()
    const showDownloadDialog = location.hash === "#download"
    const navigate = useNavigate()
    const close = () => {
        location.hash = ""
        navigate(location)
    }
    return (
        <ProvideDownloadData
            requestData={async () => {
                const latestVersionData:VersionData = await (
                    await fetch("/generated/latest_version_data.json")
                ).json()
                return latestVersionData
            }}
        >
            {showDownloadDialog && <DownloadModal onClose={() => close()}/>}
            <div dir={dir} className="pt-16 pb-16 px-4">
                <Hero
                    icon={data.borderedIcon}
                    title={t(data.title)}
                    description={t(data.description)}
                />
                <div className="mt-36"/>
                <Screenshots images={data.screenshots}/>
                <div className="mt-12"/>
                <Features features={data.features}/>
            </div>
        </ProvideDownloadData>
    )
}
