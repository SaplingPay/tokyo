import React, { useState } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer';
import { Avatar, Button } from 'antd';
import { drawerStore, savedStore } from '@/app/store/state';

type Props = {

}

const RecommendedDrawer = () => {
    const { openRecommend, setOpenRecommend, selectedVenue, setSelectedVenue } = drawerStore();

    const { allVenues } = savedStore();
    // const [open, setOpen] = useState(true)

    return (
        <Drawer
            open={openRecommend}
            modal={false}
            onOpenChange={setOpenRecommend}
        >
            <DrawerContent className={`h-[50%]`}>
                <DrawerHeader>
                    <DrawerTitle>Recommended Restaurants For You</DrawerTitle>
                </DrawerHeader>

                <div className='mt-4 mx-4 overflow-y-scroll h-80'>
                    {allVenues?.map((item: any, i: number) => {
                        return (
                            <div className='flex mb-4' key={i} onClick={() => setSelectedVenue(item)}>
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
            </DrawerContent>
        </Drawer >
    )
}

export default RecommendedDrawer