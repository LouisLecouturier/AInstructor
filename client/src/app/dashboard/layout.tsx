import DashboardNavigation from "@components/Dashboard/Common/Layout/Navigation";
import Background from "@components/Layout/Background";

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
          innerClassName={"p-8 overflow-y-scroll"}
          rounded
        >
          {children}
        </Background>
      </div>
    </div>
  );
}
