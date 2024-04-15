'use client'
import React, { useEffect, useState } from 'react'
import { Inter, Epilogue } from "next/font/google";
const font = Epilogue({ subsets: ["latin"] });
import VenueInfo from './venueInfo';
import VenueMenu from './venueMenu';
import { GetMenu } from '@/app/actions';
import { Drawer, DrawerContent } from './ui/drawer';
import { drawerStore } from '@/app/store/state';

type Props = {

}

const RestaurantViewDrawer = (props: Props) => {

    const [venue, setVenue] = useState<any>(null)
    const [menu, setMenu] = useState<any>(null)
    const [menus, setMenus] = useState<any[]>([])
    const { setOpenRecommend, setOpenSaved, setOpenVenueFunc } = drawerStore();

    const [open, setOpen] = useState(false)

    const openVenue = (venue: any) => {
        setOpenRecommend(false)
        setOpenSaved(false)
        setVenue(venue)
        setOpen(true)
        setMenus([])

        if (venue !== null && venue !== undefined) {
            for (let i = 0; i < venue?.menu_ids?.length; i++) {
                GetMenu(venue.id, venue.menu_ids[i])
                    .then((res: any) => {
                        console.log('res - menu', res)
                        setMenus(prev => [...prev, res])
                    })
            }
        }
    }

    useEffect(() => {
        setOpenVenueFunc(openVenue)
    }, [])

    return (
        <Drawer
            open={open}
            modal={false}
            onOpenChange={setOpen}
        >
            <DrawerContent className={`h-[70%]`}>
                <div className='mb-2 pt-4 px-2'>
                    <VenueInfo selectedVenue={venue} />
                </div>

                {/* <Input placeholder="Search for a restaurant" prefix={<SearchOutlined />} /> */}
                <div className='mt-2 pl-4'>
                    <VenueMenu menus={menus} />
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default RestaurantViewDrawer