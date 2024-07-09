import {Modal, ModalContent, ModalHeader} from "~/components/Modal";
import classNames from "classnames";
import {Icon} from "@iconify/react";
import {PropsWithChildren, ReactNode, useMemo, useState} from "react";
import {
    providerInfo,
    getLatestVersionData, isThirdPartyLink, LinkType,
    possiblePlatformNames,
    PossiblePlatformsType,
    AppVersionData, osInfo, BrowserExtensionVersionData, browserInfo, PossibleBrowserType, ApiResult
} from "~/data/LatestAppVersionData.tsx";
import {MyLink} from "~/abstraction/navigation";
import {useCurrentDirection, useTranslate} from "~/abstraction/i18n";
import {detectOS} from "~/utils/OsDetector.ts";
import {useDownloadData} from "~/sections/download/DownloadDataContext";
import {run, runWith} from "~/utils/functionalUtils.ts";

export type DownloadModalProps = {
    onClose: () => void
}

function OSOption(
    props: {
        name: string,
        icon: string,
        isSelected: boolean,
        onSelect: () => void,
    }
) {
    return <div onClick={props.onSelect} className={classNames(
        "flex flex-col items-center space-y-2 justify-center",
        "transition-all",
        "border-2 rounded",
        "cursor-pointer select-none",
        "py-2 px-4",
        props.isSelected
            ? ["bg-base-content/20", "border-primary"]
            : ["border-base-content/20"],
        !props.isSelected && "hover:bg-base-content/20",
    )}>
        <Icon height={32} width={32} icon={props.icon}/>
        <div className={classNames(
            props.isSelected ? "text-opacity-100" : "text-opacity-75"
        )}>{props.name}</div>
    </div>
}


function OsSection(
    props: {
        availableOs: PossiblePlatformsType[],
        selectedOs: PossiblePlatformsType,
        setSelectedOs: (os: PossiblePlatformsType) => void
    }
) {
    const {selectedOs, setSelectedOs} = props
    const osesToRender = useMemo(() => {
            return props.availableOs
                .map(v => {
                    return {
                        code: v,
                        ...osInfo[v]
                    }
                })
        }, [props.availableOs]
    )

    return <div className="flex flex-row flex-wrap gap-4">
        {
            osesToRender.map(os => {
                return <OSOption
                    key={os.code}
                    name={os.name}
                    icon={os.icon}
                    isSelected={selectedOs == os.code}
                    onSelect={() => setSelectedOs(os.code)}
                />
            })
        }
    </div>
}

function TopOfSection(props: {
    title: string
    step: number
} & PropsWithChildren) {
    return <div className="">
        <div className="flex flex-row items-center select-none mb-4 mt-2 text-lg font-bold">
        <span
            className="text-primary me-1">
            {props.step}.
        </span>
            <span>{props.title}</span>
        </div>
        {props.children}
    </div>
}

function RenderDownloadLinkBase(
    props: {
        link: string,
        icon: string,
        title: string,
    }
) {
    const haveLink = !!props.link
    return <div className="flex flex-row relative">
        <MyLink enabled={haveLink} aria-disabled={!haveLink} href={props.link} target="_blank">
            <div className={classNames(
                "flex flex-row items-center gap-4",
                "transition-all",
                "border-2 border-primary rounded-full",
                "select-none",
                "py-3 px-4",
                "border-opacity-0",
                "bg-base-content/10",
                "hover:bg-base-content/20",
                "w-72 justify-start",
                haveLink? "cursor-pointer" : "cursor-not-allowed"
                // "btn btn-ghost btn-outline w-72 justify-start"
            )}>
                <Icon className="h-6 w-6" icon={props.icon}/>
                <div>{props.title}</div>
            </div>
        </MyLink>
        {!haveLink && <ComingSoonBadge/>}
    </div>
}
function ComingSoonBadge() {
    const t= useTranslate()
    return <div className="badge badge-primary absolute top-0 end-0 transform -translate-y-1/2">
        {t("coming_soon")}
    </div>
}

function RenderAppDownloadLink(
    props: {
        downloadLink: LinkType,
        platform: PossiblePlatformsType,
    }
) {
    const t = useTranslate()
    const link = props.downloadLink;
    let icon: string
    let title: string
    if (isThirdPartyLink(link)) {
        const info = providerInfo[link.provider];
        icon = info.icon
        title = t("download_from_provider", {
            name: info.fullName
        })
    } else {
        icon = osInfo[props.platform].icon
        // console.log(icon, props.platform)
        title = run(()=>{
            let m= t("download_direct_download")
            if (props.downloadLink.ext){
                m+=` (${props.downloadLink.ext})`
            }
            return m
        })
    }
    return <RenderDownloadLinkBase
        link={link.link}
        icon={icon}
        title={title}
    />
}


