import Image from "next/image"
import { Link, Save, Dot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function WorkspaceHeader({ onSave, fileId }: any) {
    const router = useRouter();
    const convex = useConvex();
    const [fileName, setFileName] = useState('');

    useEffect(() => {
        fileId && getFileData()
    }, [])

    const getFileData = async () => {
        const result = await convex.query(api.files.getFileById, {
            _id: fileId
        })
        setFileName(result?.fileName)
    }

    return (
        <header className="p-4 border-b">
            <div className="container mx-auto flex w-full justify-between items-center">
                <div className="flex place-items-start gap-2 cursor-pointer" onClick={() => router.push('/dashboard')}>
                    <Image src="/favicon.png" alt="logo" width={30} height={30} />
                    <div className="flex flex-col">
                        <span className="text-xl font-bold">Note Doodle</span>
                        <span className="text-sm">File Name: {fileName}</span>
                    </div>
                </div>
                <div className="flex gap-4 items-center">
                    <Button onClick={() => onSave()} type="button" variant="outline" className="bg-gray-50">
                        Save
                        <Save className="ml-2 w-4 h-4" />
                    </Button>
                    <Button type="button">
                        Share
                        <Link className="ml-2 w-4 h-4" />
                    </Button>
                </div>
            </div>
        </header>
    )
}
