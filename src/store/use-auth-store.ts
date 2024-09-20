import { User } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserStore {
  isAuthenticated: boolean;
  currentUser: User | null;
  updateUser: (user: User) => void;
  logout: () => void;
}

export const useUser = create<UserStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      currentUser: null,
      updateUser: (updatedUser) => {
        set({ currentUser: updatedUser, isAuthenticated: true });
      },
      logout: () => {
        set({ currentUser: null, isAuthenticated: false });
      },
    }),
    {
      name: "job-tracker-user-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
