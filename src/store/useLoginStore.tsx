import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserRole } from "../types/userrole";
import { v7 as uuidv7 } from "uuid";

interface LoginState {
  isLoggedIn: boolean;
  role: string | null;
  username: string | null;
  token: string;
  expiresAt: number | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkExpiration: () => boolean;
}

export const useLoginStore = create<LoginState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      role: null,
      username: null,
      token: "",
      expiresAt: null,
      login: async (username: string, password: string) => {
        const isValidPassword =
          (username === "admin" && password === "admin") ||
          (username === "user" && password === "user");

        if (!isValidPassword) {
          return false; // Invalid credentials
        }

        try {
          // Fetch user roles from the JSON file in the public folder
          const response = await fetch("/data/userrole.json");
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const userRoles: UserRole[] = await response.json();

          const user = userRoles.find((u) => u.username === username);
          const role = user ? user.role : "user"; // Assign role or null if user not found

          // Set expiration time to 30 minutes from now
          const expiresAt = Date.now() + 30 * 60 * 1000;
          
          set({ token: uuidv7(), isLoggedIn: true, username, role, expiresAt });
          return true;
        } catch (error) {
          console.error("Failed to fetch or process user roles:", error);
          return false;
        }
      },
      logout: () => {
        set({ token: "", isLoggedIn: false, role: null, username: null, expiresAt: null });
        window.sessionStorage.removeItem("login-storage");
      },
      checkExpiration: () => {
        const state = get();
        if (state.expiresAt && Date.now() > state.expiresAt) {
          // Session expired, log out
          get().logout();
          return false;
        }
        return state.isLoggedIn;
      }
    }),
    {
      name: "login-storage",
      storage: {
        getItem: (name) => {
          const str = sessionStorage.getItem(name);
          if (!str) return null;
          return JSON.parse(str);
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
    }
  )
);
