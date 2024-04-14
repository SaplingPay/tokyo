'use client'
import React, { use, useEffect, useState } from 'react'
import { DrawerStyles } from 'antd/es/drawer/DrawerPanel';
import { Inter, Epilogue } from "next/font/google";
const font = Epilogue({ subsets: ["latin"] });
import VenueInfo from './venueInfo';
import VenueMenu from './venueMenu';
import { GetMenu } from '@/app/actions';
import { Drawer, DrawerContent } from './ui/drawer';
import { drawerStore } from '@/app/store/state';

type Props = {
    setOpen: (open: boolean) => void
    open: boolean
    selectedVenue: any
}

const drawerStyles: DrawerStyles = {
    header: {
        display: "none",
    },
    body: {
        padding: 0,

    },
    footer: {
        display: "none",
    },
    content: {
        borderRadius: "3rem 3rem 0 0",
        padding: "0",
        boxShadow: "none",
    },
    wrapper: {
        boxShadow: "none"
    }

};

const RestaurantViewDrawer = (props: Props) => {

    const [menu, setMenu] = useState<any>(null)
    const { selectedVenue, setSelectedVenue, setOpenRecommend, setOpenSaved, setOpenVenueFunc, openVenue: openVenueDrawer } = drawerStore();

    const openVenue = (venue: any) => {
        setOpenRecommend(false)
        setOpenSaved(false)
        setSelectedVenue(venue)
        props.setOpen(true)

        if (selectedVenue !== null && selectedVenue !== undefined) {
            const { id, menu_id } = selectedVenue;
            GetMenu(id, menu_id)
                .then((res: any) => {
                    console.log('res', res)
                    setMenu(res)
                })
        }
    }

    useEffect(() => {
        if (!props.selectedVenue) return
        GetMenu(props.selectedVenue?.id, props.selectedVenue?.menu_id)
            .then((res: any) => {
                console.log('res', res)
                setMenu(res)
            })
        setOpenVenueFunc(openVenue)
    }, [props.selectedVenue])

    useEffect(() => {
        setOpenVenueFunc(openVenue)
    }, [])

    useEffect(() => {
        props.setOpen(openVenueDrawer)
    }, [openVenueDrawer])

    return (
        <Drawer
            open={props.open}
            modal={false}
            onOpenChange={props.setOpen}
        >
            <DrawerContent className='mt-6 max-h-[70%]'>
                <div className='mb-2 pt-4 px-2'>
                    <VenueInfo selectedVenue={props.selectedVenue} />
                </div>

                {/* <Input placeholder="Search for a restaurant" prefix={<SearchOutlined />} /> */}
                <div className='mt-2 pl-4'>
                    <VenueMenu menu={menu} />
                </div>


            </DrawerContent>
        </Drawer>
    )
}

export default RestaurantViewDrawer