export interface DonationMethod {
    id: string;
    name: string;
    icon: string;
    iconTint?: string;
    type: 'crypto' | 'link';
    address?: string;
    url?: string;
}

const DefinedDonationMethods: DonationMethod[] = [
    {
        "id": "btc",
        "name": "Bitcoin",
        "icon": "cryptocurrency-color:btc",
        "type": "crypto",
        "address": "bc1qawk8d3gw287l3anlaamysafwtxzwr2l7xaqng2"
    },
    {
        "id": "gram-ton",
        "name": "Gram (TON)",
        "icon": "token-branded:ton-background",
        "type": "crypto",
        "address": "UQAAPTagY3Y9XWJc9IMYGFYdVHugoBV_Xa3OjdsBHax69eYg"
    },
    {
        "id": "tether-trc20",
        "name": "Tether (TRC20)",
        "icon": "cryptocurrency-color:usdt",
        "type": "crypto",
        "address": "TK8hMh24yGZGUAYwuSf8rRXncm6s9LJmAx"
    },
    {
        "id": "pol",
        "name": "Polygon (POL)",
        "icon": "token-branded:pol-background",
        "type": "crypto",
        "address": "0x16e642eDEfc46555C0eF10D09Cf6FE2a53433D9f"
    },
    {
        "id": "telegram-stars",
        "name": "Telegram Stars",
        "icon": "mdi:stars",
        "iconTint": "#ffce43",
        "type": "link",
        "url": "https://t.me/abdownloadmanager"
    }
]


export async function getDonationMethods(): Promise<DonationMethod[]> {
    return DefinedDonationMethods
}
