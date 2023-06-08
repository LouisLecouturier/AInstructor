import Background from "@components/layout/Background";

import DashboardNavigation from "@components/dashboard/Navigation";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <div className={"flex gap-4 p-4 h-screen "}>
      <DashboardNavigation />
      <div className={"flex-1"}>
        <Background
          className={"h-full w-full flex-1"}
          innerClassName={"px-8 pb-8 pt-12 overflow-y-scroll"}
          rounded
        >
          {children}
        </Background>
      </div>
    </div>
  );
}
