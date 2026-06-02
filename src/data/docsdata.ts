import { Translatable } from "~/i18n/Translatable";

export type SidebarItemData = { 
    id: string; 
    title: Translatable; 
    icon: string;
};

export type SidebarCategoryData = { 
    category: Translatable; 
    items: SidebarItemData[];
};

export function getDocsData(): SidebarCategoryData[] {
    return [
        {
            category: "docs_category_getting_started",
            items: [
                { id: "introduction", title: "docs_title_introduction", icon: "mdi:play-circle-outline" },
                { id: "installation", title: "docs_title_installation", icon: "" },
                { id: "portable", title: "docs_title_portable", icon: "" },
            ]
        },
        {
            category: "docs_category_usage",
            items: [
                { id: "integration", title: "docs_title_integration", icon: "mdi:web" }
            ]
        },
        {
            category: "docs_category_resources",
            items: [
                { id: "faq", title: "docs_title_faq", icon: "mdi:help-circle-outline" },
                { id: "uninstallation", title: "docs_title_uninstallation", icon: "" },
            ]
        }
    ];
}
