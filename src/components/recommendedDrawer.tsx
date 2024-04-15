import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from './ui/drawer';
import { Avatar, Image } from 'antd';
import { drawerStore, savedStore } from '@/app/store/state';

type Props = {

}

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
                    <DrawerTitle>Recommended Restaurants For You</DrawerTitle>
                </DrawerHeader>

                <div className='mt-4 mx-4 overflow-y-scroll h-100'>
                    {allVenues?.map((item: any, i: number) => {
                        return (
                            <div className='flex mb-4' key={i} onClick={() => openVenueFunc(item)}>
                                {item?.profile_pic_url ?
                                    <img src={item.profile_pic_url} alt={""} style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />
                                    :
                                    <Avatar
                                        style={{
                                            backgroundColor: '#12411B',
                                            color: '#F5FFBE',
                                            width: "60px",
                                            height: "60px",
                                        }}>{item.name.toUpperCase()[0]}
                                    </Avatar>
                                }
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