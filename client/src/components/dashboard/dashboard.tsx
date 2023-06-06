import DashboardMenu from "../../components/menu/dashboardmenu"
import Homeworks from "./sections/homeworks"

export default function Dashboard() {
    return (
        <div className="flex w-full h-full bg-dark-200">
            <DashboardMenu />
            <Homeworks/>
        </div>
    )
}