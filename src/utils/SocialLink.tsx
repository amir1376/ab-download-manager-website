import {useTranslate} from "~/abstraction/i18n";

export enum SocialType {
    TelegramChanel="telegram-channel",
    TelegramGroup="telegram-group",
    X="x",
    Instagram="instagram",
    Email="mail",
}

export interface SocialLink{
    link:string,
    type:SocialType
}

export function useGetNameForSocialLink(socialLink:SocialLink){
    const t = useTranslate()
    switch (socialLink.type){
        case SocialType.TelegramChanel:
            return t("social_telegram_channel")
        case SocialType.TelegramGroup:
            return t("social_telegram_group")
        case SocialType.X:
            return t("social_x")
        case SocialType.Instagram:
            return t("social_instagram")
        case SocialType.Email:
            return t("social_email")
    }
}
export function useGetIconForSocialLink(socialLink:SocialLink){
    switch (socialLink.type){
        case SocialType.TelegramChanel:
            return "ic:baseline-telegram"
        case SocialType.TelegramGroup:
            return "ic:baseline-telegram"
        case SocialType.X:
            return "mdi:twitter"
        case SocialType.Instagram:
            return "ant-design:instagram-outlined"
        case SocialType.Email:
            return "entypo:email"
    }
}
