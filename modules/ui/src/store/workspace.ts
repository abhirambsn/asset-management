import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCurrentWorkspace = create(
  persist<CurrentWorkspaceState>(
    (set) => ({
      currentWorkspace: null,
      setCurrentWorkspace: (workspace) => set({ currentWorkspace: workspace }),
    }),
    {
      name: "workspace",
    }
  )
);
