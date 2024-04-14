import { create } from 'zustand';
import { createJSONStorage, persist, PersistOptions } from 'zustand/middleware';

// Persistent store with local storage
export const navStore = create((set: any) => ({
    current: 'For You',
    update: (tab: string) => set((state: any) => ({
        current: tab
    })),
}));

export const drawerStore = create((set: any) => ({
    openRecommend: true,
    setOpenRecommend: (open: boolean) => set((state: any) => ({
        openRecommend: open
    })),
    openSaved: false,
    setOpenSaved: (open: boolean) => set((state: any) => ({
        openSaved: open
    })),
    selectedVenue: null,
    setSelectedVenue: (venue: any) => set((state: any) => ({
        selectedVenue: venue
    })),
    openVenueFunc: (venue: any) => { },
    setOpenVenueFunc: (func: any) => {
        set(() => ({
            openVenueFunc: func,
        }))
    }
}));

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

export const savedStore = create(
    persist((set: any) => ({
        allVenues: [],
        savedVenues: [],
        savedMenuItems: [],
        saveVenue: (venue: any) => set((state: any) => ({
            savedVenues: [...state.savedVenues, venue]
        })),
        saveMenuItem: (item: any) => set((state: any) => ({
            savedMenuItems: [...state.savedMenuItems, item]
        })),
        removeVenue: (venue: any) => set((state: any) => ({
            savedVenues: state.savedVenues.filter((v: any) => v.id !== venue.id)
        })),
        removeMenuItem: (item: any) => set((state: any) => ({
            savedMenuItems: state.savedMenuItems.filter((i: any) => i.id !== item.id)
        })),
        storeVenues: (venues: any) => set((state: any) => ({
            allVenues: venues
        })),
    }), {
        name: 'saved-storage',
        skipHydration: true
    } as PersistOptions<any>)
);

// export default userStore;