function DownloadSection(
    props: {
        versionInfo: AppVersionData
    }
) {
    const t = useTranslate()
    const orDivider = <div className="divider my-2 select-none">
        <span className="opacity-50">{t("or")}</span>
    </div>
    return <div>
        <div className="flex flex-col py-2">
            {props.versionInfo.links.map((dlLink, index) => (
                <div key={index}>
                    {index != 0 && orDivider}
                    <RenderAppDownloadLink
                        key={index}
                        platform={props.versionInfo.platform}
                        downloadLink={dlLink}/>
                </div>
            ))}
        </div>
        <div className="mt-4 flex flex-row items-center select-none">
            <span className="opacity-50">{t("download_version")}:</span>
            <span className="opacity-75">{props.versionInfo.version}</span>
        </div>
    </div>
}

function DownloadExtensionSection(
    props: {
        extensionLinks: ReadonlyArray<BrowserExtensionVersionData>
    }
) {
    const t = useTranslate()
    const orDivider = <div className="divider my-2 select-none">
        <span className="opacity-50">{t("or")}</span>
    </div>
    const extensions = props.extensionLinks
        .map(e => {
            return {
                ...browserInfo[e.browserType],
                link: e.link,
            }
        })


    return <div>
        <div className="flex flex-col py-2">
            {extensions.map((extensionLink, index) => (
                <div key={index}>
                    {index != 0 && orDivider}
                    <RenderDownloadLinkBase
                        key={index}
                        icon={extensionLink.icon}
                        title={t("download_for", {name: extensionLink.name})}
                        link={extensionLink.link}
                    />
                </div>
            ))}
        </div>
    </div>
}

export default function DownloadModal(props: DownloadModalProps) {
    const {remoteData,refresh}=useDownloadData()
    const t = useTranslate()
    let content: ReactNode
    if (remoteData.loading) {
        content = <LoadingContent/>
    } else {
        if (remoteData.error) {
            content = <ErrorContent
                error={remoteData.error.message}
                refresh={refresh}
            />
        } else {
            content = <LoadedDownloadModal data={remoteData.value!}/>
        }
    }
    return <Modal onClickOutside={props.onClose}>
        <ModalHeader title={t("home_hero_get_app")} onClose={props.onClose}/>
        <ModalContent>
            <div className="">
                {content}
            </div>
        </ModalContent>
    </Modal>
}

function LoadedDownloadModal(
    props: {
        data: ApiResult
    }
) {
    const {app, browser_extension} = props.data
    const availableOs = useMemo(
        () => app.map(d => d.platform),
        [app]
    )
    const [os, setOs] = useState<PossiblePlatformsType>(
        () => {
            const detectedOs = detectOS();
            if (detectedOs && availableOs.includes(detectedOs)) {
                return detectedOs
            }
            return availableOs[0]
        }
    )
    const currentOsData = useMemo(
        () => app.find(item => item.platform == os)
        , [os, app])
    const dir = useCurrentDirection()
    const t=useTranslate()
    return <div dir={dir} className="flex flex-col md:flex-row gap-8">
        <div className="flex flex-col space-y-8">
            <TopOfSection step={1} title={t("download_select_platform")}>
                <OsSection availableOs={availableOs} selectedOs={os} setSelectedOs={setOs}/>
            </TopOfSection>

            <TopOfSection step={2} title={t("download_select_download_method")}>
                <DownloadSection versionInfo={currentOsData!}/>
            </TopOfSection>
        </div>
        <div className="flex flex-col space-x-8">
            {
                browser_extension.length>0 && <TopOfSection step={3} title={t("download_extension_for_browser")}>
                    <DownloadExtensionSection extensionLinks={browser_extension!}/>
                </TopOfSection>
            }
        </div>
    </div>
}
function LoadingContent(){
    return <div className="flex flex-col justify-center items-center p-16">
        <div className="loading"></div>
        <div>Please Wait...</div>
    </div>
}
function ErrorContent(props:{
    error:string,
    refresh:()=>void
}){
    return <div className="flex flex-col justify-center items-center p-16">
        <div>Error!</div>
        <div className="opacity-75">{props.error}</div>
        <button onClick={props.refresh}>Refresh</button>
    </div>
}