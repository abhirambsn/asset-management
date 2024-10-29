import { Bell, Home, Search, Server, Settings } from "lucide-react";

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
        action: () => {}
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
        action: () => {}
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    }
];