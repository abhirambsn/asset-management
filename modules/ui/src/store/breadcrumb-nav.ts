import { create } from "zustand";

export const useBreadcrumbNav = create<BreadcrumbNav>((set) => ({
    breadcrumbNavStack: [],
    addToNavStack: (item) => set((state) => ({ breadcrumbNavStack: [...state.breadcrumbNavStack, item] })),
    removeFromNavStack: () => set((state) => ({ breadcrumbNavStack: state.breadcrumbNavStack.slice(0, -1) })),
    clearNavStack: () => set({ breadcrumbNavStack: [] }),
}))