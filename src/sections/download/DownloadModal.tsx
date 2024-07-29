import {Modal, ModalContent, ModalHeader} from "~/components/Modal";
import classNames from "classnames";
import {Icon} from "@iconify/react";
import {PropsWithChildren, ReactElement, ReactNode, useMemo, useState} from "react";
import {
    providerInfo,
    isThirdPartyLink,
    LinkType,
    PossiblePlatformsType,
    AppVersionData,
    osInfo,
    BrowserExtensionVersionData,
    browserInfo,
    VersionData,
    isDirectLink,
    DirectLink,
    ChecksumHash
} from "~/data/LatestAppVersionData.ts";
import {MyLink} from "~/abstraction/navigation";
import {useCurrentDirection, useTranslate} from "~/abstraction/i18n";
import {detectOS} from "~/utils/OsDetector.ts";
import {useDownloadData} from "~/sections/download/DownloadDataContext";
import {run} from "~/utils/functionalUtils.ts";
import {useCopyToClipboard} from "usehooks-ts";

export type DownloadModalProps = {
    onClose: () => void
}

function OSOption(
    props: {
        name: string,
        icon: string,
        isSelected: boolean,
        onSelect: () => void,
        isExperimental: boolean,
    }
) {
    return <div onClick={props.onSelect} className={classNames(
        "relative",
        "cursor-pointer select-none",
    )}>
        <div className={classNames(
            "flex flex-col items-center space-y-2 justify-center",
            "transition-all",
            "border-2 rounded",
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
        {props.isExperimental && (
            <WarningBadge isActive={props.isSelected}/>
        )}
    </div>
}

function WarningBadge(
    props: {
        isActive: boolean
    }
) {
    const direction = useCurrentDirection()
    return <div className={classNames(
        "absolute top-0 end-0",
        "transform -translate-y-1/2",
        direction == "ltr" ? "translate-x-1/2" : "-translate-x-1/2",
        "badge badge-xs badge-warning",
        "transition-all",
        props.isActive && "scale-150",
    )}>!</div>
}

function OsSection(
    props: {
        availablePlatforms: readonly AppVersionData[],
        selectedPlatform: PossiblePlatformsType,
        setSelectedOs: (os: PossiblePlatformsType) => void
    }
) {
    const {selectedPlatform, setSelectedOs} = props
    const osesToRender = useMemo(() => {
            return props.availablePlatforms
                .map(({platform, experimental}) => {
                    return {
                        code: platform,
                        isExperimental: experimental,
                        ...osInfo[platform],
                    }
                })
        }, [props.availablePlatforms]
    )

    return <div className="flex flex-row flex-wrap gap-4">
        {
            osesToRender.map(os => {
                return <OSOption
                    key={os.code}
                    name={os.name}
                    icon={os.icon}
                    isExperimental={os.isExperimental}
                    isSelected={selectedPlatform == os.code}
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
                haveLink ? "cursor-pointer" : "cursor-not-allowed"
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
    const t = useTranslate()
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
        title = run(() => {
            let m = t("download_direct_download")
            if (props.downloadLink.ext) {
                m += ` (${props.downloadLink.ext})`
            }
            return m
        })
    }
    return <div className="flex flex-col">
        <RenderDownloadLinkBase
            link={link.link}
            icon={icon}
            title={title}
        />
        {isDirectLink(link) && (
            <Checksums
                className="mt-1"
                btnExtraClassName="ms-4"
                checksums={link.checksums}/>
        )}
    </div>
}

function Checksums(props: {
    checksums: ChecksumHash[],
    btnExtraClassName?: string,
    className?: string
}) {
    if (props.checksums.length == 0) {
        return null
    }
    const t = useTranslate()
    const [, copyToClipboard] = useCopyToClipboard()
    return <div className={props.className}>
        <div className="flex flex-col dropdown dropdown-bottom">
            <div tabIndex={0} className={classNames(
                "self-start hover:underline cursor-pointer text-sm",
                props.btnExtraClassName,
            )}>
                {t("file_checksum")}
            </div>
            <div tabIndex={0} className="z-50 shadow-xl dropdown-content rounded-full bg-base-300">
                {props.checksums.map((checksum,) => {
                    return <div
                        dir="ltr"
                        key={checksum.type}
                        className="p-1 flex flex-row items-center space-x-1"
                    >
                        <div className="px-1">{checksum.type.toUpperCase()}</div>
                        <div className="text-sm ps-2 bg-base-200 rounded-full items-center flex flex-row">
                            <code>{checksum.value}</code>
                            <div className="btn btn-sm btn-circle btn-ghost"
                                 onClick={() => copyToClipboard(checksum.value)}>
                                <Icon height={16} width={16} icon="ic:round-content-copy"/>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    </div>
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
    const {remoteData, refresh} = useDownloadData()
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

function ExperimentalPlatformWarning(
    props: {
        platform: PossiblePlatformsType,
    }
) {
    const t = useTranslate()
    const os = osInfo[props.platform]
    return <div className="w-72">
        <div className="text-lg font-bold text-warning">{t("attention")}:</div>
        <div className="text-base">{t("experimental_platform_warning", {
            platform: os.name
        })}</div>
    </div>
}

function LoadedDownloadModal(
    props: {
        data: VersionData
    }
) {
    const {app: appForPlatforms, browser_extension} = props.data
    const [selectedPlatform, setSelectedPlatform] = useState<PossiblePlatformsType>(
        () => {
            const detectedOs = detectOS();
            if (detectedOs && appForPlatforms.find(v => v.platform === detectedOs)) {
                return detectedOs
            }
            return appForPlatforms[0].platform
        }
    )
    const currentOsData = useMemo(
        () => appForPlatforms.find(item => item.platform == selectedPlatform)
        , [selectedPlatform, appForPlatforms])
    const dir = useCurrentDirection()
    const t = useTranslate()
    return <div dir={dir} className="flex flex-col md:flex-row gap-8">
        <div className="flex flex-col space-y-8">
            <TopOfSection step={1} title={t("download_select_platform")}>
                <div className="flex flex-col space-y-4">
                    <OsSection
                        availablePlatforms={appForPlatforms}
                        selectedPlatform={selectedPlatform} setSelectedOs={setSelectedPlatform}
                    />
                    {currentOsData?.experimental && (
                        <ExperimentalPlatformWarning platform={currentOsData.platform}/>
                    )}
                </div>
            </TopOfSection>

            <TopOfSection step={2} title={t("download_select_download_method")}>
                <DownloadSection versionInfo={currentOsData!}/>
            </TopOfSection>
        </div>
        <div className="flex flex-col space-x-8">
            {
                browser_extension.length > 0 && <TopOfSection step={3} title={t("download_extension_for_browser")}>
                    <DownloadExtensionSection extensionLinks={browser_extension!}/>
                </TopOfSection>
            }
        </div>
    </div>
}

function LoadingContent() {
    return <div className="flex flex-col justify-center items-center p-16">
        <div className="loading"></div>
        <div>Please Wait...</div>
    </div>
}

function ErrorContent(props: {
    error: string,
    refresh: () => void
}) {
    return <div className="flex flex-col justify-center items-center p-16">
        <div>Error!</div>
        <div className="opacity-75">{props.error}</div>
        <button onClick={props.refresh}>Refresh</button>
    </div>
}
