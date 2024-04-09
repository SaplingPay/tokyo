'use client'
import React, { useState } from 'react'
import { Avatar, Button, Drawer, FloatButton } from 'antd';
import { DrawerStyles } from 'antd/es/drawer/DrawerPanel';
import Title from 'antd/es/typography/Title';
import { ChevronDown, CrosshairIcon, XIcon } from 'lucide-react';
import { Inter, Epilogue } from "next/font/google";
const font = Epilogue({ subsets: ["latin"] });

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
        // padding: "1rem 1rem 0 2rem",
        boxShadow: "none",
        // textAlign: "center"
    },
    wrapper: {
        boxShadow: "none"
    }

};

const HomeDrawer = (props: Props) => {

    const [height, setHeight] = useState('8vh')

    return (
        <Drawer
            open={props.open}
            placement='bottom'
            mask={false}
            title={null}
            maskClosable={false}
            styles={drawerStyles}
            height={height}
            className={font.className}
        // onClick={() => height === '8vh' ? setHeight('45vh') : setHeight('8vh')}
        >
            <div className='flex'>
                <button className='ml-auto mr-7 mt-4 bg-slate-100 rounded-full p-1 text-black' onClick={() => props.setOpen(false)}>
                    <XIcon className='h-5 w-5' />
                </button>
            </div >
            <div className='-mt-6 mb-5 mx-6'>
                <span className='font-bold text-base'>Recommended Restaurants For You</span>
            </div>

            <div className='mt-6 mx-4'>
                {Array(10).fill(0).map((_, i) => {
                    return (
                        <div className='flex mb-4' key={i}>
                            <Avatar size={64} src="https://bloximages.newyork1.vip.townnews.com/toronto.com/content/tncms/assets/v3/editorial/6/5d/65d20fbb-9006-50b3-8ab9-8157f27f85c6/63dc14cec1ba1.image.jpg?resize=720%2C480" />
                            <div className='flex-col ml-5 h-max my-auto'>
                                <p className='font-bold text-base'>Restaurant Name</p>
                                <p className='text-xs'>Address</p>
                            </div>
                            <div className='ml-auto bg-slate-100 rounded-full h-max py-2 px-4 my-auto'>
                                <p>5 dishes saved</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Drawer >
    )
}

export default HomeDrawer