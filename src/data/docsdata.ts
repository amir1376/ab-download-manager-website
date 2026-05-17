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
            category: "docs_getting_started",
            items: [
                { id: "introduction", title: "docs_introduction", icon: "mdi:play-circle-outline" }
            ]
        },
        {
            category: "docs_usage",
            items: [
                { id: "integration", title: "docs_integration", icon: "mdi:web" }
            ]
        },
        {
            category: "docs_resources",
            items: [
                { id: "faq", title: "docs_faq", icon: "mdi:help-circle-outline" }
            ]
        }
    ];
}
