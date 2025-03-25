'use client'
import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import { useRouter } from 'next/navigation';
const Header = () => {
    const toPage = useRouter()
    return (
        <div className='h-12'>
            <div className="w-full max-w-xl m-auto  h-full flex justify-between border-b-1 ">
                <div className='font-bold text-2xl flex flex-col justify-center h-full text-title-red cursor-pointer' onClick={() => toPage.push("/")}>
                    Toeic 990
                </div>
                <div className='!w-12 !h-12'><PersonIcon className='!w-full !h-full p-2' /></div>
            </div>
        </div>
    )
}

export default Header