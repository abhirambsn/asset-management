import { ChartConfig } from "@/components/ui/chart";
import { LockClosedIcon } from "@radix-ui/react-icons";
import {
  Bell,
  CreditCard,
  Home,
  Laptop,
  Package,
  ServerCog,
  Settings,
  SwatchBook,
  User,
  Users,
} from "lucide-react";

export const TENANTS: TenantList = [
  {
    name: "main",
    id: "main",
    users: [],
    workspaces: [],
    owner: ""
  },
];

export const ADMIN_SIDEBAR_MENU = [
  {
    title: "Manage Users",
    url: "/users",
    icon: Users,
  },
  {
    title: "Manage Hardware Types",
    url: "/types/hardware",
    icon: ServerCog,
  },
  {
    title: "Manage Asset Models",
    url: "/types/models",
    icon: Laptop,
  },
  {
    title: "Manage OS Types",
    url: "/types/os",
    icon: Package,
  },
];

export const SIDEBAR_MENU = [
  {
    title: "Dashboard",
    url: "",
    icon: Home,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export const PERSONAL_WORKSPACE = {
  id: "personal",
  name: "Personal Workspace",
  path: "/workspace/personal",
};

export const DONUT_CHART_DATA_SERVICE_OUTPUT_ASSET_CLASS = [
  { classification: "CRITICAL", count: 20, fill: "#C82D4C" },
  { classification: "IMPORTANT", count: 1, fill: "#FFD046" },
  { classification: "NORMAL", count: 12, fill: "#09D793" },
  { classification: "NOT_IMPORTANT", count: 30, fill: "#2D3142" },
];

export const DONUT_CHART_ASSET_CLASS_CONFIG = {
  CRITICAL: {
    label: "Critical",
    color: "#C82D4C",
  },
  IMPORTANT: {
    label: "Important",
    color: "#FFD046",
  },
  NORMAL: {
    label: "Normal",
    color: "#09D793",
  },
  NOT_IMPORTANT: {
    label: "Not Important",
    color: "#2D3142",
  },
} satisfies ChartConfig;

export const DONUT_CHART_DATA_SERVICE_OUTPUT_ASSET_OWNER = [
  { owner: "Abhiram", count: 20, fill: "hsl(var(--chart-1))" },
  { owner: "John", count: 1, fill: "hsl(var(--chart-2))" },
  { owner: "James", count: 12, fill: "hsl(var(--chart-3))" },
];

export const DONUT_CHART_ASSET_OWNER_CONFIG = {
  Abhiram: {
    label: "Abhiram",
    color: "hsl(var(--chart-1))",
  },
  John: {
    label: "John",
    color: "hsl(var(--chart-2))",
  },
  James: {
    label: "James",
    color: "hsl(var(--chart-3))",
  },
};

export const DATA_SERVICE_STATS = [
  { col: "Total Assets", value: "20" },
  { col: "Total Users", value: "2" },
  { col: "Total Asset Types", value: "3" },
  { col: "Total OS Types", value: "3" },
  { col: "Total Asset Models", value: "2" },
];

export const OWNER_DATA = [
  { id: "abhirambsn", name: "Abhiram" },
  { id: "john", name: "John" },
  { id: "james.corezo", name: "James" },
];

export const DONUT_CHART_USERS_CONFIG = {
  ADMIN: {
    label: "Admin",
    color: "hsl(var(--chart-1))",
  },
  READ: {
    label: "Read",
    color: "hsl(var(--chart-2))",
  },
  WRITE: {
    label: "Write",
    color: "hsl(var(--chart-3))",
  },
};
export const DONUT_CHART_DATA_SERVICE_OUTPUT_USERS = [
  { role: "ADMIN", count: 20, fill: "hsl(var(--chart-1))" },
  { role: "READ", count: 1, fill: "hsl(var(--chart-2))" },
  { role: "WRITE", count: 12, fill: "hsl(var(--chart-3))" },
];

export const LINE_CHART_USER_TREND = [
  { month: "Jan", count: 20 },
  { month: "Feb", count: 10 },
  { month: "Mar", count: 15 },
  { month: "Apr", count: 30 },
  { month: "May", count: 25 },
  { month: "Jun", count: 10 },
  { month: "Jul", count: 5 },
  { month: "Aug", count: 15 },
  { month: "Sep", count: 20 },
  { month: "Oct", count: 25 },
];

export const LINE_CHART_CONFIG = {
  count: {
    label: "Users",
    color: "hsl(var(--chart-1))",
  },
};

export const NOTIFICATIONS: AppNotification[] = [
  {
    id: "notif-1",
    message: "A new asset has been added to the system",
    timestamp: new Date("2024-10-30T12:30:00").getTime(),
    type: "success",
    read: false,
  },
  {
    id: "notif-2",
    message: "A new os type has been added to the system",
    timestamp: new Date("2024-10-31T12:30:00").getTime(),
    type: "success",
    read: false,
  },
  {
    id: "notif-3",
    message: "Failed to delete asset",
    timestamp: new Date().getTime(),
    type: "error",
    read: false,
  },
  {
    id: "notif-4",
    message: "User Created in Tenant",
    timestamp: new Date("2023-10-24T18:30:45").getTime(),
    type: "info",
    read: false,
  },
];

export const ROLES = ["ADMIN", "READ", "WRITE"] as const;

export const SETTINGS_TABSBAR = [
  { id: "general", name: "General", icon: User },
  { id: "security", name: "Security", icon: LockClosedIcon },
  { id: "billing", name: "Billing", icon: CreditCard },
  { id: "notifications", name: "Notifications", icon: Bell },
  { id: "appearance", name: "Appearance", icon: SwatchBook },
] as const;

export const LANDING_NAVBAR = [
  {
    name: "Home",
    url: '/landing',
  },
  {
    name: "Features",
    url: '/landing/features',
  },
  {
    name: "Pricing",
    url: '/landing/pricing',
  },
  {
    name: "Contact",
    url: '/landing/contact',
  }
]