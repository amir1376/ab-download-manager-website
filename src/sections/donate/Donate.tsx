import {Icon} from "@iconify/react"
import classNames from "classnames"
import React, {useState} from "react"
import {QRCodeSVG} from "qrcode.react"
import {useAsync} from "react-use"
import {useTranslate} from "~/abstraction/i18n"
import {DonationMethod} from "~/data/DonationMethods.ts"
import {Modal, ModalCloseButton, ModalContent, ModalHeader} from "~/components/Modal.tsx";
import {useCopyToClipboard} from "usehooks-ts";

export function DonatePageContent(
    props: {
        getData: () => Promise<Array<DonationMethod>>
    }
) {
    const t = useTranslate()
    const {value: methods, loading, error} = useAsync(props.getData, [])
    const [selectedCrypto, setSelectedCrypto] = useState<DonationMethod | null>(null)
    return (
        <div>
            <div className="container mx-auto px-4 py-16 min-h-[calc(100vh-200px)]">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-base-content mb-6">
                        {t("donate")}
                    </h1>
                    <p className="text-lg text-base-content max-w-2xl mx-auto leading-relaxed">
                        {t("donate_description")}
                    </p>
                </div>
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <span className="loading loading-spinner loading-lg text-primary"/>
                    </div>
                )}
                {error && (
                    <div className="alert alert-error max-w-xl mx-auto shadow-lg">
                        <Icon
                            icon="mdi:alert-circle"
                            className="w-6 h-6"
                        />
                        <span>
                            {t("error")} {error.message}
                        </span>
                    </div>
                )}
                {methods && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {methods.map((method) => (
                            <DonationCard
                                key={method.id}
                                method={method}
                                onClick={
                                    method.type === "crypto"
                                        ? () => setSelectedCrypto(method)
                                        : undefined
                                }
                            />
                        ))}

                    </div>
                )}
            </div>
            {selectedCrypto && (
                <CryptoAddressDialog
                    selectedCrypto={selectedCrypto}
                    onClose={() => setSelectedCrypto(null)}
                />
            )}
        </div>
    )
}

function DonationCard(
    {
        method,
        onClick
    }: {
        method: DonationMethod
        onClick?: () => void
    }
) {
    const t = useTranslate()
    const content = (
        <div className="card-body flex-row items-center p-6 gap-4">
            <RenderPaymentIcon
                icon={method.icon}
                iconTint={method.iconTint}
                className="w-12 h-12"
            />
            <div>
                <h3 className="card-title text-xl font-bold">
                    {method.name}
                </h3>
                <p className="text-sm text-base-content/60">
                    {
                        method.type === "crypto"
                            ? t("click_to_show_address_and_qr_code")
                            : t("donate_via", {name: method.name})
                    }
                </p>
            </div>
        </div>
    )
    const className =
        "card bg-base-200 shadow-sm border border-base-content/5 hover:border-primary/50 hover:shadow-md transition-all duration-300 w-full text-left"

    if (method.url) {
        return (
            <a
                href={method.url}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
            >
                {content}
            </a>
        )
    }

    if (onClick) {
        return (
            <button
                onClick={onClick}
                className={className}
            >
                {content}
            </button>
        )
    }

    return (
        <div className={className}>
            {content}
        </div>
    )
}

function RenderPaymentIcon(
    props: {
        icon: string
        className?: string
        iconTint: string | undefined
    }
) {
    return (
        <Icon
            style={{
                color: props.iconTint
            }}
            icon={props.icon}
            className={classNames(props.className)}
        />
    )
}

function CryptoAddressDialog(
    props: {
        selectedCrypto: DonationMethod,
        onClose: () => void
    }
) {
    const t = useTranslate()
    const selectedCrypto = props.selectedCrypto
    const [copied, setCopied] = useState(false)
    const [, copyToClipboard] = useCopyToClipboard()
    const handleCopy = async () => {
        if (!selectedCrypto.address) {
            return
        }
        await copyToClipboard(selectedCrypto.address)
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 2000)
    }
    return (
        <Modal onClickOutside={props.onClose}>
            <ModalHeader
                title={
                    <div className="flex flex-row items-center">
                        <RenderPaymentIcon
                            icon={selectedCrypto.icon}
                            iconTint={selectedCrypto.iconTint}
                            className="w-8 h-8"
                        />
                        <div className="w-4"/>
                        <h3 className="text-2xl font-bold me-6">
                            {selectedCrypto.name}
                        </h3>
                    </div>
                }
                actions={
                    <ModalCloseButton onClose={props.onClose}/>
                }
            />
            <ModalContent>
                <div className="flex flex-col items-center text-center p-4">
                    <div className="bg-white p-4 rounded-xl shadow-inner mb-6">
                        <QRCodeSVG
                            value={selectedCrypto.address || ""}
                            size={200}
                            bgColor="#ffffff"
                            fgColor="#000000"
                        />
                    </div>
                    <div className="w-full flex flex-col gap-3 mt-4">
                        <div
                            className="text-sm font-mono bg-base-300 p-4 rounded-lg break-all text-base-content/80 select-all">
                            {selectedCrypto.address}
                        </div>
                        <button
                            onClick={handleCopy}
                            className={classNames(
                                "btn btn-block",
                                copied
                                    ? "btn-success text-success-content"
                                    : "btn-primary"
                            )}
                        >
                            <Icon
                                icon={copied ? "mdi:check" : "mdi:content-copy"}
                                className="w-5 h-5"
                            />
                            {
                                copied
                                    ? t("copied")
                                    : t("copy_address")
                            }
                        </button>
                    </div>
                </div>
            </ModalContent>
        </Modal>
    )
}
