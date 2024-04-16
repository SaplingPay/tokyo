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

    const { allVenues, savedVenues, savedMenuItems, removeMenuItem } = savedStore();
    const [section, setSection] = useState('restaurants')
    const [saves, setSaves] = useState<any>([])
    const { user: clerkUser } = useUser();
    const { user, setUser } = userStore();

    const removeFromSaves = (item: any) => {
        console.log(item)
        console.log(user)
        if (user.saves) {
            const data = {
                id: user.id,
                data: {
                    saves: user.saves.filter((s: any) => s.menu_item_id !== item.menu_item_id)
                }
            }
            console.log(data)
            UpdateUser(data)
                .then((res) => {
                    console.log(res)
                    // setUser(res)
                    setSaves((prev: any) => prev.filter((s: any) => s.menu_item_id !== item.menu_item_id))
                })
                .catch((err) => {
                    console.error(err)
                })

        } else {
            removeMenuItem(item);
            setSaves((prev: any) => prev.filter((s: any) => s.menu_item_id !== item.menu_item_id))
        }
    };

    const getSaves = (userSaves: any[]) => {
        for (let i = 0; i < userSaves.length; i++) {

            GetVenue(userSaves[i].venue_id)
                .then((res) => {
                    if (userSaves[i].type == 'menu_item') {
                        GetMenu(userSaves[i].venue_id, userSaves[i].menu_id)
                            .then((r: any) => {
                                const sItem = r.items.filter((it: any) => userSaves[i].menu_item_id === it.id)[0]

                                const s = {
                                    type: 'menu_item',
                                    venue_id: userSaves[i].venue_id,
                                    menu_id: userSaves[i].menu_id,
                                    menu_item_id: userSaves[i].menu_item_id,
                                    name: sItem.name,
                                    venue_name: res.name,
                                    profile_pic_url: res.profile_pic_url,
                                    location: res.location
                                }
                                setSaves((prev: any) => [...prev, s])
                            })

                    } else if (userSaves[i].type == 'venue') {
                        const s = {
                            type: 'venue',
                            venue_id: res.id,
                            name: res.name,
                            profile_pic_url: res.profile_pic_url,
                            location: res.location
                        }
                        setSaves((prev: any) => [...prev, s])
                    }
                })
        }
    }

    useEffect(() => {
        if (user.saves) {
            getSaves(user.saves)
        }
    }, [user])

    // console.log(saves)

    const populateSaves = (type: string) => {
        if (type === 'venue') {
            return user?.saves ? saves.filter((s: any) => s.type == "venue") : savedVenues
        }
        return user?.saves ? saves.filter((s: any) => s.type == "menu_item") : savedMenuItems
    }


    return (
        <Drawer
            open={openSaved}
            modal={false}
            onOpenChange={setOpenSaved}
        >
            <DrawerContent className={`h-[70%]`}>

                {/* <Input placeholder="Search for a restaurant" prefix={<SearchOutlined />} /> */}
                {user?.saves ?
                    <>
                        <DrawerHeader style={{ paddingTop: "1em", paddingBottom: "0" }}>
                            <DrawerTitle>
                                <div className='flex w-max mx-auto'>
                                    <button className={`flex-col mr-5 -ml-5 text-center w-30 ${section === 'restaurants' ? 'text-black' : 'text-gray-400'}`} onClick={() => setSection('restaurants')}>
                                        <p className='font-bold text-xl'>Restaurants</p>
                                        <p className='text-xs'>{saves.filter((v: any) => v.type == 'venue').length} restaurants</p>
                                    </button>
                                    <button className={`flex-col text-center w-30 ${section === 'dishes' ? 'text-black' : 'text-gray-400'}`} onClick={() => setSection('dishes')}>
                                        <p className='font-bold text-xl'>Dishes</p>
                                        <p className='text-xs'>{saves.filter((v: any) => v.type == 'menu_item').length} Dishes</p>
                                    </button>
                                </div>
                            </DrawerTitle>
                        </DrawerHeader>
                        <div className='mt-4 mx-4 overflow-y-scroll h-max'>
                            <div>
                                {section === 'restaurants' && (
                                    <div className='mt-2 overflow-y-scroll h-70'>
                                        {(saves.filter((s: any) => s.type == "venue")).map((item: any, i: number) => {
                                            return (
                                                <div className='flex mb-6 w-full' key={i} onClick={() => openVenueFunc(item)}>
                                                    <VenueIcon selectedVenue={{ image: item.profile_pic_url, name: item?.name }} />
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
                                        {(saves.filter((s: any) => s.type == "menu_item")).map((item: any, i: number) => {
                                            return (
                                                <div className='flex' key={i} >
                                                    <div className='flex mb-6 w-full' onClick={() => openVenueFunc(allVenues.filter((i: any) => i.id === item.venue_id)[0])}>
                                                        <VenueIcon selectedVenue={{ image: item.profile_pic_url, name: item?.name }} />
                                                        <div className='flex-col ml-5 h-max my-auto w-full'>
                                                            <p className='font-bold text-base'>{item.name}</p>
                                                            <p className='text-xs'>{item.venue_name}</p>
                                                        </div>
                                                    </div>
                                                    <button className='h-max mt-4 border-none bg-transparent' onClick={() => removeFromSaves(item)}>
                                                        <HeartTwoTone twoToneColor="red" style={{ fontSize: "1.5em", marginLeft: ".5em", }} />
                                                    </button>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </>

                    :
                    <>
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
                            <div>
                                {section === 'restaurants' && (
                                    <div className='mt-2 overflow-y-scroll h-70'>
                                        {(savedVenues).map((item: any, i: number) => {
                                            return (
                                                <div className='flex mb-6 w-full' key={i} onClick={() => openVenueFunc(item)}>
                                                    <VenueIcon selectedVenue={{ image: item.profile_pic_url, name: item?.name }} />
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
                                        {(savedMenuItems).map((item: any, i: number) => {
                                            console.log("ITEM", item)
                                            return (
                                                <div className='flex' key={i} >
                                                    <div className='flex mb-6 w-full' onClick={() => openVenueFunc(allVenues.filter((i: any) => i.id === item.venue_id)[0])}>
                                                        <VenueIcon selectedVenue={{ image: allVenues.filter((i: any) => i.id === item.venue_id)[0]?.profile_pic_url, name: item?.name }} />
                                                        <div className='flex-col ml-5 h-max my-auto w-full'>
                                                            <p className='font-bold text-base'>{item.name}</p>
                                                            <p className='text-xs'>{allVenues.filter((i: any) => i.id === item.venue_id)[0]?.name}</p>
                                                        </div>
                                                    </div>
                                                    <button className='h-max mt-4 border-none bg-transparent' onClick={() => removeFromSaves(item)}>
                                                        <HeartTwoTone twoToneColor="red" style={{ fontSize: "1.5em", marginLeft: ".5em", }} />
                                                    </button>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                }



            </DrawerContent>
        </Drawer >
    )
}

export default SavedDrawer