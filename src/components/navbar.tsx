import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { navStore } from '@/app/store/state'

type Props = {

}

const Navbar = (props: Props) => {
    const { current, update } = navStore();

    const toggle = (item: string) => {
        update(item)
    }

    return (
        <div className="absolute top-5 right-0 left-0 bottom-1.5rem z-50 max-w-max mx-auto inline-block">
            <div className="flex p-0 rounded-full bg-white">
                {["For You", "Saved"].map((item, index) => {
                    return (
                        <button key={index} onClick={() => toggle(item)} className={`py-3 px-12 rounded-full font-semibold ${current === item ? "text-white" : "text-black"} ${current === item ? "bg-[#12411B] bg-opacity-90" : "bg-transparent"}`}>{item}</button>
                    )
                })}
            </div>
        </div >
    )
}

export default Navbar