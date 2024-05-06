// import "./new.scss";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
// import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
// import { useState, useEffect } from "react";
// import axios from 'axios';

// const New = ({ title }) => {
//   const [file, setFile] = useState("");
//   const [formData, setFormData] = useState({
//     jobTitle: '',
//     projectTitle: '',
//     projectSkill: '',
//     projectScope: '',
//     projectBudget: ''
//   });
//   const [id, setId] = useState(""); // Assuming you get the id from somewhere

//   useEffect(() => {
//     fetchData();
//   }, [id]); // Fetch data when the id changes

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`http://localhost:4000/getJobPost/${id}`);
//       const { jobTitle } = response.data;
//       setFormData({ jobTitle });
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         console.error('Unauthorized access. Please log in.');
//       } else {
//         console.error("Error fetching data from API:", error);
//       }
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Handle form submission here
//   };

//   return (
//     <div className="new">
//       <Sidebar />
//       <div className="newContainer">
//         <Navbar />
//         <div className="top">
//           <h1>{title}</h1>
//         </div>
//         <div className="bottom">
//           <div className="left">
//             <img
//               src={
//                 file
//                   ? URL.createObjectURL(file)
//                   : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
//               }
//               alt=""
//             />
//           </div>
//           <div className="right">
//             <form onSubmit={handleSubmit}>
//               <div className="formInput">
//                 <label htmlFor="file">
//                   Image: <DriveFolderUploadOutlinedIcon className="icon" />
//                 </label>
//                 <input
//                   type="file"
//                   id="file"
//                   onChange={(e) => setFile(e.target.files[0])}
//                   style={{ display: "none" }}
//                 />
//               </div>

//               <div className="formInput">
//                 <label htmlFor="jobTitle">Job Title</label>
//                 <input
//                   type="text"
//                   id="jobTitle"
//                   name="jobTitle"
//                   value={formData.jobTitle}
//                   onChange={handleInputChange}
//                   placeholder="Enter job title"
//                 />
//               </div>
//               <div className="formInput">
//                 <label htmlFor="projectTitle">Project Title</label>
//                 <input
                  
//                   value={formData.projectTitle}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               {/* <div className="formInput">
//                 <label htmlFor="projectSkill">Project Skill</label>
//                 <input
//                   type="text"
//                   id="projectSkill"
//                   name="projectSkill"
//                   value={formData.projectSkill}
//                   onChange={handleInputChange}
//                   placeholder="Enter project skill"
//                 />
//               </div>
//               <div className="formInput">
//                 <label htmlFor="projectScope">Project Scope</label>
//                 <input
//                   type="text"
//                   id="projectScope"
//                   name="projectScope"
//                   value={formData.projectScope}
//                   onChange={handleInputChange}
//                   placeholder="Enter project scope"
//                 />
//               </div>
//               <div className="formInput">
//                 <label htmlFor="projectBudget">Project Budget</label>
//                 <input
//                   type="text"
//                   id="projectBudget"
//                   name="projectBudget"
//                   value={formData.projectBudget}
//                   onChange={handleInputChange}
//                   placeholder="Enter project budget"
//                 />
//               </div> */}

//               <button type="submit">Send</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default New;
// /* 

// import "./new.scss";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
// import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
// import { useState } from "react";
// const New = ({ inputs, title }) => {
//   const [file, setFile] = useState("");
//   return (
//     <div className="new">
//       <Sidebar />
//       <div className="newContainer">
//         <Navbar />
//         <div className="top">
//           <h1>{title}</h1>
//         </div>
//         <div className="bottom">
//           <div className="left">
//             <img
//               src={
//                 file
//                   ? URL.createObjectURL(file)
//                   : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
//               }
//               alt=""
//             />
//           </div>
//           <div className="right">
//             <form>
//               <div className="formInput">
//                 <label htmlFor="file">
//                   Image: <DriveFolderUploadOutlinedIcon className="icon" />
//                 </label>
//                 <input
//                   type="file"
//                   id="file"
//                   onChange={(e) => setFile(e.target.files[0])}
//                   style={{ display: "none" }}
//                 />
//               </div>
//               {inputs.map((input) => (
//                 <div className="formInput" key={input.id}>
//                   <label>{input.label}</label>
//                   <input type={input.type} placeholder={input.placeholder} />
//                 </div>
//               ))}
//               <button>Send</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default New;


// */