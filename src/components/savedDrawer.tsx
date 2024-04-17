import React, { useEffect, useState } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from './ui/drawer';
import { Avatar } from 'antd';
import { drawerStore, savedStore, userStore } from '@/app/store/state';
import VenueIcon from './ui/venueIcon';
import { HeartTwoTone } from '@ant-design/icons';
import { GetMenu, GetVenue, UpdateUser } from '@/app/actions';
import { useUser } from '@clerk/nextjs';

type Props = {

}

const SavedDrawer = () => {
    const { openSaved, setOpenSaved, openVenueFunc } = drawerStore();

    const { storedSaves, allVenues, storeSaves } = savedStore();
    const [section, setSection] = useState('restaurants')
    const { user: clerkUser } = useUser();
    const { user, setUser } = userStore();

    const removeFromSaves = (item: any, venue_id: string, menu_id: string) => {
        item.venue_id = item.venue_id || venue_id;
        item.menu_id = item.menu_id || menu_id;
        item.id = item.id || item.menu_item_id;

        console.log('item', item)

        if (clerkUser) {
            const updatedSaves = user.saves.filter((s: any) => s.menu_item_id !== item.id)

            const data = {
                id: user.id,
                data: {
                    saves: updatedSaves
                }
            }
            console.log('data', data)
            UpdateUser(data)
                .then((res) => {
                    setUser(res)
                    const storeS = storedSaves.filter((s: any) => s.menu_item_id !== item.id)
                    storeSaves(storeS)
                })
                .catch((err) => {
                    console.error(err)
                })


        } else {
            // Not logged in
            const storeS = storedSaves.filter((s: any) => s.menu_item_id !== item.id)
            storeSaves(storeS)

        }
    }


    return (
        <Drawer
            open={openSaved}
            modal={false}
            onOpenChange={setOpenSaved}
        >
            <DrawerContent className={`h-[70%]`}>

                {/* <Input placeholder="Search for a restaurant" prefix={<SearchOutlined />} /> */}
                <DrawerHeader style={{ paddingTop: "1em", paddingBottom: "0" }}>
                    <DrawerTitle>
                        <div className='flex w-max mx-auto'>
                            <button className={`flex-col mr-5 -ml-5 text-center w-30 ${section === 'restaurants' ? 'text-black' : 'text-gray-400'}`} onClick={() => setSection('restaurants')}>
                                <p className='font-bold text-xl'>Places</p>
                                <p className='text-xs'>{storedSaves.filter((v: any) => v.type == 'venue').length} Places</p>

                            </button>
                            <button className={`flex-col text-center w-30 ${section === 'dishes' ? 'text-black' : 'text-gray-400'}`} onClick={() => setSection('dishes')}>
                                <p className='font-bold text-xl'>Items</p>
                                <p className='text-xs'>{storedSaves.filter((v: any) => v.type == 'menu_item').length} Items</p>
                            </button>
                        </div>
                    </DrawerTitle>
                </DrawerHeader>
                <div className='mt-4 mx-4 overflow-y-scroll h-max'>
                    <div>
                        {section === 'restaurants' && (
                            <div className='mt-2 overflow-y-scroll h-70'>
                                {(storedSaves.filter((s: any) => s.type == "venue")).map((item: any, i: number) => {
                                    return (
                                        <div className='flex mb-6 w-full' key={i} onClick={() => openVenueFunc(allVenues.filter((i: any) => i.id === item.venue_id)[0])}>
                                            <VenueIcon selectedVenue={{ image: item.profile_pic_url, name: item?.name }} />
                                            <div className='flex-col ml-5 h-max my-auto w-full'>
                                                <p className='font-bold text-base'>{item.name}</p>
                                                <div className='flex justify-between'>
                                                    <p className='text-xs'>{item.location.address}</p>
                                                    <span className='ml-auto py-1 px-1.5 border-solid border-slate-200 text-black border-2 h-max  rounded-full text-xs bg-slate-200'>
                                                        {storedSaves?.filter((s: any) => s.type == "menu_item" && s.venue_id == item.venue_id).length} 💚 dishes saved
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
                                {(storedSaves.filter((s: any) => s.type == "menu_item")).map((item: any, i: number) => {
                                    return (
                                        <div className='flex' key={i} >
                                            <div className='flex mb-6 w-full' onClick={() => openVenueFunc(allVenues.filter((i: any) => i.id === item.venue_id)[0])}>
                                                <VenueIcon selectedVenue={{ image: item.profile_pic_url, name: item?.name }} />
                                                <div className='flex-col ml-5 h-max my-auto w-full'>
                                                    <p className='font-bold text-base'>{item.name}</p>
                                                    <p className='text-xs'>{item.venue_name}</p>
                                                </div>
                                            </div>
                                            <button className='h-max mt-4 border-none bg-transparent' onClick={() => removeFromSaves(item, item.venue_id, item.menu_id)}>
                                                <HeartTwoTone twoToneColor="red" style={{ fontSize: "1.5em", marginLeft: ".5em", }} />
                                            </button>
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