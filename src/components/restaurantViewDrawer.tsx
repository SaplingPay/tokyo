'use client'
import React, { useEffect, useState } from 'react'
import { Avatar, Button, FloatButton, Input, Tabs } from 'antd';
import { DrawerStyles } from 'antd/es/drawer/DrawerPanel';
import Title from 'antd/es/typography/Title';
import { ChevronDown, CrosshairIcon, HeartIcon, SearchIcon, XIcon } from 'lucide-react';
import { Inter, Epilogue } from "next/font/google";
const font = Epilogue({ subsets: ["latin"] });
import { SearchOutlined } from '@ant-design/icons';
import VenueInfo from './venueInfo';
import VenueMenu from './venueMenu';
import { GetMenu } from '@/app/actions';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer';

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
        // textAlign: "center"
    },
    wrapper: {
        boxShadow: "none"
    }

};

const RestaurantViewDrawer = (props: Props) => {

    const [menu, setMenu] = useState<any>(null)

    const openFilters = () => {
        props.setOpen(false)
    }

    useEffect(() => {
        console.log('WORKING selectedVenue', props.selectedVenue)
        if (!props.selectedVenue) return
        GetMenu(props.selectedVenue?.id, props.selectedVenue?.menu_id)
            .then((res: any) => {
                console.log('res', res)
                setMenu(res)
            })
    }, [props.selectedVenue])


    return (
        // <Drawer
        //     open={props.open}
        //     placement='bottom'
        //     mask={false}
        //     title={null}
        //     maskClosable={false}
        //     styles={drawerStyles}
        //     height="40vh"
        //     className={font.className}
        // >

        //     <div className='flex'>
        //         <button className='ml-auto mr-7 mt-4 bg-slate-100 rounded-full p-1 text-black' onClick={() => props.setOpen(false)}>
        //             <XIcon className='h-5 w-5' />
        //         </button>
        //     </div>

        //     <div className='-mt-6 mb-2 pt-2 px-2'>
        //         <VenueInfo selectedVenue={props.selectedVenue} />
        //     </div>

        //     {/* <div className='flex'>
        //         <button className='ml-auto pr-2 -my-10 h-max' onClick={openFilters}>
        //             <span className='mx-max text-x py-2 px-4 rounded-full border-solid border-black border-2'>Dietary Filters</span>
        //         </button>
        //     </div> */}

        //     {/* <Input placeholder="Search for a restaurant" prefix={<SearchOutlined />} /> */}
        //     <div className='mt-2 px-4'>
        //         <VenueMenu menu={menu} />
        //     </div>
        // </Drawer>
        <Drawer
            open={props.open}
            modal={false}
            onOpenChange={props.setOpen}
        >
            <DrawerContent className='h-[70%]'>
                {/* <div className='flex'>
                    <button className='ml-auto mr-7 mt-4 bg-slate-100 rounded-full p-1 text-black' onClick={() => props.setOpen(false)}>
                        <XIcon className='h-5 w-5' />
                    </button>
                </div> */}
                <div className='pt-4'>
                    <div className='-mt-6 mb-2 pt-2 px-2'>
                        <VenueInfo selectedVenue={props.selectedVenue} />
                    </div>

                    {/* <div className='flex'>
       <button className='ml-auto pr-2 -my-10 h-max' onClick={openFilters}>
           <span className='mx-max text-x py-2 px-4 rounded-full border-solid border-black border-2'>Dietary Filters</span>
       </button>
   </div> */}

                    {/* <Input placeholder="Search for a restaurant" prefix={<SearchOutlined />} /> */}
                    <div className='mt-2 px-4'>
                        <VenueMenu menu={menu} />
                    </div>

                </div>


            </DrawerContent>
        </Drawer>
    )
}

export default RestaurantViewDrawer