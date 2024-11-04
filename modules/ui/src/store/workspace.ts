import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWorkspace = create(
  persist<WorkspaceState>(
    (set) => ({
      currentWorkspace: null,
      workspaces: [],
      setCurrentWorkspace: (workspace) => set({ currentWorkspace: workspace }),
      setWorkspaces: (workspaces) => set({ workspaces }),
      clearState: () => set({ currentWorkspace: null, workspaces: [] }),
    }),
    {
      name: "workspace",
    }
  )
);
