import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUser = create(
  persist<UserState>(
    (set) => ({
      user: {} as User,
      setUser: (user: User) => set({ user }),
      invalidateUser: () => set({ user: {} as User }),
    }),
    {
      name: "user",
    }
  )
);
