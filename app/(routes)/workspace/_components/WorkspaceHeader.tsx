import Image from "next/image"
import { Link, Save, Dot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function WorkspaceHeader({ onSave, fileId, selectedView, setSelectedView }: any) {
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
                <div className="flex place-items-start gap-2">
                    <Image src="/favicon.png" alt="logo" width={30} height={30} />
                    <div className="flex flex-col">
                        <span className="text-xl font-bold">Note Doodle</span>
                        <div className="text-sm"><span className="hover:underline cursor-pointer" onClick={() => router.push('/dashboard')}>Dashboard</span> / <b>{fileName}</b></div>
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <Button
                        type="button"
                        variant="outline"
                        className={`bg-gray-50 ${selectedView === "notes" ? "bg-black text-white" : ""}`}
                        onClick={() => setSelectedView("notes")}
                    >
                        Notes
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        className={`bg-gray-50 ${selectedView === "both" ? "bg-black text-white" : ""}`}
                        onClick={() => setSelectedView("both")}
                    >
                        Both
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        className={`bg-gray-50 ${selectedView === "canvas" ? "bg-black text-white" : ""}`}
                        onClick={() => setSelectedView("canvas")}
                    >
                        Canvas
                    </Button>
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
