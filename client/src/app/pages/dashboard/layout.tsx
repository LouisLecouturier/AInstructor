import Background from "@/components/layout/Background";

export default function DashboardLayout({children}: {children: React.ReactNode}) {
    return(
        <Background className={"h-screen flex"}>
            {children}
        </Background>
    )
}