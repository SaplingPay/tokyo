import { savedStore } from '@/app/store/state';
import { Avatar } from 'antd';
import { clsx } from 'clsx';
import { useState } from 'react';
import { Drawer } from 'vaul';
import { DrawerContent, DrawerHeader, DrawerTitle } from './ui/drawer';

const snapPoints = [.15, .45, .75];

type Props = {

}

const RecommendedDrawer = () => {

    const { allVenues } = savedStore();

    const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);

    return (
        <Drawer.Root snapPoints={snapPoints} activeSnapPoint={snap} setActiveSnapPoint={setSnap} open={true} modal={false} shouldScaleBackground={true}>
            <DrawerContent
                className="fixed flex flex-col bg-white border border-gray-200 border-b-none rounded-t-[10px] bottom-0 left-0 right-0 h-full max-h-[97%] mx-[-1px]"
            >
                <DrawerHeader>
                    <DrawerTitle>Recommended Restaurants For You</DrawerTitle>
                </DrawerHeader>

                <div className='mt-4 mx-4 overflow-y-scroll pb-16'>
                    {allVenues?.map((item: any, i: number) => {
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
            </DrawerContent>
        </Drawer.Root>
    )
}

export default RecommendedDrawer