import React from 'react'
import { Search, Send } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function DashboardHeader({user}:any) {
    return (
        <div className='flex justify-end items-center gap-2'>
            <div className="flex items-center gap-2 border border-gray-300 bg-white pl-2 rounded-md">
                <Search className='w-4 h-4 ml-2' />
                <input type="text" placeholder='Search notes...' className="rounded-md p-2 w-full outline-none" />
            </div>
            <div className="">
                <Image src={user?.picture} alt="user" width={40} height={40} className='rounded-full' />
            </div>
            <Button variant='default' className='flex items-center gap-2'><Send className='w-4 h-4' />Invite</Button>
        </div>
    )
}
