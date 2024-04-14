import "./dashboard.scss"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import Dashboards from "../../../components/datatable/dashboardData/Dashboard"

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Dashboards/>
      </div>
    </div>
  )
}

export default Dashboard