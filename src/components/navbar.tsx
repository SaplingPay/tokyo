import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { userStore } from '@/app/store/state'

type Props = {
    current: string
    update: (current: string) => void
    setOpenModal: (open: boolean) => void
}

const Navbar = (props: Props) => {
    const [selected, setSelected] = useState(props.current)
    const user = userStore((state: any) => state.user)

    const toggle = (item: string) => {
        if (selected === "For You" && item === "Saved") {
            if (user) {
                setSelected("Saved")
            } else {
                props.setOpenModal(true)
            }

        }

    }

    return (
        <div className="absolute top-5 right-0 left-0 bottom-1.5rem z-50 max-w-max mx-auto inline-block">
            <div className="flex p-0 rounded-full bg-white">
                {["For You", "Saved"].map((item, index) => {
                    return (
                        <button key={index} onClick={() => toggle(item)} className={`py-3 px-12 rounded-full font-semibold ${selected === item ? "text-white" : "text-black"} ${selected === item ? "bg-[#12411B] bg-opacity-90" : "bg-transparent"}`}>{item}</button>
                    )
                })}
            </div>
        </div >
    )
}

export default Navbar