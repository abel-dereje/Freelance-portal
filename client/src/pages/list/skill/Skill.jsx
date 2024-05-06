import "./skill.scss"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import Skills from "../../../components/datatable/skills/Skills"

const Skill = () => {
  return (
    <div className="skill">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Skills/>
      </div>
    </div>
  )
}

export default Skill