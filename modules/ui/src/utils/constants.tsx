import { ChartConfig } from "@/components/ui/chart";
import { Bell, CogIcon, Home, Laptop, Package, Search, Server, ServerCog, Settings, Users } from "lucide-react";

export const TENANTS: TenantList = [
    {
        name: "main",
        subdomain: "",
        id: "0",
        users: [],
        assetTypes: [],
        osTypes: [],
        assetModels: {},
        assets: [],
        isDefault: true,
        owner: {} as User
    },
    {
        name: "Abhiram's Org",
        id: "1",
        subdomain: "abhirambsn",
        users: [
            {
                id: "uuid-1",
                email: "abhirambsn@gmail.com",
                username: "abhirambsn",
                password: "hash123",
                roles: ["ADMIN"]
            },
            {
                id: "uuid-2",
                email: "test1-view@gmail.com",
                username: "test-view",
                password: "test",
                roles: ["READ"]
            },
            {
                id: "uuid-3",
                email: "test1-rw@gmail.com",
                username: "test-rw",
                password: "test",
                roles: ["READ", "WRITE"]
            }
        ],
        assetTypes: [
            {name: "Mobile", id: "mobile"},
            {name: "Laptop", id: "laptop"},
            {name: "Desktop", id: "desktop"},
            {name: "Server", id: "server"},
            {name: "Network Device", id: "network-device"},
        ],
        osTypes: [
            {name: "Windows", id: "windows"},
            {name: "Linux", id: "linux"},
            {name: "MacOS", id: "macos"},
            {name: "iOS", id: "ios"},
            {name: "Android", id: "android"},
        ],
        assetModels: {
            laptop: [
                {
                    name: "Macbook Pro 2021",
                    id: "mbp-2021",
                    company: "Apple",
                    releaseDate: new Date("2020-10-05"),
                    specs: {}
                }
            ],
            mobile: [
                {
                    name: "iPhone 12",
                    id: "iph-12",
                    company: "Apple",
                    releaseDate: new Date("2020-10-05"),
                    specs: {}
                }
            ],
        },
        assets: [
            {
                id: "1",
                name: "Abhiram's Laptop",
                type: "laptop",
                os: "windows",
                osVersion: "10",
                registrationDate: new Date(),
                lastUpdated: new Date(),
                model: "mbp-2021",
                owner: "abhirambsn",
                class: "CRITICAL",
                value: 143000,
            },
            {
                id: "2",
                name: "Abhiram's iPhone",
                type: "mobile",
                os: "ios",
                osVersion: "18",
                registrationDate: new Date(),
                lastUpdated: new Date(),
                model: "iph-12",
                owner: "abhirambsn",
                class: "IMPORTANT",
                value: 65800
            }
        ],
        isDefault: false,
        owner: {
            id: "uuid-1",
            email: "abhirambsn@gmail.com",
            password: "hash123",
            roles: ["ADMIN"],
            username: "abhirambsn"
        }
    },
    {
        name: "Alpha Corezo Org",
        subdomain: "alpha-corezo",
        id: "2",
        users: [
            {
                id: "uuid-1",
                email: "abhirambsn@gmail.com",
                username: "abhirambsn",
                password: "hash123",
                roles: ["READ"]
            },
            {
                id: "uuid-2",
                email: "james.corezo@gmail.com",
                username: "james.corezo",
                password: "jamescorezo123",
                roles: ["ADMIN"]
            },
            {
                id: "uuid-3",
                email: "test1-rw@gmail.com",
                username: "test-rw",
                password: "test",
                roles: ["READ", "WRITE"]
            }
        ],
        assetTypes: [
            {name: "Mobile", id: "mobile"},
            {name: "Laptop", id: "laptop"},
            {name: "Desktop", id: "desktop"},
            {name: "Server", id: "server"},
            {name: "Network Device", id: "network-device"},
        ],
        osTypes: [
            {name: "Windows", id: "windows"},
            {name: "Linux", id: "linux"},
            {name: "MacOS", id: "macos"},
        ],
        assetModels: {
            laptop: [
                {
                    name: "Macbook Pro 2021",
                    id: "mbp-2021",
                    company: "",
                    releaseDate: new Date("2020-10-05"),
                    specs: {}
                }
            ],
            mobile: [],
        },
        assets: [
            {
                id: "1",
                name: "Johns's Laptop",
                assetType: "laptop",
                osType: "windows",
                osVersion: "10",
                registrationDate: new Date(),
                lastUpdated: new Date(),
                model: "mbp-2021",
                owner: "abhirambsn",
                class: "CRITICAL"
            }
        ],
        isDefault: false,
        owner: {
            id: "uuid-2",
            email: "james.corezo@gmail.com",
            password: "jamescorezo123",
            roles: ["ADMIN"],
            username: "james.corezo"
        }
    },
    {
        name: "Abhiram's Org 2",
        subdomain: "abhirambsn",
        id: "3",
        users: [
            {
                id: "uuid-1",
                email: "abhirambsn@gmail.com",
                username: "abhirambsn",
                password: "hash123",
                roles: ["ADMIN"]
            },
            {
                id: "uuid-2",
                email: "test1-view@gmail.com",
                username: "test-view",
                password: "test",
                roles: ["READ"]
            },
            {
                id: "uuid-3",
                email: "test1-rw@gmail.com",
                username: "test-rw",
                password: "test",
                roles: ["READ", "WRITE"]
            }
        ],
        assetTypes: [
            {name: "Mobile", id: "mobile"},
            {name: "Laptop", id: "laptop"},
            {name: "Desktop", id: "desktop"},
            {name: "Server", id: "server"},
            {name: "Network Device", id: "network-device"},
        ],
        osTypes: [
            {name: "Windows", id: "windows"},
            {name: "Linux", id: "linux"},
            {name: "MacOS", id: "macos"},
        ],
        assetModels: {
            laptop: [
                {
                    name: "Macbook Pro 2021",
                    id: "mbp-2021",
                    company: "",
                    releaseDate: new Date("2020-10-05"),
                    specs: {}
                }
            ],
            mobile: [],
        },
        assets: [
            {
                id: "1",
                name: "Abhiram's Laptop",
                assetType: "laptop",
                osType: "windows",
                osVersion: "10",
                registrationDate: new Date(),
                lastUpdated: new Date(),
                model: "mbp-2021",
                owner: "abhirambsn",
                class: "CRITICAL"
            }
        ],
        isDefault: false,
        owner: {
            id: "uuid-1",
            email: "abhirambsn@gmail.com",
            password: "hash123",
            roles: ["ADMIN"],
            username: "abhirambsn"
        }
    },
];

