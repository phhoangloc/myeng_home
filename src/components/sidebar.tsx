'use client'
import React from 'react'

import { useRouter } from 'next/navigation';
import HomeIcon from '@mui/icons-material/Home';
import AbcIcon from '@mui/icons-material/Abc';
const Sidebar = () => {


    const listMenu = [
        {
            icon: <HomeIcon className='!w-12 !h-12 p-2' />,
            name: "TOEIC 990",
            link: "/",
        },
        {
            icon: <AbcIcon className='!w-12 !h-12 p-2' />,
            name: "Word",
            link: "/word",
        },
        {
            icon: <div className='!w-12 !h-12 p-2 flex flex-col justify-center text-center font-bold text-xl'>1</div>,
            name: "Path 1",
            link: "/pathone",
        },
        {
            icon: <div className='!w-12 !h-12 p-2 flex flex-col justify-center text-center font-bold text-xl'>2</div>,
            name: "Path 2",
            link: "/pathtwo",
        },
        {
            icon: <div className='!w-12 !h-12 p-2 flex flex-col justify-center text-center font-bold text-xl'>3</div>,
            name: "Path 3",
            link: "/paththree",
        },
        {
            icon: <div className='!w-12 !h-12 p-2 flex flex-col justify-center text-center font-bold text-xl'>4</div>,
            name: "Path 4",
            link: "/pathfour",
        },
        {
            icon: <div className='!w-12 !h-12 p-2 flex flex-col justify-center text-center font-bold text-xl'>5</div>,
            name: "Path 5",
            link: "/pathfive",
        },
        {
            icon: <div className='!w-12 !h-12 p-2 flex flex-col justify-center text-center font-bold text-xl'>6</div>,
            name: "Path 6",
            link: "/pathsix",
        },
        {
            icon: <div className='!w-12 !h-12 p-2 flex flex-col justify-center text-center font-bold text-xl'>7</div>,
            name: "Path 7",
            link: "/pathseven",
        },
    ]

    const toPage = useRouter()
    return (
        <div className='h-max'>
            {listMenu.map((menu, index) =>
                <div key={index} className='h-12 flex flex-col justify-center overflow-hidden cursor-pointer first:text-main first:font-bold' onClick={() => { toPage.push(menu.link) }} >
                    <div className="flex ">
                        <div className='text-main'>
                            {menu.icon}
                        </div>
                        <div className="flex flex-col justify-center">
                            {menu.name}
                        </div>
                    </div>
                </div>)}
        </div>

    )
}

export default Sidebar