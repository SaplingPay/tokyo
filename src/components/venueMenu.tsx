import { Tabs } from 'antd';
import React, { use, useEffect, useState } from 'react'
import { savedStore, userStore } from '@/app/store/state';
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';
import { useUser } from '@clerk/nextjs';
import { GetMenusByVenueID, UpdateUser } from '@/app/actions';

type Props = {
    // menus: any[]
    selectedVenue: any
}

function VenueMenu(props: Props) {

    const [categories, setCategories] = useState<any>({})
    const { storedSaves, allVenues, storeSaves } = savedStore();
    const { user: clerkUser } = useUser();
    const { user, setUser } = userStore()
    const [menus, setMenus] = useState<any[]>([])

    useEffect(() => {
        // console.log('VENUE MENU - storedSaves', storedSaves)
        // console.log('selectedVenue', props.selectedVenue)
        setCategories({})

        GetMenusByVenueID(props.selectedVenue?.id)
            .then((res) => {
                // console.log('res', res)
                for (let i = 0; i < res.length; i++) {
                    const menu = res[i];
                    // console.log('menu', menu)
                    // console.log('venues', allVenues)
                    const c = menu?.items?.map((item: any) => item.categories[0])
                    const catSet = new Set(c)
                    const data = {
                        ...categories,
                        [menu.id]: Array.from(catSet)
                    }
                    setCategories((prev: any) => ({ ...prev, ...data }))
                }
                setMenus(res)
            })
            .catch((err) => {
                console.error(err)
            })

        return () => {

        }
    }, [props.selectedVenue])

    const toggleSave = (item: any, venue_id: string, menu_id: string) => {
        item.venue_id = item.venue_id || venue_id;
        item.menu_id = item.menu_id || menu_id;
        item.id = item.id || item.menu_item_id;

        const sI = {
            type: 'menu_item',
            venue_id: item.venue_id,
            menu_id: item.menu_id,
            menu_item_id: item.id,
            name: item.name,
            venue_name: allVenues.find((v: any) => v.id === venue_id).name,
            profile_pic_url: allVenues.find((v: any) => v.id === venue_id).profile_pic_url,
            location: allVenues.find((v: any) => v.id === venue_id).location
        }
        // console.log('sI', sI)

        const vI = {
            type: 'venue',
            venue_id: item.venue_id,
            name: allVenues.find((v: any) => v.id === venue_id).name,
            profile_pic_url: allVenues.find((v: any) => v.id === venue_id).profile_pic_url,
            location: allVenues.find((v: any) => v.id === venue_id).location
        }
        // console.log('vI', vI)

        if (clerkUser) {
            if (storedSaves.find((s: any) => s.menu_item_id === item.id)) {
                const updatedSaves = user.saves.filter((s: any) => s.menu_item_id !== item.id)

                const data = {
                    id: user.id,
                    data: {
                        saves: updatedSaves
                    }
                }
                // console.log('data', data)
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
                const updatedSaves = [...user.saves, {
                    type: 'menu_item',
                    venue_id: venue_id,
                    menu_id: menu_id,
                    menu_item_id: item.id
                }]

                if (!storedSaves.find((s: any) => s.venue_id === venue_id)) {
                    updatedSaves.push({
                        type: 'venue',
                        venue_id: venue_id
                    })
                }

                const data = {
                    id: user.id,
                    data: {
                        saves: updatedSaves
                    }
                }

                UpdateUser(data)
                    .then((res) => {
                        setUser(res)
                        const storeS = [...storedSaves, sI]
                        if (!storedSaves.find((s: any) => s.venue_id === venue_id)) {
                            storeS.push(vI)
                        }
                        // console.log('storeS', storeS)
                        // console.log('res', res)
                        storeSaves(storeS)
                    })
                    .catch((err) => {
                        console.error(err)
                    })
            }


        } else {
            // Not logged in
            if (storedSaves.find((s: any) => s.menu_item_id === item.id)) {
                const storeS = storedSaves.filter((s: any) => s.menu_item_id !== item.id)
                storeSaves(storeS)
            } else {
                const storeS = [...storedSaves, sI]
                if (!storedSaves.find((s: any) => s.venue_id === venue_id)) {
                    storeS.push(vI)
                }
                storeSaves(storeS)
            }

        }
    };

    // console.log('menus', menus)

    return (props.selectedVenue && menus.length > 0 ?
        menus.length === 1 ? (
            <Tabs style={{ marginRight: '1em' }}>
                {storedSaves?.filter((s: any) => s.type === "menu_item" && s.venue_id === menus[0].venue_id).length > 0 && (
                    <Tabs.TabPane key='0' tab='Saved'>
                        <div className='px-2 py-4 overflow-y-scroll h-80 mb-4'>
                            {storedSaves?.filter((s: any) => (s.type === "menu_item" && s.venue_id === menus[0].venue_id)).map((item: any, i: number) => {
                                return (
                                    <div className='flex mb-6' key={i}>
                                        <p className='text-base'>{item.name}</p>
                                        <div className='ml-auto flex items-left h-max'>
                                            {item.price > 0 && (
                                                <span className='p-1.5 border-solid border-[#12411B] bg-[#12411B] text-[#F5FFBE] border-2 h-max rounded-full ml-1'>
                                                    ${item.price.toFixed(2)}
                                                </span>
                                            )}
                                            <button className='border-none bg-transparent' onClick={() => toggleSave(item, item.venue_id, item.menu_id)}>
                                                <HeartTwoTone twoToneColor="red" style={{ fontSize: "1.5em", marginLeft: ".5em", }} />
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </Tabs.TabPane>
                )
                }
                {categories[menus[0].id]?.map((cat: any, i: number) => {
                    const id = String(i + 1);
                    return (
                        <Tabs.TabPane key={id} tab={cat} >
                            <div className='px-2 py-4 overflow-y-scroll h-80 mb-4'>
                                {menus[0]?.items?.filter((item: any) => item.categories[0] === cat).map((item: any, i: number) => {
                                    return (
                                        <div className='flex mb-6' key={i}>
                                            <p className='text-base'>{item.name}</p>
                                            <div className='ml-auto flex items-left h-max'>
                                                {item.price > 0 && (
                                                    <span className='p-1.5 border-solid border-[#12411B] bg-[#12411B] text-[#F5FFBE] border-2 h-max rounded-full ml-2'>
                                                        ${item.price.toFixed(2)}
                                                    </span>
                                                )}
                                                <button className='border-none bg-transparent' onClick={() => toggleSave(item, menus[0].venue_id, menus[0].id)}>
                                                    {storedSaves?.find((s: any) => s.menu_item_id === item.id) ? <HeartTwoTone twoToneColor="red" style={{ fontSize: "1.5em", marginLeft: ".5em", }} /> : <HeartOutlined style={{ fontSize: "1.5em", color: "lightgray", marginLeft: ".5em", }} />}
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
                    menus?.map((menu, index) => {
                        return (
                            <Tabs.TabPane key={index} tab={menu.name} >
                                <Tabs>
                                    {storedSaves?.filter((s: any) => s.type === "menu_item" && s.venue_id === menu.venue_id && s.menu_id === menu.id).length > 0 && (
                                        <Tabs.TabPane key='0' tab='Saved'>
                                            <div className='px-2 py-4 overflow-y-scroll h-80 mb-4'>
                                                {storedSaves?.filter((s: any) => (s.type === "menu_item" && s.venue_id === menu.venue_id && s.menu_id === menu.id)).map((item: any, i: number) => {
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
                                                                    <HeartTwoTone twoToneColor="red" style={{ fontSize: "1.5em", marginLeft: ".5em", }} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                )}
                                            </div>
                                        </Tabs.TabPane>
                                    )}
                                    {categories[menu.id] && categories[menu.id].map((cat: any, i: number) => {
                                        const id = String(i + 1);
                                        // console.log('cat', cat)
                                        return (
                                            <Tabs.TabPane key={id} tab={cat}>
                                                <div className='px-2 py-4 overflow-y-scroll h-80 mb-4'>
                                                    {menu.items.filter((item: any) => item.categories[0] === cat).map((item: any, i: number) => {
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
                                                                        {storedSaves?.find((s: any) => s.menu_item_id === item.id) ? <HeartTwoTone twoToneColor="red" style={{ fontSize: "1.5em", marginLeft: ".5em", }} /> : <HeartOutlined style={{ fontSize: "1.5em", color: "lightgray", marginLeft: ".5em", }} />}
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
        : "")
}

export default VenueMenu