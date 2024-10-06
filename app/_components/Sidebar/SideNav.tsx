import SideNavTopSection from "./SideNavTopSection"
import SideNavBottomSection from "./SideNavBottomSection"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"

export default function SideNav() {
    const { user }: any = useKindeBrowserClient();
    return (
        <div className="bg-gray-50 flex flex-col h-screen fixed w-64 border-r p-4">
            <div className="flex-1">
                <SideNavTopSection user={user} />
            </div>
            <SideNavBottomSection />
        </div>
    )
}
