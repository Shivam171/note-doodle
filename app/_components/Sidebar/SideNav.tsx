import SideNavTopSection, { TEAM } from "./SideNavTopSection"
import SideNavBottomSection from "./SideNavBottomSection"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function SideNav() {
    const convex = useConvex();
    const { user }: any = useKindeBrowserClient();
    const createFile = useMutation(api.files.createFile);
    const [activeTeam, setActiveTeam] = useState<TEAM>();
    const [totalFiles, setTotalFiles] = useState<Number>();

    const onFileCreate = (fileName: string) => {
        createFile({
            fileName: fileName,
            teamId: activeTeam?._id,
            createdBy: user?.email,
            archive: false,
            document: '',
            whiteboard: ''
        }).then((res) => {
            if (res) {
                toast("File created successfully!");
                getFiles();
            }
        }, (err) => {
            toast("Error while creating file");
        })
    }

    useEffect(() => {
        activeTeam && getFiles();
    }, [activeTeam])

    const getFiles = async () => {
        const result = await convex.query(api.files.getFiles, {
            teamId: activeTeam?._id
        });
        setTotalFiles(result?.length);
    }

    return (
        <div className="bg-gray-50 flex flex-col h-screen fixed w-64 border-r p-4">
            <div className="flex-1">
                <SideNavTopSection user={user} setActiveTeamInfo={(activeTeam: TEAM) => setActiveTeam(activeTeam)} />
            </div>
            <SideNavBottomSection onFileCreate={onFileCreate} totalFiles={totalFiles} />
        </div>
    )
}
