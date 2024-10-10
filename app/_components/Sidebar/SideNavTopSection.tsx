import Image from "next/image"
import { ChevronDown, UsersRoundIcon, UserPen, Settings, LogOut, LayoutGrid } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs"
import { Button } from "@/components/ui/button"
import { useConvex } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Pricing from "../Pricing"
import Constant from "@/app/_constant/Constant"

export interface TEAM {
    createdBy: String,
    teamName: String,
    _id: String,
}

export default function SideNavTopSection({ user, setActiveTeamInfo }: any) {

    const menu = [
        {
            id: 1,
            name: "Create Team",
            path: '/teams/create',
            icon: UserPen,
            isCreateTeam: true
        },
        {
            id: 2,
            name: 'Settings',
            path: '/settings',
            icon: Settings,
            isCreateTeam: false
        }
    ]

    // Function to handle team creation logic
    const handleCreateTeam = () => {
        if (teamList && teamList.length >= Constant.MAX_FREE_TEAMS) {
            setShowPricingDialog(true);
        } else {
            router.push('/teams/create');
        }
    };

    const onMenuClick = (path: string, isCreateTeam: boolean = false) => {
        if (isCreateTeam) {
            handleCreateTeam();
        } else {
            router.push(path);
        }
    };

    const router = useRouter();
    const convex = useConvex();
    const [teamList, setTeamList] = useState<TEAM[]>();
    const [activeTeam, setActiveTeam] = useState<TEAM>();
    const [showPricingDialog, setShowPricingDialog] = useState(false);

    useEffect(() => {
        user && getTeamsList();
    }, [user])

    useEffect(() => {
        activeTeam && setActiveTeamInfo(activeTeam);
    }, [activeTeam])

    const getTeamsList = async () => {
        const result = await convex.query(api.teams.getTeam, {
            email: user?.email
        });
        setTeamList(result);
        setActiveTeam(result[0]);
    }


    return (
        <>
            <div className="flex flex-col gap-1">
                {/* Header Section */}
                <div className="flex space-x-2 items-center">
                    <Image loading="lazy" src="/favicon.png" alt="Note Doodle" width={20} height={20} className="drop-shadow-sm object-cover" />
                    <h1 className="font-bold text-xl">Note Doodle</h1>
                </div>
                {/* Team Section */}
                <div className="flex flex-col w-full">
                    <Popover>
                        <PopoverTrigger asChild>
                            <div className="text-sm flex gap-2 items-center cursor-pointer rounded-md py-2 px-3 bg-gray-200 hover:bg-gray-300 hover:transition-colors">
                                <UsersRoundIcon className="w-4 h-4" />
                                <div className="flex w-full items-center justify-between gap-1">
                                    <span className="line-clamp-1 max-w-full overflow-hidden">{activeTeam?.teamName}</span>
                                    <ChevronDown className="w-4 h-4" />
                                </div>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="max-w-[200px] p-2">
                            <h2 className="text-sm mb-1">Created Teams</h2>
                            {/* Team Section */}
                            <div className="flex flex-col gap-1">
                                {teamList?.map((team, index) => (
                                    <h2
                                        key={index}
                                        className={`${activeTeam?._id === team._id && 'bg-gray-300'} flex text-sm items-center gap-1 cursor-pointer p-1 rounded-sm hover:bg-gray-200 hover:transition-colors`}
                                        onClick={() => setActiveTeam(team)}
                                    >
                                        <UsersRoundIcon className="w-3 h-3" />
                                        <span className="line-clamp-1 max-w-full">{team.teamName}</span>
                                    </h2>
                                ))}
                            </div>
                            <Separator className="my-2" />
                            <h2 className="text-sm mb-1">Menu</h2>
                            {/* Menu Options Section */}
                            {menu.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => onMenuClick(item.path, item.isCreateTeam)}
                                    className="flex text-sm items-center gap-1 cursor-pointer p-1 rounded-sm hover:bg-gray-200 hover:transition-colors"
                                >
                                    {item.icon && <item.icon className="w-3 h-3" />}
                                    {item.name}
                                </div>
                            ))}
                            <LogoutLink>
                                <h2 className="flex text-sm items-center gap-1 cursor-pointer p-1 rounded-sm hover:bg-gray-200 hover:transition-colors">
                                    <LogOut className="w-3 h-3" />
                                    Logout
                                </h2>
                            </LogoutLink>
                            <Separator className="my-2" />
                            {/* User Info Section */}
                            <div className="flex items-center gap-2 p-1">
                                <Image src={user?.picture} alt="user profile" width={30} height={30} className="rounded-full object-cover" />
                                <div className="flex flex-col">
                                    <h2 className="text-sm font-semibold">{user?.given_name}{" "}{user?.family_name}</h2>
                                    <p className="text-xs text-gray-600">{user?.email}</p>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                {/* All Files Button */}
                <Button className="mt-2 w-full flex justify-start items-center gap-1">
                    <LayoutGrid className="w-4 h-4" />
                    <span>All Files</span>
                </Button>
            </div>
            <Dialog open={showPricingDialog} onOpenChange={setShowPricingDialog}>
                <DialogContent className='max-w-3xl'>
                    <DialogHeader>
                        <DialogTitle className='text-lg'>Upgrade Plan</DialogTitle>
                        <DialogDescription>
                            <Pricing />
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}
