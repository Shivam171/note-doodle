import { useContext, useEffect, useState } from 'react'
import { FileListContext } from "@/app/_context/FileListContext";
import moment from "moment";
import Image from 'next/image'
import { MoreHorizontal, User, Trash, Archive, } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation';

export interface FILE {
    archive: boolean,
    createdBy: string,
    document: string,
    fileName: string,
    _id: string,
    teamId: string,
    updatedAt: string,
    whiteboard: string,
    _creationTime: number
}

export default function FileList({ user }: any) {
    const { fileList_, setFileList_ } = useContext(FileListContext);
    const [fileList, setFileList] = useState<any>();
    const router = useRouter();

    useEffect(() => {
        fileList_ && setFileList(fileList_);
    }, [fileList_])

    return (
        <div className='mt-10'>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">File Name</td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Created At</td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Edited</td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Author</td>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {fileList && fileList?.map((file: FILE, index: number) => (
                            <tr className="odd:bg-gray-50 hover:bg-gray-200 cursor-pointer transition-colors" key={index} onClick={() => router.push(`/workspace/` + file?._id)}>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{file?.fileName}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{moment(file?._creationTime).format("DD/MM/YYYY")}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{moment(file?.updatedAt).format("DD/MM/YYYY")}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                    <Image src={user?.picture} alt="user" width={30} height={30} className='rounded-full' />
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild className='cursor-pointer'>
                                            <MoreHorizontal className='w-5 h-5' />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem className='cursor-pointer'>
                                                    <Archive className='mr-2 w-5 h-5' />
                                                    <span>Archive</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
