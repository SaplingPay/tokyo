'use client'
import React, { useState } from 'react'
import { Avatar, Button, Drawer, FloatButton, Input, Tabs } from 'antd';
import { DrawerStyles } from 'antd/es/drawer/DrawerPanel';
import Title from 'antd/es/typography/Title';
import { ChevronDown, CrosshairIcon, HeartIcon, SearchIcon, XIcon } from 'lucide-react';
import { Inter, Epilogue } from "next/font/google";
const font = Epilogue({ subsets: ["latin"] });
import { SearchOutlined } from '@ant-design/icons';

type Props = {
    setOpen: (open: boolean) => void
    open: boolean
}

const drawerStyles: DrawerStyles = {
    header: {
        display: "none",
    },
    body: {
        padding: 0,

    },
    footer: {
        display: "none",
    },
    content: {
        borderRadius: "3rem 3rem 0 0",
        padding: "0",
        boxShadow: "none",
        // textAlign: "center"
    },
    wrapper: {
        boxShadow: "none"
    }

};

const RestaurantViewDrawer = (props: Props) => {

    const Menu = () => {
        return (
            <div className='px-2 py-4'>
                {Array(10).fill(0).map((_, i) => {
                    return (
                        <div className='flex mb-6' key={i}>
                            <p className='text-lg'>White Chocolate Cookie</p>
                            <div className='ml-auto'>
                                <span className='p-1.5 border-solid border-black border-2 rounded-full mr-2'>$3.00</span>
                                <button className='my-auto h-max align-middle'><HeartIcon className='h-5 w-5' /></button>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    const openFilters = () => {
        props.setOpen(false)
    }

    return (
        <Drawer
            open={props.open}
            placement='bottom'
            mask={false}
            title={null}
            maskClosable={false}
            styles={drawerStyles}
            height="45vh"
            className={font.className}
        >
            {/* <FloatButton
                icon={<XIcon />}
                style={{ top: ".5em", right: ".5em", position: "absolute" }}
                onClick={() => console.log(false)} /> */}

            <div className='flex'>
                <button className='ml-auto mr-7 mt-4 bg-slate-100 rounded-full p-1 text-black' onClick={() => props.setOpen(false)}>
                    <XIcon className='h-5 w-5' />
                </button>
            </div>

            <div className='-mt-6 mb-2 pt-2 px-2'>
                <div className='flex mb-4'>
                    <Avatar size={120} src="https://bloximages.newyork1.vip.townnews.com/toronto.com/content/tncms/assets/v3/editorial/6/5d/65d20fbb-9006-50b3-8ab9-8157f27f85c6/63dc14cec1ba1.image.jpg?resize=720%2C480" />
                    <div className='flex-col ml-5 h-max my-auto mx-full'>
                        <div className='flex flex-row'>
                            <p className='font-bold text-base'>Lourens Amsterdam </p>
                            <button>
                                <HeartIcon className='ml-2' />
                            </button>
                        </div>

                        <p className='font-bold text-xs mb-2'>Oude Leliestraat 15</p>
                        <p className='text-xs'>🥐☕️ Cafe Bakery</p>
                    </div>
                </div>
            </div>

            <div className='flex'>
                <button className='ml-auto pr-2 -my-10 h-max' onClick={openFilters}>
                    <span className='mx-max text-x py-2 px-4 rounded-full border-solid border-black border-2'>Dietary Filters</span>
                </button>
            </div>

            {/* <Input placeholder="Search for a restaurant" prefix={<SearchOutlined />} /> */}
            <div className='mt-2 px-4'>

                <Tabs
                    type="card"
                    items={['Pastries', 'Coffees', 'Teas'].map((item, i) => {
                        const id = String(i + 1);
                        return {
                            label: item,
                            key: id,
                            children: <Menu />,
                        };
                    })}
                />
            </div>
        </Drawer>
    )
}

export default RestaurantViewDrawer