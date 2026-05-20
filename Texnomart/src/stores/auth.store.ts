import { create } from "zustand";
import type { Role } from "@/lib/constants/enums";

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: Role;
  initials: string;
}

interface AuthState {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  signOut: () => void;
}

const MOCK_USER: AuthUser = {
  id: "usr_001",
  fullName: "Алишер Каримов",
  email: "alisher.karimov@texnomart.uz",
  role: "superadmin",
  initials: "АК",
};

export const useAuthStore = create<AuthState>((set) => ({
  user: MOCK_USER,
  setUser: (user) => set({ user }),
  signOut: () => set({ user: null }),
}));
