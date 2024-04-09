import { create } from 'zustand';
import { createJSONStorage, persist, PersistOptions } from 'zustand/middleware';

// Persistent store with local storage
export const navStore = create(
    persist((set: any) => ({
        current: 'For You',
        update: (tab: string) => set((state: any) => ({
            current: tab
        })),
    }), {
        name: 'nav-storage',
        skipHydration: true
    } as PersistOptions<any>)
);

export const userStore = create(
    persist((set: any) => ({
        user: null,
        setUser: (user: any) => set((state: any) => ({
            user: user
        })),
    }), {
        name: 'user-storage',
        skipHydration: true
    } as PersistOptions<any>)
);

// export default userStore;