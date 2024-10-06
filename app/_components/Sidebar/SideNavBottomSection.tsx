import { useState, useEffect } from 'react'
import { Github, Archive, FilePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Separator } from '@/components/ui/separator'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


export default function Bottom({ onFileCreate }: any) {
    const [fileInput, setFileInput] = useState("")
    const menuList = [
        {
            id: 1,
            name: "Github",
            path: 'https://github.com/Shivam171/note-doodle',
            icon: Github
        },
        {
            id: 2,
            name: 'Archive',
            path: '',
            icon: Archive
        }
    ]
    return (
        <div>
            <Separator className='my-2' />
            <div className="flex flex-col gap-1">
                {menuList.map((item) => (
                    <Button
                        key={item.id}
                        className="w-full flex items-center justify-start gap-2 bg-gray-50 text-black hover:bg-gray-200"
                        onClick={() => window.open(item.path)}
                    >
                        <item.icon className="w-4 h-4" />
                        {item.name}
                    </Button>
                ))}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className='mt-2 justify-start gap-1 items-center w-full'>
                            <FilePlus className="w-4 h-4" /> New File
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className='text-lg'>Create new file</DialogTitle>
                            <DialogDescription>
                                <input
                                    type="text"
                                    onChange={(e) => setFileInput(e.target.value)}
                                    placeholder='Enter file name'
                                    className="border border-gray-300 rounded-md p-2 w-full outline-none"
                                />
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    onClick={() => onFileCreate(fileInput)}
                                    type="button"
                                    disabled={!(fileInput && fileInput.trim().length > 3)}
                                    variant="default">
                                    Create
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>



                <div className="h-2 w-full bg-gray-50 rounded-full">
                    <div className="h-2 w-[40%] bg-black rounded-full">
                    </div>
                </div>
                <h2 className='text-xs'>1 out of <b>5</b> files used</h2>
                <p className='text-xs'><button><u><b>Upgrade</b></u></button> to get unlimited access</p>
            </div>
        </div>
    )
}
