type Workspace = {
    id: string;
    name: string;
    avatar?: string;
    assets: AssetList;
    assetTypes: AssetTypes;
    osTypes: OperatingSystem[];
    assetModels: AssetModels;
    owner: string;
    tenantId: string;
}

type WorkspaceList = Workspace[];

type WorkspaceState = {
    currentWorkspace: Workspace | null;
    workspaces: WorkspaceList;
    setCurrentWorkspace: (workspace: Workspace) => void;
    setWorkspaces: (workspaces: WorkspaceList) => void;
    clearState: () => void;
}

type Role = "ADMIN" | "READ" | "WRITE";

type RoleList = Role[];

type User = {
    id: string;
    username: string;
    email: string;
    roles: RoleList;
    password: string;
    firstName?: string;
    lastName?: string;
};

type OperatingSystem = {
    id: string;
    name: string;
}

type AssetType = {
    id: string;
    name: string;
}

type AssetModel = {
    id: string;
    name: string;
    company: string;
    releaseDate: Date;
    specs: Record<string, never>;
}

type AssetTypes = AssetType[];

enum AssetClassification {
    CRITICAL = "CRITICAL",
    IMPORTANT = "IMPORTANT",
    NORMAL = "NORMAL",
    NOT_IMPORTANT = "NOT_IMPORTANT"
}

type Asset = {
    id: string;
    name: string;
    type: string;
    model: string;
    os: string;
    osVersion: string;
    owner: string;
    status: string;
    class: AssetClassification
}

type Tenant = {
    id: string;
    name: string;
    subdomain: string;
    users: User[];
    workspaces: WorkspaceList;
    owner: User;
}

type TenantMetadata = {
    id: string;
    name: string;
}

type TenantList = Tenant[];

type BreadcrumbNavStack = {
    name: string;
    path?: string;
}

type BreadcrumbNav = {
    breadcrumbNavStack: BreadcrumbNavStack[];
    addToNavStack: (item: BreadcrumbNavStack) => void;
    removeFromNavStack: () => void;
}

type TableData = {
    col: string;
    value: string;
}

type ModalState = {
    isOpen: boolean;
    type: ModalType;
    openModal: (type: ModalType) => void;
    closeModal: () => void;
}

type ModalType = "asset" | "assetType" | "os" | "user" | "workspace" | "model" | "";

type AppNotification = {
    id: string;
    message: string;
    type: "success" | "error" | "info";
    read: boolean;
    timestamp: number;
}

type NotificationState = {
    notifications: AppNotification[];
    addNotification: (notification: AppNotification) => void;
    removeNotification: (id: string) => void;
    clearNotifications: () => void;
}

type AuthState = {
    isAuthenticated: boolean;
    token: string;
    expiresAt: number;
    authenticate: (token: string, expiresAt: number) => void;
    logout: () => void;
}

type AuthResponse = {
    access_token: string;
}

type LoginPayload = {
    username: string;
    password: string;
    tenantId: string;
}