import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { marked } from "marked";
import { useCurrentDirection, useCurrentLanguageInfo, useTranslate } from "~/abstraction/i18n";
import { Icon } from "@iconify/react";
import classNames from "classnames";
import { SidebarCategoryData } from "~/data/docsdata";

export interface DocsProps {
    data: SidebarCategoryData[];
}

export default function Docs({ data }: DocsProps) {
    const { docId: paramDocId } = useParams<{ docId?: string }>();
    const navigate = useNavigate();
    const [markdown, setMarkdown] = useState<string>("");
    const [docError, setDocError] = useState<"no_doc" | "not_found" | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isFallback, setIsFallback] = useState<boolean>(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    
    const currentLanguageInfo = useCurrentLanguageInfo();
    const dir = useCurrentDirection();
    const t = useTranslate();

    // Dynamically translated sidebar category and item labels
    const sidebarItems = useMemo(() => {
        return data.map(cat => ({
            category: t(cat.category),
            items: cat.items.map(item => ({
                id: item.id,
                title: t(item.title),
                icon: item.icon
            }))
        }));
    }, [data, t]);

    const defaultDocId = sidebarItems.length > 0 && sidebarItems[0].items.length > 0 ? sidebarItems[0].items[0].id : "";
    const docId = paramDocId || defaultDocId;

    useEffect(() => {
        let isMounted = true;

        const fetchMarkdownFile = async (lang: string, id: string): Promise<string | null> => {
            try {
                const res = await fetch(`/docs/${lang}/${id}.md`);
                if (!res.ok) return null;
                const text = await res.text();
                const textLower = text.trim().toLowerCase();
                const isHtml = textLower.startsWith("<!doctype html") || textLower.startsWith("<html") || textLower.startsWith("<!html");
                return isHtml ? null : text;
            } catch {
                return null;
            }
        };

        const fetchDoc = async () => {
            setIsLoading(true);
            setDocError(null);

            if (!docId) {
                setDocError("no_doc");
                setIsFallback(false);
                setIsLoading(false);
                return;
            }

            const locale = currentLanguageInfo?.locale || "en-US";

            let content = await fetchMarkdownFile(locale, docId);
            let fallbackActive = false;

            if (!content && locale !== "en-US") {
                // Fallback to default en-US
                content = await fetchMarkdownFile("en-US", docId);
                fallbackActive = !!content;
            }

            if (!content) {
                setDocError("not_found");
                setIsFallback(false);
                setIsLoading(false);
                return;
            }

            if (isMounted) {
                setMarkdown(content);
                setIsFallback(fallbackActive);
                setIsLoading(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        };

        fetchDoc();
        return () => {
            isMounted = false;
        };
    }, [docId, currentLanguageInfo]);

    // Parse HTML using marked safely
    const parsedHtml = useMemo(() => {
        try {
            return marked.parse(markdown) as string;
        } catch (e) {
            return markdown;
        }
    }, [markdown]);

    const handleSelectDoc = (id: string) => {
        navigate(`/docs/${id}`);
        setMobileMenuOpen(false);
    };

    return (
        <div dir={dir} className="min-h-screen bg-base-100 text-base-content pt-20 px-4 md:px-6 lg:px-8">
            <div className="container mx-auto flex flex-col md:flex-row gap-8 py-6">
                
                {/* Mobile Navigation Bar */}
                <div className="md:hidden flex items-center justify-between bg-base-200 border border-base-content/10 p-3 rounded-xl mb-4">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="btn btn-ghost btn-sm flex items-center gap-2"
                    >
                        <Icon icon="mdi:menu" className="w-5 h-5" />
                        <span className="font-semibold">{t("docs_menu")}</span>
                    </button>
                    <div className="text-sm font-bold text-primary capitalize">{docId.replace("-", " ")}</div>
                </div>

                {/* Mobile Menu Dropdown Backdrop */}
                {mobileMenuOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                )}

                {/* Sidebar Navigation Panel */}
                <aside className={classNames(
                    "fixed md:sticky top-0 md:top-24 bottom-0 start-0 z-50 md:z-auto w-64 max-w-[80vw] bg-base-200 md:bg-transparent border-e border-base-content/10 md:border-none p-0 md:p-0 transition-transform duration-300 md:translate-x-0 md:rtl:translate-x-0",
                    mobileMenuOpen 
                        ? "translate-x-0 rtl:translate-x-0" 
                        : "-translate-x-full md:translate-x-0 rtl:translate-x-full md:rtl:translate-x-0"
                )}>
                    {/* Mobile Drawer Header */}
                    <div className="md:hidden flex items-center justify-between border-b border-b-base-content/10 px-6 py-4 mb-4">
                        <span className="font-bold text-base text-primary uppercase tracking-wider">{t("docs_menu")}</span>
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="btn btn-ghost btn-circle btn-sm"
                            aria-label="Close menu"
                        >
                            <Icon icon="mdi:close" className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex flex-col space-y-8 max-h-[calc(100vh-5rem)] md:max-h-[80vh] overflow-y-auto p-6 md:p-0 pr-2">
                        {sidebarItems.map((cat, idx) => cat.items.length > 0 && (
                            <div key={idx} className="flex flex-col space-y-2">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-base-content/40 px-3">
                                    {cat.category}
                                </h4>
                                <ul className="space-y-1">
                                    {cat.items.map(item => {
                                        const isActive = docId === item.id;
                                        return (
                                            <li key={item.id}>
                                                <button
                                                    onClick={() => handleSelectDoc(item.id)}
                                                    className={classNames(
                                                        "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all text-start",
                                                        isActive 
                                                            ? "bg-primary text-primary-content shadow-lg shadow-primary/20 font-bold"
                                                            : "hover:bg-base-content/10 text-base-content/75 hover:text-base-content"
                                                    )}
                                                >
                                                    <Icon icon={item.icon} className="w-5 h-5 flex-shrink-0" />
                                                    <span className="truncate">{item.title}</span>
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>
                </aside>

                <main className="flex-1 min-w-0 bg-base-200/30 border border-base-content/5 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-sm">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 space-y-4">
                            <div className="loading loading-spinner loading-lg text-primary"></div>
                            <div className="text-sm opacity-60">{t("docs_loading")}</div>
                        </div>
                    ) : docError ? (
                        <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
                            <Icon icon="mdi:file-document-remove-outline" className="w-16 h-16 text-base-content/20" />
                            <h2 className="text-2xl font-bold">
                                {docError === "no_doc" ? t("docs_no_documentation") : t("docs_not_found_title")}
                            </h2>
                            <p className="opacity-60 max-w-md">
                                {docError === "no_doc" ? t("docs_no_documentation_desc") : t("docs_not_found_desc")}
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Falling back to English with translation CTA warning */}
                            {isFallback && currentLanguageInfo?.locale !== "en-US" && (
                                <div className="flex flex-col sm:flex-row items-center gap-4 bg-warning/15 border border-warning/30 text-base-content px-5 py-4 rounded-2xl mb-8 text-sm relative overflow-hidden shadow-inner animate-fade-in">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-warning" />
                                    <Icon icon="mdi:translate-off" className="w-6 h-6 flex-shrink-0 text-warning" />
                                    <div className="flex-1 text-center sm:text-start">
                                        <span className="font-bold">{t("docs_translation_missing")}</span>{" "}
                                        {t("docs_fallback_warning", { language: currentLanguageInfo?.name?.native || currentLanguageInfo?.locale })}
                                    </div>
                                    <a
                                        href="https://github.com/amir1376/ab-download-manager-website"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-warning btn-sm flex items-center gap-1.5 font-bold shadow-sm"
                                    >
                                        <Icon icon="mdi:github" className="w-4 h-4" />
                                        <span>{t("docs_help_translate")}</span>
                                    </a>
                                </div>
                            )}
                            <article 
                                className="prose-docs prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: parsedHtml }}
                            />
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}
