import { create } from 'zustand';
import { createJSONStorage, persist, PersistOptions } from 'zustand/middleware';

// Persistent store with local storage
export const navStore = create((set: any) => ({
    current: 'For You',
    update: (tab: string) => set((state: any) => ({
        current: tab
    })),
}));

export enum Drawer {
    ForYou = 'For You',
    Saved = 'Saved',
    Venue = 'Venue',
}

export const drawerStore = create((set: any) => ({
    // opened : Drawer.ForYou,
    // openForYou: () => set({ opened: Drawer.ForYou }),
    // openSaved: () => set({ opened: Drawer.Saved }),
    // openVenue: () => set({ opened: Drawer.Venue }),
    openRecommend: true,
    setOpenRecommend: (open: boolean) => set((state: any) => ({
        openRecommend: open
    })),
    openSaved: false,
    setOpenSaved: (open: boolean) => set((state: any) => ({
        openSaved: open
    })),
    openVenue: false,
    setOpenVenue: (open: boolean) => set((state: any) => ({
        openVenue: open
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

export const userStore = create((set: any) => ({
    user: {} as any,
    setUser: (user: any) => set((state: any) => ({
        user: user
    })),
}));

export const savedStore = create(
    persist((set: any) => ({
        allVenues: [],
        savedVenues: [],
        savedMenuItems: [],
        storedSaves: [],
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
        storeSaves: (saves: any) => set((state: any) => ({
            storedSaves: saves
        })),
    }), {
        name: 'saved-storage',
        skipHydration: true
    } as PersistOptions<any>)
);

// export default userStore;

export const orderStore = create((set: any) => ({
    order: [] as {
        id: string,
        name: string,
        price: number,
        qty: number
    }[],
    total: 0,
    setOrder: (order: any) => set(() => ({
        order: order
    })),
    addToOrder: (order: any) => set((state: any) => ({
        order: [...state.order, order]
    })),
    removeFromOrder: (order: any) => set((state: any) => ({
        order: state.order.filter((o: any) => o.id !== order.id)
    })),
    incrementTotal: (price: number) => set((state: any) => ({
        total: state.total + price
    })),
    decrementTotal: (price: number) => set((state: any) => ({
        total: state.total - price
    })),
    increaseQty: (id: string) => set((state: any) => ({
        order: state.order.map((o: any) => {
            if (o.id === id) {
                return {
                    ...o,
                    qty: o.qty + 1
                }
            }
            return o
        })
    })),
    decreaseQty: (id: string) => set((state: any) => ({
        order: state.order.map((o: any) => {
            if (o.id === id) {
                const newQty = o.qty - 1;
                if (newQty === 0) {
                    return null;
                }
                return {
                    ...o,
                    qty: newQty
                }
            }
            return o
        }).filter((o: any) => o !== null)
    })),
}));