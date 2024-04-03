import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from './ui/button'

type Props = {}

const Navbar = (props: Props) => {
    const [selected, setSelected] = useState("For You")
    return (
        // // <div>NavBar</div>
        // <div className="fixed top-4 right-0 left-0 bottom-1.5rem z-50 max-w-max mx-auto inline-block bg-black bg-opacity-30 p-4 rounded-full backdrop-blur-md">
        //     <div className="flex justify-center items-center font-semibold">
        //         {["For You", "Saved"].map((item, index) => {
        //             return (
        //                 <Link key={index} href={`/${item}`} onClick={() => setSelected(item)} className={`p-2 px-5 rounded-full ${selected === item ? "text-black" : "text-white"} ${selected === item ? "bg-white" : "bg-transparent"}`}>{item}</Link>
        //             )
        //         })}
        //     </div>
        // </div>
        <div className="absolute top-5 right-0 left-0 bottom-1.5rem z-50 max-w-max mx-auto inline-block">
            <div className="flex p-0 rounded-full bg-white">
                {["For You", "Saved"].map((item, index) => {
                    return (
                        <button key={index} onClick={() => { console.log(item); setSelected(item); }} className={`py-3 px-12 rounded-full font-semibold ${selected === item ? "text-black" : "text-gray"} ${selected === item ? "bg-gray-300 bg-opacity-90" : "bg-transparent"}`}>{item}</button>
                    )
                })}
            </div>
        </div >
    )
}

export default Navbar