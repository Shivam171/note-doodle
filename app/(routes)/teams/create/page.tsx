"use client";
import Image from "next/image"
import { Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { useConvex, useMutation } from "convex/react";
import { toast } from "sonner"


export default function TeamCreate() {
    const router = useRouter();
    const convex = useConvex();
    const { user }: any = useKindeBrowserClient();
    const createTeam = useMutation(api.teams.createTeam);

    const [teamExists, setTeamExists] = useState(false);
    const [teamName, setTeamName] = useState("");

    useEffect(() => {
        user && checkTeam();
    }, [user])

    const checkTeam = async () => {
        const result = await convex.query(api.teams.getTeam, {
            email: user?.email,
        })

        // Update state based on whether a team exists
        setTeamExists(result?.length > 0);
    }
    const handleCancel = () => {
        router.push('/dashboard');
    }

    const createNewTeam = async () => {
        if (teamName.trim().length < 3) {
            toast("Team name must be at least 3 characters long.");
            return;
        } else if (/\d/.test(teamName)) {
            toast("Team name cannot contain numbers.");
            return;
        }

        const result = await createTeam({
            teamName: teamName,
            createdBy: user?.email,
        })

        toast("Team created successfully!")
        router.push('/dashboard');
    }

    return (
        <section className="flex flex-col h-screen">
            <header className="p-4 border-b">
                <div className="flex items-center gap-2">
                    <Image src="/favicon.png" alt="logo" width={40} height={40} />
                    <span className="text-2xl font-bold">Note Doodle</span>
                </div>
            </header>
            <div className="flex flex-col-reverse lg:flex-row gap-2 lg:gap-8 items-center justify-center h-full">
                <div className="flex justify-center h-auto">
                    <Image
                        src="/teams.webp"
                        alt="teams"
                        width={500}
                        height={500}
                        className="w-[400px] xl:w-[550px] object-cover"
                    />
                </div>
                <div className="flex flex-col items-center h-auto">
                    <div className="flex items-center gap-1 bg-slate-100 w-fit rounded-full px-2 py-1 mb-4">
                        <Users className="w-4 h-4" />
                        <span>Team Name</span>
                    </div>
                    <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-2">What should we call your teams?</h1>
                    <p className="text-gray-500 mb-4 text-[14px]">You can anytime change this later from the settings</p>
                    <div className="w-full flex flex-col mb-8">
                        <label htmlFor="team-name" className="text-gray-500 mb-2 text-sm">
                            Team Name
                        </label>
                        <input value={teamName} onChange={(e) => setTeamName(e.target.value)} type="text" name="team-name" id="team-name" className="border border-gray-300 rounded-md p-2 w-full outline-none" placeholder="My awesome team" />
                    </div>
                    <div className="flex gap-4">
                        {teamExists && (
                            <Button variant="outline" className="mb-4" onClick={handleCancel}>
                                Cancel
                            </Button>
                        )}
                        <Button onClick={() => createNewTeam()} variant="default" className="mb-4" disabled={teamName.trim().length === 0}>Create Team</Button>
                    </div>
                    <p className="text-gray-500 text-sm">1 of <span className="font-bold text-black">2</span></p>
                </div>
            </div>
        </section>
    )
}
