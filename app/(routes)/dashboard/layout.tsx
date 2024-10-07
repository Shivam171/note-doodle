"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { useRouter } from "next/navigation";
import SideNav from "@/app/_components/Sidebar/SideNav";
import { FileListContext } from "@/app/_context/FileListContext";
export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const convex = useConvex();
    const { user }: any = useKindeBrowserClient();
    const [fileList_, setFileList_] = useState([]);

    useEffect(() => {
        user && checkTeam();
    }, [user])

    const checkTeam = async () => {
        const result = await convex.query(api.teams.getTeam, {
            email: user?.email,
        })

        if (!result?.length) {
            router.push('/teams/create')
        }
    }

    return (
        <div className="flex flex-col h-screen">
            <FileListContext.Provider value={{ fileList_, setFileList_ }}>
                <div className="flex">
                    <div className="h-screen w-64 fixed">
                        <SideNav />
                    </div>
                    <div className="grow ml-64">
                        {children}
                    </div>
                </div>
            </FileListContext.Provider>
        </div>
    )
}
