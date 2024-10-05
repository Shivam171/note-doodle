import { Button } from "@/components/ui/button"
import Image from "next/image"
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function Hero() {
    return (
        <div className="max-w-7xl flex flex-col justify-center mx-auto h-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4 lg:gap-2 px-8 py-12">
                <div className="flex flex-col sm:items-center lg:items-start gap-4">
                    <h1 className="text-[53px] leading-[1.2] md:text-[76px] font-extrabold md:leading-[1.0]">Write. Plan.<br />Collaborate.</h1>
                    <p className="text-[24px]">Deliver accurate, consistent designs faster</p>
                    <div className="flex gap-4">
                        <LoginLink postLoginRedirectURL="/dashboard">
                            <Button type="button" variant="default">Get Started</Button>
                        </LoginLink>
                        <Button type="button" variant="outline">Learn More</Button>
                    </div>
                    <div className="mt-3 flex flex-col gap-1 sm:items-center lg:items-start">
                        <h2 className="text-gray-500">Trusted by teams at</h2>
                        <div className="flex flex-wrap  gap-y-8 gap-x-4 sm:gap-x-10">
                            <Image src="/companies/affirm.svg" alt="affirm" loading="lazy" width={100} height={100} />
                            <Image src="/companies/toyota.svg" alt="toyota" loading="lazy" width={100} height={100} />
                            <Image src="/companies/discord.svg" alt="discord" loading="lazy" width={100} height={100} />
                            <Image src="/companies/figma.svg" alt="figma" loading="lazy" width={100} height={100} />
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <Image
                        src="/hero-illustration.gif"
                        alt="hero illustration"
                        loading="lazy"
                        width={600}
                        height={600}
                        className="w-[600px] lg:w-full pointer-events-none outline-none"
                    />
                </div>
            </div>
        </div>
    )
}
