"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect } from "react";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { useRouter } from "next/navigation";
import SideNav from "@/app/_components/Sidebar/SideNav";
export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const convex = useConvex();
    const { user }: any = useKindeBrowserClient();

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
            <div className="grid grid-cols-4">
                <div className="">
                    <SideNav />
                </div>
                <div className="grid-cols-3">
                    {children}
                </div>
            </div>
        </div>
    )
}
