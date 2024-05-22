import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from './ui/drawer';
import { Avatar, Image } from 'antd';
import { drawerStore, savedStore } from '@/app/store/state';
import VenueIcon from './ui/venueIcon';

type Props = {

}

const KINGSDAY_VENUE_ID = "662911a3096a61de8d1eed9c";
const RecommendedDrawer = () => {
    const { openRecommend, setOpenRecommend, openVenueFunc } = drawerStore();

    const { allVenues } = savedStore();
    return (
        <Drawer
            open={openRecommend}
            modal={false}
            onOpenChange={setOpenRecommend}
        >
            <DrawerContent className={`h-[70%]`}>
                <DrawerHeader>
                    <DrawerTitle>Recommended For You</DrawerTitle>
                </DrawerHeader>

                <div className='mt-4 mx-4 overflow-y-scroll h-100'>
                    {/* Hardcoded the first venue for Kings Day */}
                    {/* {allVenues?.filter((v: any) => v.id === KINGSDAY_VENUE_ID).map((item: any, i: number) => {
                        return (
                            <div className='flex mb-4' key={i} onClick={() => openVenueFunc(item)}>
                                <VenueIcon selectedVenue={{ image: item.profile_pic_url, name: item?.name }} />
                                <div className='flex-col ml-5 h-max my-auto'>
                                    <p className='font-bold text-base'>{item.name}</p>
                                    <p className='text-xs'>{item.location.address}</p>
                                </div>
                            </div>
                        )
                    })} */}

                    {allVenues?.filter((v: any) => v.id !== KINGSDAY_VENUE_ID).map((item: any, i: number) => {
                        return (
                            <div className='flex mb-4' key={i} onClick={() => openVenueFunc(item)}>
                                <VenueIcon selectedVenue={{ image: item.profile_pic_url, name: item?.name }} />
                                <div className='flex-col ml-5 h-max my-auto'>
                                    <p className='font-bold text-base'>{item.name}</p>
                                    <p className='text-xs'>{item.location.address}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </DrawerContent>
        </Drawer >
    )
}

export default RecommendedDrawer