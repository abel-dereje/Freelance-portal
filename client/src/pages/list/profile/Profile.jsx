import "./profile.scss"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import Profiles from "../../../components/datatable/profileData/Profiles"

const Profile = () => {
  return (
    <div className="profile">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Profiles/>
      </div>
    </div>
  )
}

export default Profile