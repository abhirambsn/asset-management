type Workspace = {
    id: string;
    name: string;
    avatar?: string;
}

type WorkspaceList = Workspace[];

type CurrentWorkspaceState = {
    currentWorkspace: Workspace | null;
    setCurrentWorkspace: (workspace: Workspace) => void;
}

type Role = "ADMIN" | "READ" | "WRITE";

type RoleList = Role[];

type User = {
    id: string;
    username: string;
    email: string;
    roles: RoleList;
    password: string;
};

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
    assets: AssetList;
    assetTypes: AssetTypes;
    osTypes: OsTypes;
    assetModels: AssetModels;
    isDefault: boolean;
    owner: User;
}

type TenantList = Tenant[];