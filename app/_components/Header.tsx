import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function Header() {
    return (
        <header className="p-4 border-b">
            <div className="container mx-auto flex w-full justify-between items-center">
                <div className="flex items-center gap-2">
                    <Image src="/favicon.png" alt="logo" width={40} height={40} />
                    <span className="text-2xl font-bold">Note Doodle</span>
                </div>
                <div className="flex gap-2 items-center">
                    <RegisterLink>
                        <Button type="button">Register</Button>
                    </RegisterLink>
                </div>
            </div>
        </header>
    )
}
