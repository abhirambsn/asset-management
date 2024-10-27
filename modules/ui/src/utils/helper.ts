import { TENANTS } from "./constants";

const DEFAULT_APP = TENANTS.find(app => app.isDefault) || TENANTS[0];

export const getTenant = (): Tenant => {
    const subdomain = getSubdomain(window.location.hostname);
    if (!subdomain) {
        return DEFAULT_APP;
    }

    const app = TENANTS.find(app => app.subdomain === subdomain);
    if (!app) {
        console.log('tenant not found');
        return DEFAULT_APP;
    }

    console.log('app', app);
    return app;
}

export const getSubdomain = (location: string) => {
    const locationParts = location.split('.');
    let sliceTill = -2;

    const isLocalhost = locationParts.slice(-1)[0] === 'localhost';

    if (isLocalhost) sliceTill = -1;
    const subdomain = locationParts.slice(0, sliceTill).join('');
    console.log('subdomain', subdomain);
    
    return subdomain;
}

export const getAvatarUrl = (name: string) => {
    return `https://api.dicebear.com/9.x/initials/svg?seed=${name}`;
}