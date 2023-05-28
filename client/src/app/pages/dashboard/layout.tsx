import Background from "@/components/layout/Background";

import Purple from "@blob/purple.svg";


export default function DashboardLayout({children}: {children: React.ReactNode}) {
    return(
        <Background className={"h-screen flex"}>
            {children}
        </Background>
    )
}