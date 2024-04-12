import React, { useEffect, useState } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer';
import { Avatar, Button } from 'antd';
import { drawerStore, savedStore } from '@/app/store/state';

type Props = {

}

const SavedDrawer = () => {
    const { openSaved, setOpenSaved } = drawerStore();

    const { allVenues, savedVenues, savedMenuItems } = savedStore();
    const [section, setSection] = useState('restaurants')

    useEffect(() => {
        console.log('savedVenues', savedVenues)
        console.log('savedMenuItems', savedMenuItems)


        return () => {

        }
    }, [])

    return (
        <Drawer
            open={openSaved}
            modal={false}
            onOpenChange={setOpenSaved}
        >
            <DrawerContent className={`h-[50%] overflow-hidden`}>
                <div className='flex w-max mx-auto mt-4'>
                    <button className={`flex-col mr-5 -ml-5 text-center w-30 ${section === 'restaurants' ? 'text-black' : 'text-gray-400'}`} onClick={() => setSection('restaurants')}>
                        <p className='font-bold text-xl'>Restaurants</p>
                        <p className='text-xs'>{savedVenues.length} restaurants</p>
                    </button>
                    <button className={`flex-col text-center w-30 ${section === 'dishes' ? 'text-black' : 'text-gray-400'}`} onClick={() => setSection('dishes')}>
                        <p className='font-bold text-xl'>Dishes</p>
                        <p className='text-xs'>{savedMenuItems.length} Dishes</p>
                    </button>
                </div>
                {/* <Input placeholder="Search for a restaurant" prefix={<SearchOutlined />} /> */}

                <div>
                    {section === 'restaurants' && (
                        <div className='mt-6 mx-4 overflow-y-scroll h-60'>
                            {savedVenues?.map((item: any, i: number) => {
                                return (
                                    <div className='flex mb-4' key={i}>
                                        <Avatar
                                            style={{
                                                backgroundColor: '#12411B',
                                                color: '#F5FFBE',
                                                marginLeft: ".5em",
                                                minWidth: "60px",
                                                minHeight: "60px",
                                                maxWidth: "90px",
                                                maxHeight: "90px",
                                            }}>{item?.name.toUpperCase()[0]}
                                        </Avatar>
                                        <div className='flex-col ml-5 h-max my-auto'>
                                            <p className='font-bold text-base'>{item.name}</p>
                                            <p className='text-xs'>{item.location.address}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                    {section === 'dishes' && (
                        <div className='mt-6 mx-4 overflow-y-scroll h-60'>
                            {savedMenuItems?.map((item: any, i: number) => {
                                return (
                                    <div className='flex mb-4' key={i}>
                                        <Avatar
                                            style={{
                                                backgroundColor: '#12411B',
                                                color: '#F5FFBE',
                                                marginLeft: ".5em",
                                                minWidth: "60px",
                                                minHeight: "60px",
                                                maxWidth: "90px",
                                                maxHeight: "90px",
                                            }}>{allVenues.filter((i: any) => i.id === item.venue_id)[0]?.name.toUpperCase()[0]}
                                        </Avatar>
                                        <div className='flex-col ml-5 h-max my-auto'>
                                            <p className='font-bold text-sm'>{item.name}</p>
                                            <p className='text-xs'>{allVenues.filter((i: any) => i.id === item.venue_id)[0]?.name}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </DrawerContent>
        </Drawer >
    )
}

export default SavedDrawer