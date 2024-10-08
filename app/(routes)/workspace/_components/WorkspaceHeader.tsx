import Image from "next/image"
import { Link } from "lucide-react"
import { Button } from "@/components/ui/button"
export default function WorkspaceHeader() {
    return (
        <header className="p-4 border-b">
            <div className="container mx-auto flex w-full justify-between items-center">
                <div className="flex items-center gap-2">
                    <Image src="/favicon.png" alt="logo" width={30} height={30} />
                    <span className="text-2xl font-bold">Note Doodle</span>
                </div>
                <div className="flex gap-2 items-center">
                    <span className="text-md font-semibold">File Name</span>
                    <Button type="button">
                        Share
                        <Link className="ml-2 w-4 h-4" />
                    </Button>
                </div>
            </div>
        </header>
    )
}
