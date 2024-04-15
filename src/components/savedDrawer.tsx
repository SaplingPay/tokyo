import React, { useState } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from './ui/drawer';
import { Avatar } from 'antd';
import { drawerStore, savedStore } from '@/app/store/state';

type Props = {

}

const SavedDrawer = () => {
    const { openSaved, setOpenSaved, openVenueFunc } = drawerStore();

    const { allVenues, savedVenues, savedMenuItems } = savedStore();
    const [section, setSection] = useState('restaurants')

    return (
        <Drawer
            open={openSaved}
            modal={false}
            onOpenChange={setOpenSaved}
        >
            <DrawerContent className={`h-[70%]`}>
                <DrawerHeader style={{ paddingTop: "1em", paddingBottom: "0" }}>
                    <DrawerTitle>
                        <div className='flex w-max mx-auto'>
                            <button className={`flex-col mr-5 -ml-5 text-center w-30 ${section === 'restaurants' ? 'text-black' : 'text-gray-400'}`} onClick={() => setSection('restaurants')}>
                                <p className='font-bold text-xl'>Restaurants</p>
                                <p className='text-xs'>{savedVenues.length} restaurants</p>
                            </button>
                            <button className={`flex-col text-center w-30 ${section === 'dishes' ? 'text-black' : 'text-gray-400'}`} onClick={() => setSection('dishes')}>
                                <p className='font-bold text-xl'>Dishes</p>
                                <p className='text-xs'>{savedMenuItems.length} Dishes</p>
                            </button>
                        </div>
                    </DrawerTitle>
                </DrawerHeader>
                <div className='mt-4 mx-4 overflow-y-scroll h-max'>

                    {/* <Input placeholder="Search for a restaurant" prefix={<SearchOutlined />} /> */}

                    <div>
                        {section === 'restaurants' && (
                            <div className='mt-2 overflow-y-scroll h-70'>
                                {savedVenues?.map((item: any, i: number) => {
                                    return (
                                        <div className='flex mb-6 w-full' key={i} onClick={() => openVenueFunc(item)}>
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
                                            <div className='flex-col ml-5 h-max my-auto w-full'>
                                                <p className='font-bold text-base'>{item.name}</p>
                                                <div className='flex justify-between'>
                                                    <p className='text-xs'>{item.location.address}</p>
                                                    <span className='ml-auto py-1 px-1.5 border-solid border-slate-200 text-black border-2 h-max  rounded-full text-xs bg-slate-200'>
                                                        {savedMenuItems.filter((i: any) => i.venue_id === item.id).length} dishes saved
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                        {section === 'dishes' && (
                            <div className='mt-2 overflow-y-scroll h-70'>
                                {savedMenuItems?.map((item: any, i: number) => {
                                    return (
                                        <div className='flex mb-6 w-full' key={i} onClick={() => openVenueFunc(allVenues.filter((i: any) => i.id === item.venue_id)[0])}>
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
                                            <div className='flex-col ml-5 h-max my-auto w-full'>
                                                <p className='font-bold text-base'>{item.name}</p>
                                                <p className='text-xs'>{allVenues.filter((i: any) => i.id === item.venue_id)[0]?.name}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </DrawerContent>
        </Drawer >
    )
}

export default SavedDrawer