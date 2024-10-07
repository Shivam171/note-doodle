"use client"
import { Button } from "@/components/ui/button"
import { LogoutLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";
import DashboardHeader from "@/app/_components/DashboardHeader";
import FileList from "@/app/_components/FileList";

export default function Dashboard() {
    const { user }: any = useKindeBrowserClient();
    const convex = useConvex();
    const createUser = useMutation(api.user.createUser)

    useEffect(() => {
        if (user) {
            checkUser();
        }
    }, [user])

    const checkUser = async () => {
        const result = await convex.query(api.user.getUser, {
            email: user?.email
        })
        if (!result?.length) {
            createUser({
                name: user.given_name,
                email: user.email,
                image: user.picture
            }).then((res) => console.log(res))
        }
    }

    return (
        <div className="flex flex-col h-screen w-full p-4">
            <DashboardHeader user={user} />
            <FileList user={user} />
        </div>
    )
}
