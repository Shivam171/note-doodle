import { useState, useEffect } from 'react'
import { Github, Archive, FilePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
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
import Constant from '@/app/_constant/Constant'
import Pricing from '../Pricing'

export default function Bottom({ onFileCreate, totalFiles }: any) {
    const [fileInput, setFileInput] = useState("")
    const [showPricingDialog, setShowPricingDialog] = useState(false);

    const menuList = [
        {
            id: 1,
            name: "Github",
            path: Constant.GITHUB_REPO,
            icon: Github
        },
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
                <Dialog open={showPricingDialog} onOpenChange={setShowPricingDialog}>
                    <DialogTrigger asChild>
                        <Button className='mt-2 justify-start gap-1 items-center w-full'>
                            <FilePlus className="w-4 h-4" /> New File
                        </Button>
                    </DialogTrigger>
                    {totalFiles < Constant.MAX_FREE_FILES ? (
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className='text-lg'>Create new file</DialogTitle>
                                <DialogDescription>
                                    <input
                                        type="text"
                                        onChange={(e) => setFileInput(e.target.value)}
                                        placeholder='Enter file name'
                                        className="border border-gray-300 rounded-md p-2 w-full outline-none font-semibold placeholder:font-normal"
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
                    ) : (
                        <DialogContent className='max-w-3xl'>
                            <DialogHeader>
                                <DialogTitle className='text-lg'>Upgrade Plan</DialogTitle>
                                <DialogDescription>
                                    <Pricing />
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    )}
                </Dialog>
                <div className="h-2 w-full bg-gray-50 rounded-full">
                    <div
                        className={`h-2 bg-black rounded-full`}
                        style={{ width: `${(totalFiles / 5) * 100}%` }}
                    >
                    </div>
                </div>
                <h2 className='text-xs'><b>{totalFiles}</b> out of <b>{Constant.MAX_FREE_FILES}</b> files used</h2>
                <p className='text-xs'><button onClick={() => setShowPricingDialog(true)}><u><b>Upgrade</b></u></button> to get unlimited access</p>
            </div>
        </div>
    )
}
