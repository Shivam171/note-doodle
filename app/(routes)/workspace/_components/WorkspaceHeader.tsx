import Image from "next/image"
import { Link, Save, Dot } from "lucide-react"
import { Button } from "@/components/ui/button"
export default function WorkspaceHeader({ onSave }: any) {
    return (
        <header className="p-4 border-b">
            <div className="container mx-auto flex w-full justify-between items-center">
                <div className="flex place-items-start gap-2">
                    <Image src="/favicon.png" alt="logo" width={30} height={30} />
                    <div className="flex flex-col">
                        <span className="text-xl font-bold">Note Doodle</span>
                        <span className="text-sm">File Name</span>
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
