import SideNavTopSection, { TEAM } from "./SideNavTopSection"
import SideNavBottomSection from "./SideNavBottomSection"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";

export default function SideNav() {
    const { user }: any = useKindeBrowserClient();
    const createFile = useMutation(api.files.createFile);
    const [activeTeam, setActiveTeam] = useState<TEAM>();

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
            }
        }, (err) => {
            toast("Error while creating file");
        })
    }

    return (
        <div className="bg-gray-50 flex flex-col h-screen fixed w-64 border-r p-4">
            <div className="flex-1">
                <SideNavTopSection user={user} setActiveTeamInfo={(activeTeam: TEAM) => setActiveTeam(activeTeam)} />
            </div>
            <SideNavBottomSection onFileCreate={onFileCreate} />
        </div>
    )
}
