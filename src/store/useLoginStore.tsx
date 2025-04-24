import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LoginState {
    isLoggedIn: boolean;
    isAdmin: boolean;
    username: string | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

export const useLoginStore = create<LoginState>()(
    persist(
        (set) => ({
            isLoggedIn: false,
            isAdmin: false,
            username: null,
            login: async (username: string, password: string) => {
                if (username === 'admin' && password === 'admin') {
                    set({ isLoggedIn: true, isAdmin: true, username });

                    return true;
                } else if (username === 'user' && password === 'user') {
                    set({ isLoggedIn: true, isAdmin: false, username });

                    return true;
                }
                return false;
            },
            logout: () => {
                set({ isLoggedIn: false, isAdmin: false, username: null });
                window.localStorage.removeItem('login-storage');

            }

        }),
        {
            name: 'login-storage'
        }
    )
);