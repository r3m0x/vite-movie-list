import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserRole } from '../types/userrole';

interface LoginState {
    isLoggedIn: boolean;
    role: string | null;
    username: string | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

export const useLoginStore = create<LoginState>()(
    persist(
        (set) => ({
            isLoggedIn: false,
            role: null,
            username: null,
            login: async (username: string, password: string) => {
                const isValidPassword = (username === 'admin' && password === 'admin') || (username === 'user' && password === 'user');

                if (!isValidPassword) {
                    return false; // Invalid credentials
                }

                try {
                    // Fetch user roles from the JSON file in the public folder
                    const response = await fetch('/data/userrole.json');
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const userRoles: UserRole[] = await response.json();

                    const user = userRoles.find(u => u.username === username);
                    const role = user ? user.role : 'user'; // Assign role or null if user not found

                    set({ isLoggedIn: true, username, role });
                    return true;
                } catch (error) {
                    console.error("Failed to fetch or process user roles:", error);
                    return false;
                }
            },
            logout: () => {
                set({ isLoggedIn: false, role: null, username: null });
                window.localStorage.removeItem('login-storage');

            }

        }),
        {
            name: 'login-storage'
        }
    )
);