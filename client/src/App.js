import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import List from "./pages/list/userList/User";
import Logout from "./pages/logout/Logout";
import Skill from "./pages/list/skill/Skill";
import PostJobs from "./pages/list/postJob/PostJob";
import Profile from "./pages/list/profile/Profile";
import Conversation from "./pages/list/conversation/Conversation";
import Single from "./pages/single/Single";
// import New from "./pages/new/New";
import ViewJob from "./components/datatable/jobs/viewJob/ViewJob"
import EditJob from "./components/datatable/jobs/editJob/EditJob"
// import MainJob from "./components/datatable/jobs/mainJob/MainJob";
import PostJob from "./components/datatable/jobs/postJob/PostJobs";
import AddSkill from "./components/datatable/skills/addSkill/AddSkill";
import EditSkill from "./components/datatable/skills/editSkill/EditSkill";
import ViewSkill from "./components/datatable/skills/viewSkill/ViewSkill";
import AddUser from "./components/datatable/users/addUser/AddUser";

import ViewProfile from "./components/datatable/profiles/viewProfile/ViewProfile";
// import { productInputs, userInputs, postJobInputs, editJobInputs, ViewJob } from "./formSource"; // Assuming you have these imports correctly defined

// import {  postJobInputs } from "./formSource"; // Assuming you have these imports correctly defined
import "./style/dark.scss";
import { DarkModeContext } from "./context/darkModeContext";
import EditUser from "./components/datatable/users/editUser/EditUser";
import EditProfile from "./components/datatable/profiles/editProfile/EditProfile";
//import FindJob from "./components/datatable/jobs/findJob/FindJob";
import FindJobs from "./components/datatable/jobs/findJob/findJobWidget/FindJobs";
import ViewJob2 from "./components/datatable/jobs/findJob/viewJobDetail/ViewJob";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="home" element={<Home />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route
                path="addUser"
                element={<AddUser title="Add New User" />}
              />
              <Route
               path={`editUser/:id`}
                element={<EditUser title="Update User" />}
              />
            </Route>
            <Route path="profiles">
              <Route index element={<Profile />} />
              {/* <Route path=":userId" element={<ViewProfile />} /> */}
              <Route
               path={`viewProfile/:id`}
                element={<ViewProfile />}
              />
              <Route
               path={`editProfile/:id`}
                element={<EditProfile title1="Update Profile" />}
              />
            </Route>
            <Route path="dashboard">
              <Route index element={<Home />} />
            </Route>
            <Route path="skills">
              <Route index element={<Skill />} />
              {/* <Route path=":userId" element={<Single />} /> */}
              <Route
                path="addSkill"
                element={<AddSkill title="Add New Skill" />}
              />
              <Route
                path="viewSkill:id"
                element={<ViewSkill title="View Skill" />}
              />
               <Route
                path="editSkill:id"
                element={<EditSkill title="Edit Skill" />}
              />
            </Route>
            <Route path="conversations">
              <Route index element={<Conversation />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                // element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
            <Route path="jobs">
              <Route index element={<PostJobs />} />
              <Route
                path="editJob/:id"
                element={<EditJob  />}
              />
              <Route
                path="postJob"
                element={<PostJob title1="Add New Job" />}
              />
              <Route
                path="viewJob/:job.id"
                element={<ViewJob  />}
              />
            </Route>
            <Route path="findJobs">
              <Route index element={<FindJobs />} />
             <Route
                path="viewJobById/:id"
                element={<ViewJob2  />}
              />
              {/*  <Route
                path="postJob"
                element={<PostJob inputs={postJobInputs} title1="Add New Job" />}
              /> */}
              
            </Route>
            <Route path="your-network">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                // element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
            <Route path="reports">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                // element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
            <Route path="apps-and-offers">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                // element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
            <Route path="/">
              <Route index element={<Logout />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
