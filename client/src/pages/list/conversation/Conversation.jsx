import React from 'react'
import "./conversation.scss"
import Sidebar from '../../../components/sidebar/Sidebar'
import Navbar from '../../../components/navbar/Navbar'
import Conversations from '../../../components/datatable/conversationData/Conversations';

const Conversation = () => {
  return (
    <div className="skill">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Conversations/>
      </div>
    </div>
  )
}

export default Conversation