export const ADMIN_SIDEBAR_MENU = [
    {
        title: "Manage Users",
        url: "/users",
        icon: Users
    },
    {
        title: "Manage Hardware Types",
        url: "/types/hardware",
        icon: ServerCog
    },
    {
        title: "Manage Asset Models",
        url: "/types/models",
        icon: Laptop
    },
    {
        title: "Manage OS Types",
        url: "/types/os",
        icon: Package
    },
    {
        title: "Manage OS Versions",
        url: "/types/os-versions",
        icon: CogIcon
    }
]

export const SIDEBAR_MENU = [
    {
        title: "Dashboard",
        url: "",
        icon: Home
    },
    {
        title: "Add Asset to Management",
        url: "#",
        icon: Server,
        action: "modal",
        type: "asset"
    },
    {
        title: "Notifications",
        url: "/notifications",
        icon: Bell
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
        action: "search"
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    }
];

export const PERSONAL_WORKSPACE = {id: 'personal', name: "Personal Workspace", path: "/workspace/personal"};

export const DONUT_CHART_DATA_SERVICE_OUTPUT_ASSET_CLASS = [
    {classification: "CRITICAL", count: 20, fill: "#C82D4C"},
    {classification: "IMPORTANT", count: 1, fill: "#FFD046"},
    {classification: "NORMAL", count: 12, fill: "#09D793"},
    {classification: "NOT_IMPORTANT", count: 30, fill: "#2D3142"}
]

export const DONUT_CHART_ASSET_CLASS_CONFIG = {
    CRITICAL: {
        label: "Critical",
        color: "#C82D4C",
    },
    IMPORTANT: {
        label: "Important",
        color: "#FFD046"
    },
    NORMAL: {
        label: "Normal",
        color: "#09D793"
    },
    NOT_IMPORTANT: {
        label: "Not Important",
        color: "#2D3142"
    }
} satisfies ChartConfig

export const DONUT_CHART_DATA_SERVICE_OUTPUT_ASSET_OWNER = [
    {owner: "Abhiram", count: 20, fill: "hsl(var(--chart-1))"},
    {owner: "John", count: 1, fill: "hsl(var(--chart-2))"},
    {owner: "James", count: 12, fill: "hsl(var(--chart-3))"},
]

export const DONUT_CHART_ASSET_OWNER_CONFIG = {
    Abhiram: {
        label: "Abhiram",
        color: "hsl(var(--chart-1))"
    },
    John: {
        label: "John",
        color: "hsl(var(--chart-2))"
    },
    James: {
        label: "James",
        color: "hsl(var(--chart-3))"
    }
}

export const DATA_SERVICE_STATS = [
    {col: "Total Assets", value: "20"},
    {col: "Total Users", value: "2"},
    {col: "Total Asset Types", value: "3"},
    {col: "Total OS Types", value: "3"},
    {col: "Total Asset Models", value: "2"},
]

export const OWNER_DATA = [
    {id: "abhirambsn", name: "Abhiram"},
    {id: "john", name: "John"},
    {id: "james.corezo", name: "James"}
]