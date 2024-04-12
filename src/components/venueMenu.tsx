import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react'
import filledHeart from './assets/filledheart.png';
import heart from './assets/heart.png';
import Image from 'next/image';
import { savedStore } from '@/app/store/state';
import { HeartFilled, HeartOutlined, HeartTwoTone } from '@ant-design/icons';

type Props = {
    menu: any
}

function VenueMenu(props: Props) {

    const [categories, setCategories] = useState<any>([])
    const [saves, setSaves] = useState<{ [key: string]: boolean }>({});
    // use savedStore
    const { savedMenuItems, saveMenuItem, removeMenuItem } = savedStore();

    useEffect(() => {
        console.log('props.menu', props.menu)
        const categories = props.menu?.items?.map((item: any) => item.categories[0])
        const catSet = new Set(categories)

        console.log('categories', catSet)
        setCategories(Array.from(catSet))

        const saves = {} as { [key: string]: boolean };
        props.menu?.items?.forEach((item: any) => {
            if (savedMenuItems.find((mI: any) => mI.id === item.id)) {
                saves[item.id] = true;
            } else {
                saves[item.id] = false;
            }
        });
        setSaves(saves);

        console.log('saves', savedMenuItems)

        return () => {

        }
    }, [props.menu])

    const filterMenu = (category: string) => {
        return props.menu?.items?.filter((mI: any) => mI.categories[0] === category)
    }

    const toggleSave = (item: any) => {
        setSaves(prev => ({
            ...prev,
            [item.id]: !prev[item.id]
        }));

        item.venue_id = props.menu.venue_id;

        if (saves[item.id]) {
            removeMenuItem(item);
        } else {
            saveMenuItem(item);
        }
    };

    console.log("savedMenuItems", savedMenuItems)
    const filteredSavedMenuItems = savedMenuItems?.filter((item: any) => item?.venue_id === props.menu?.venue_id);

    return (
        <Tabs>
            {filteredSavedMenuItems && filteredSavedMenuItems.length > 0 && (
                <Tabs.TabPane key='0' tab='Saved'>
                    <div className='px-2 py-4 overflow-y-scroll h-80'>
                        {filteredSavedMenuItems.map((item: any, i: number) => {
                            return (
                                <div className='flex mb-6' key={i}>
                                    <p className='text-base'>{item.name}</p>
                                    <div className='ml-auto flex items-left h-max'>
                                        {item.price > 0 && (
                                            <span className='p-1.5 border-solid border-[#12411B] border-2 h-max rounded-full ml-1'>
                                                ${item.price.toFixed(2)}
                                            </span>
                                        )}
                                        <button className='border-none bg-transparent' onClick={() => toggleSave(item)}>
                                            {/* <Image
                                                src={saves[item.id] ? filledHeart : heart}
                                                alt="Like Icon"
                                                width={22}
                                                height={22}
                                                style={{ marginLeft: ".5em", minWidth: "22px", minHeight: "22px" }}
                                            /> */}
                                            {saves[item.id] ? <HeartTwoTone twoToneColor="red" style={{ fontSize: "1.5em", marginLeft: ".5em", }} /> : <HeartOutlined style={{ fontSize: "1.5em", color: "lightgray", marginLeft: ".5em", }} />}
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Tabs.TabPane>
            )}
            {categories?.map((cat: any, i: number) => {
                const id = String(i + 1);
                return (
                    <Tabs.TabPane key={id} tab={cat}>
                        <div className='px-2 py-4 overflow-y-scroll h-80'>
                            {filterMenu(cat)?.map((item: any, i: number) => {
                                return (
                                    <div className='flex mb-6' key={i}>
                                        <p className='text-base'>{item.name}</p>
                                        <div className='ml-auto flex items-left h-max'>
                                            {item.price > 0 && (
                                                <span className='p-1.5 border-solid border-[#12411B] bg-[#12411B] text-white border-2 h-max rounded-full ml-2'>
                                                    ${item.price.toFixed(2)}
                                                </span>
                                            )}
                                            {/* <button className='my-auto h-max align-middle'><HeartIcon className='h-5 w-5' /></button> */}
                                            <button className='border-none bg-transparent' onClick={() => toggleSave(item)}>
                                                {/* <Image
                                                    src={saves[item.id] ? filledHeart : heart}
                                                    alt="Like Icon"
                                                    width={22}
                                                    height={22}
                                                    style={{ marginLeft: ".5em", minWidth: "22px", minHeight: "22px" }}
                                                /> */}
                                                {saves[item.id] ? <HeartTwoTone twoToneColor="red" style={{ fontSize: "1.5em", marginLeft: ".5em", }} /> : <HeartOutlined style={{ fontSize: "1.5em", color: "lightgray", marginLeft: ".5em", }} />}
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </Tabs.TabPane>
                );
            })}
        </Tabs>
    )
}

export default VenueMenu