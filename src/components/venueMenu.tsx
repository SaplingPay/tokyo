import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react'
import filledHeart from './assets/filledheart.png';
import heart from './assets/heart.png';
import Image from 'next/image';

type Props = {
    menu: any
}

function VenueMenu(props: Props) {

    const [categories, setCategories] = useState<any>([])
    const [saves, setSaves] = useState<{[key: string]: boolean}>({});

    useEffect(() => {
        console.log('props.menu', props.menu)
        const categories = props.menu?.items?.map((item: any) => item.categories[0])
        const catSet = new Set(categories)

        console.log('categories', catSet)
        setCategories(Array.from(catSet))

        const saves = {};
        props.menu?.items?.forEach((item: any) => {
            saves[item.id] = false;  
        });
        setSaves(saves);

        return () => {

        }
    }, [props.menu])

    const filterMenu = (category: string) => {
        return props.menu?.items?.filter((mI: any) => mI.categories[0] === category)
    }

    const toggleSave = (itemId: string) => {
        setSaves(prev => ({
            ...prev,
            [itemId]: !prev[itemId]
        }));
    };


    return (
        <Tabs>
            {categories?.map((cat: any, i: number) => {
                const id = String(i + 1);
                return (
                    <Tabs.TabPane key={id} tab={cat}>
                        <div className='px-2 py-4 overflow-y-scroll h-80'>
                            {filterMenu(cat)?.map((item: any, i: number) => {
                                return (
                                    <div className='flex mb-6' key={i}>
                                        <p className='text-base'>{item.name}</p>
                                        <div className='ml-auto flex items-left'>
                                               {item.price > 0 && ( 
                                                <span className='p-1.5 border-solid border-[#12411B] border-2 rounded-full ml-1'>
                                                    ${item.price.toFixed(2)}
                                                </span>
                                            )}
                                            {/* <button className='my-auto h-max align-middle'><HeartIcon className='h-5 w-5' /></button> */}
                                            <button className='border-none bg-transparent' onClick={() => toggleSave(item.id)}>
                                        <Image
                                                src={saves[item.id] ? filledHeart : heart}
                                                alt="Like Icon"
                                                width={22} 
                                                height={22}
                                                style={{marginLeft:".5em", minWidth:"22px", minHeight:"22px"}}
                                                />
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