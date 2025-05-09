import AppSidebar from "@/components/sidebar";
import { getIsMobile } from "@/lib/server-utils";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const isMobile = await getIsMobile();

    return (
        <div className="container flex h-screen">
            {!isMobile ?
                <div className="w-fit">
                    <AppSidebar />
                </div> :
                <div className="z-5 fixed bottom-0 w-full h-20 container">
                    {/* <BottomBar user={user} /> */}
                </div>
            }
            <div className="overflow-y-auto w-full border-x-1 border-x-current/20">
                {children}
                <div className="h-30"></div>
            </div>
        </div>
    );
}
