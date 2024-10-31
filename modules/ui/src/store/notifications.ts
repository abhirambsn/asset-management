import { create } from "zustand";

export const useNotificationStore = create<NotificationState>((set) => ({
    notifications: [],
    addNotification: (notification) => set((state) => ({ notifications: [...state.notifications, notification] })),
    removeNotification: (notification) => set((state) => ({ notifications: state.notifications.filter((n) => n.id !== notification) })),
    clearNotifications: () => set({ notifications: [] }),
}))