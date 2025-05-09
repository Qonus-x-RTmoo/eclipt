import { LogIn } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";


export default async function AppSidebar() {
    const data = {

        nav: [
            {
                icon: LogIn,
                title: "login",
                url: "/login",
            },
        ],
    }

    const t = await getTranslations("Sidebar");
    return (
        <div className="size-full flex flex-col justify-between border-r-1 border-r-current/10 px-4 md:px-5 py-5">
            <div className="items-center md:items-start flex flex-col gap-3">
                {/* <ThemeSwitcher /> */}
                <TooltipProvider>
                    {data.nav.map((item) => (
                        <Tooltip key={item.title} delayDuration={0}>
                            <TooltipTrigger asChild>
                                <button className="button ghost text-lg">
                                    <Link href={item.url} className="flex gap-2">
                                        {item.icon && <item.icon className="size-7" />}
                                        <span className="hidden md:block">{t(item.title)}</span>
                                    </Link>
                                </button>
                            </TooltipTrigger>
                            <TooltipContent
                                side="right"
                                align="center"
                                sideOffset={10}
                                className="md:hidden"
                            >
                                <p className="block">{t(item.title)}</p>
                            </TooltipContent>
                        </Tooltip>
                    ))}
                    {/* <PostButton /> */}
                </TooltipProvider>
            </div>
        </div>
    )
}
