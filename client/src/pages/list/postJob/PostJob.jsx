import "./postJob.scss"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import PostJobs from "../../../components/datatable/jobs/mainJob/MainJob"

const PostJob = () => {
  return (
    <div className="postJob">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <PostJobs/>
      </div>
    </div>
  )
}

export default PostJob