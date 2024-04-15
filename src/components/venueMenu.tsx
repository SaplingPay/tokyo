import { Tabs } from 'antd';
import React, { use, useEffect, useState } from 'react'
import { savedStore } from '@/app/store/state';
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';

type Props = {
    menus: any[]
}

function VenueMenu(props: Props) {

    const [categories, setCategories] = useState<any>({})
    const [saves, setSaves] = useState<{ [key: string]: boolean }>({});
    const { savedMenuItems, saveMenuItem, removeMenuItem } = savedStore();

    useEffect(() => {
        setCategories({})

        for (let i = 0; i < props.menus.length; i++) {
            const menu = props.menus[i];
            const c = menu?.items?.map((item: any) => item.categories[0])
            const catSet = new Set(c)
            const data = {
                ...categories,
                [menu.id]: Array.from(catSet)
            }
            setCategories(data)
            const s = {
                ...saves
            } as { [key: string]: boolean };
            menu?.items?.forEach((item: any) => {
                if (savedMenuItems.find((mI: any) => mI.id === item.id)) {
                    s[item.id] = true;
                } else {
                    s[item.id] = false;
                }
            });
            setSaves(s);
        }

        return () => {

        }
    }, [props.menus])

    const toggleSave = (item: any, venue_id: string, menu_id: string) => {
        item.venue_id = venue_id;
        item.menu_id = menu_id;

        if (saves[item.id]) {
            removeMenuItem(item);
        } else {
            saveMenuItem(item);
        }
        setSaves(prev => ({
            ...prev,
            [item.id]: !prev[item.id]
        }));
    };

    return (
        props.menus.length === 1 ? (
            <Tabs style={{ marginRight: '1em' }}>
                {savedMenuItems?.filter((item: any) => item.venue_id === props.menus[0].venue_id).length > 0 && (
                    <Tabs.TabPane key='0' tab='Saved'>
                        <div className='px-2 py-4 overflow-y-scroll h-80 mb-4'>
                            {savedMenuItems?.filter((item: any) => (item.venue_id === props.menus[0].venue_id && item.menu_id === props.menus[0].id)).map((item: any, i: number) => {
                                return (
                                    <div className='flex mb-6' key={i}>
                                        <p className='text-base'>{item.name}</p>
                                        <div className='ml-auto flex items-left h-max'>
                                            {item.price > 0 && (
                                                <span className='p-1.5 border-solid border-[#12411B] bg-[#12411B] text-[#F5FFBE] border-2 h-max rounded-full ml-1'>
                                                    ${item.price.toFixed(2)}
                                                </span>
                                            )}
                                            <button className='border-none bg-transparent' onClick={() => toggleSave(item, props.menus[0].venue_id, props.menus[0].id)}>
                                                {saves[item.id] ? <HeartTwoTone twoToneColor="red" style={{ fontSize: "1.5em", marginLeft: ".5em", }} /> : <HeartOutlined style={{ fontSize: "1.5em", color: "lightgray", marginLeft: ".5em", }} />}
                                            </button>
                                        </div>
                                    </div>
                                )
                            }
                            )}
                        </div>
                    </Tabs.TabPane>
                )}
                {categories[props.menus[0].id]?.map((cat: any, i: number) => {
                    const id = String(i + 1);
                    return (
                        <Tabs.TabPane key={id} tab={cat} >
                            <div className='px-2 py-4 overflow-y-scroll h-80 mb-4'>
                                {props.menus[0]?.items?.filter((item: any) => item.categories[0] === cat).map((item: any, i: number) => {
                                    return (
                                        <div className='flex mb-6' key={i}>
                                            <p className='text-base'>{item.name}</p>
                                            <div className='ml-auto flex items-left h-max'>
                                                {item.price > 0 && (
                                                    <span className='p-1.5 border-solid border-[#12411B] bg-[#12411B] text-[#F5FFBE] border-2 h-max rounded-full ml-2'>
                                                        ${item.price.toFixed(2)}
                                                    </span>
                                                )}
                                                <button className='border-none bg-transparent' onClick={() => toggleSave(item, props.menus[0].venue_id, props.menus[0].id)}>
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

            :
            <Tabs defaultActiveKey='0' type="card" tabBarStyle={{ margin: '0' }} style={{ marginRight: "1em" }}>
                {
                    props.menus.map((menu, index) => {
                        return (
                            <Tabs.TabPane key={index} tab={menu.name} >
                                <Tabs>
                                    {savedMenuItems?.filter((item: any) => (item.venue_id === menu.venue_id && item.menu_id === menu.id)).length > 0 && (
                                        <Tabs.TabPane key='0' tab='Saved'>
                                            <div className='px-2 py-4 overflow-y-scroll h-80 mb-4'>
                                                {savedMenuItems?.filter((item: any) => (item.venue_id === menu.venue_id && item.menu_id === menu.id)).map((item: any, i: number) => {
                                                    return (
                                                        <div className='flex mb-6' key={i}>
                                                            <p className='text-base'>{item.name}</p>
                                                            <div className='ml-auto flex items-left h-max'>
                                                                {item.price > 0 && (
                                                                    <span className='p-1.5 border-solid border-[#12411B] bg-[#12411B] text-[#F5FFBE] border-2 h-max rounded-full ml-1'>
                                                                        ${item.price.toFixed(2)}
                                                                    </span>
                                                                )}
                                                                <button className='border-none bg-transparent' onClick={() => toggleSave(item, menu.venue_id, menu.id)}>
                                                                    {saves[item.id] ? <HeartTwoTone twoToneColor="red" style={{ fontSize: "1.5em", marginLeft: ".5em", }} /> : <HeartOutlined style={{ fontSize: "1.5em", color: "lightgray", marginLeft: ".5em", }} />}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                )}
                                            </div>
                                        </Tabs.TabPane>
                                    )}
                                    {categories[menu.id]?.map((cat: any, i: number) => {
                                        const id = String(i + 1);
                                        return (
                                            <Tabs.TabPane key={id} tab={cat}>
                                                <div className='px-2 py-4 overflow-y-scroll h-80 mb-4'>
                                                    {menu?.items?.filter((item: any) => item.categories[0] === cat).map((item: any, i: number) => {
                                                        return (
                                                            <div className='flex mb-6' key={i}>
                                                                <p className='text-base'>{item.name}</p>
                                                                <div className='ml-auto flex items-left h-max'>
                                                                    {item.price > 0 && (
                                                                        <span className='p-1.5 border-solid border-[#12411B] bg-[#12411B] text-[#F5FFBE] border-2 h-max rounded-full ml-2'>
                                                                            ${item.price.toFixed(2)}
                                                                        </span>
                                                                    )}
                                                                    <button className='border-none bg-transparent' onClick={() => toggleSave(item, menu.venue_id, menu.id)}>
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
                            </Tabs.TabPane>
                        )
                    })
                }
            </Tabs>
    )
}

export default VenueMenu