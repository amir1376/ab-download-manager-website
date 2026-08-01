import {Icon} from "@iconify/react"
import classNames from "classnames"
import {useState} from "react"
import {QRCodeSVG} from "qrcode.react"
import {useAsync} from "react-use"
import {useTranslate} from "~/abstraction/i18n"
import {DonationMethod} from "~/data/DonationMethods.ts";

export function DonatePageContent(
    props: {
        getData: () => Promise<Array<DonationMethod>>
    }
) {
    const t = useTranslate()
    const {value: methods, loading, error} = useAsync(props.getData, [])
    const [selectedCrypto, setSelectedCrypto] = useState<DonationMethod | null>(null)
    return <>
        <div className="container mx-auto px-4 py-16 min-h-[calc(100vh-200px)]">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
                    {t("donate")}
                </h1>
                <p className="text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed">
                    {t("donate_description")}
                </p>
            </div>

            {loading && (
                <div className="flex justify-center items-center py-20">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            )}

            {error && (
                <div className="alert alert-error max-w-xl mx-auto shadow-lg">
                    <Icon icon="mdi:alert-circle" className="w-6 h-6"/>
                    <span>{t("error")} {error.message}</span>
                </div>
            )}

            {methods && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {methods.map((method) => (
                        method.type === 'crypto' ? (
                            <CryptoDonationCard key={method.id} method={method}
                                                onClick={() => setSelectedCrypto(method)}/>
                        ) : (
                            <LinkDonationCard key={method.id} method={method}/>
                        )
                    ))}
                </div>
            )}
        </div>

        <dialog
            className={classNames("modal modal-bottom sm:modal-middle", {"modal-open": selectedCrypto !== null})}>
            <div className="modal-box">
                <form method="dialog">
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={(e) => {
                            e.preventDefault()
                            setSelectedCrypto(null)
                        }}
                    >✕
                    </button>
                </form>

                {selectedCrypto && <CryptoAddressDialog selectedCrypto={selectedCrypto}/>}
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={(e) => {
                    e.preventDefault()
                    setSelectedCrypto(null)
                }}>close
                </button>
            </form>
        </dialog>
    </>
}

function CryptoDonationCard({method, onClick}: { method: DonationMethod, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="card bg-base-200 shadow-sm border border-base-content/5 hover:border-primary/50 hover:shadow-md transition-all duration-300 w-full text-left"
        >
            <div className="card-body flex-row items-center p-6 gap-4">
                <RenderPaymentIcon icon={method.icon} iconTint={method.iconTint} className="w-12 h-12"/>
                <div>
                    <h3 className="card-title text-xl font-bold">{method.name}</h3>
                    <p className="text-sm text-base-content/60">Click to view QR code & address</p>
                </div>
            </div>
        </button>
    )
}

function LinkDonationCard({method}: { method: DonationMethod }) {
    const t = useTranslate()

    return (
        <a
            href={method.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card bg-base-200 shadow-sm border border-base-content/5 hover:border-primary/50 hover:shadow-md transition-all duration-300 block w-full"
        >
            <div className="card-body flex-row items-center p-6 gap-4">
                <RenderPaymentIcon icon={method.icon} iconTint={method.iconTint} className="w-12 h-12"/>
                <div>
                    <h3 className="card-title text-xl font-bold">{method.name}</h3>
                    <p className="text-sm text-base-content/60">{t("donate")} via {method.name}</p>
                </div>
            </div>
        </a>
    )
}

function RenderPaymentIcon(
    props: {
        icon: string,
        className?: string,
        iconTint: string | undefined,
    }
) {
    let textColor = props.iconTint
    return <Icon
        style={{
            color: textColor
        }}
        icon={props.icon}
        className={classNames(props.className)}
    />
}

function CryptoAddressDialog(
    props: {
        selectedCrypto: DonationMethod
    }
) {
    const t = useTranslate()
    const selectedCrypto = props.selectedCrypto
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        if (selectedCrypto?.address) {
            navigator.clipboard
                .writeText(selectedCrypto.address)
                .then(() => {
                    setCopied(true)
                })
            setTimeout(() => setCopied(false), 2000)
        }
    }
    return <div className="flex flex-col items-center text-center p-4">
        <RenderPaymentIcon icon={selectedCrypto.icon} iconTint={selectedCrypto.iconTint} className="w-16 h-16 mb-2"/>
        <h3 className="text-2xl font-bold mb-6">{selectedCrypto.name}</h3>

        <div className="bg-white p-4 rounded-xl shadow-inner mb-6">
            <QRCodeSVG
                value={selectedCrypto.address || ""}
                size={200}
                bgColor="#ffffff"
                fgColor="#000000"
            />
        </div>

        <div className="w-full flex flex-col gap-3 mt-4">
            <div className="text-sm font-mono bg-base-300 p-4 rounded-lg break-all text-base-content/80 select-all">
                {selectedCrypto.address}
            </div>
            <button
                onClick={handleCopy}
                className={classNames(
                    "btn btn-block",
                    copied ? "btn-success text-success-content" : "btn-primary"
                )}
            >
                <Icon icon={copied ? "mdi:check" : "mdi:content-copy"} className="w-5 h-5"/>
                {copied ? t("copied") : t("copy_address")}
            </button>
        </div>
    </div>
}
