import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


// export const userInputs = [
//     {
//       id: 1,
//       label: "Username",
//       type: "text",
//       placeholder: "john_doe",
//     },
//     {
//       id: 2,
//       label: "Name and surname",
//       type: "text",
//       placeholder: "John Doe",
//     },
//     {
//       id: 3,
//       label: "Email",
//       type: "mail",
//       placeholder: "john_doe@gmail.com",
//     },
//     {
//       id: 4,
//       label: "Phone",
//       type: "text",
//       placeholder: "+1 234 567 89",
//     },
//     {
//       id: 5,
//       label: "Password",
//       type: "password",
//     },
//     {
//       id: 6,
//       label: "Address",
//       type: "text",
//       placeholder: "Elton St. 216 NewYork",
//     },
//     {
//       id: 7,
//       label: "Country",
//       type: "text",
//       placeholder: "USA",
//     },
//   ];
  
//   export const productInputs = [
//     {
//       id: 1,
//       label: "Title",
//       type: "text",
//       placeholder: "Apple Macbook Pro",
//     },
//     {
//       id: 2,
//       label: "Description",
//       type: "text",
//       placeholder: "Description",
//     },
//     {
//       id: 3,
//       label: "Category",
//       type: "text",
//       placeholder: "Computers",
//     },
//     {
//       id: 4,
//       label: "Price",
//       type: "text",
//       placeholder: "100",
//     },
//     {
//       id: 5,
//       label: "Stock",
//       type: "text",
//       placeholder: "in stock",
//     },
//   ];
  
//   // The followings
  export const postJobInputs = [
    {
      id: 1,
      label: "Job Title",
      type: "text",
      placeholder: "MERN Stack Developer",
    },
    {
      id: 2,
      label: "Project Skill",
      type: "text",
      placeholder: "List Out Project Skill",
    },
    {
      id: 3,
      label: "Project Scope",
      type: "text",
      placeholder: "Write Project Scope",
    },
    {
      id: 4,
      label: "Project Budget",
      type: "text",
      placeholder: "32$",
    },
  ];

// The followings are edit jobs by ID

  export const EditJobInputs = () => {
    const { id } = useParams();
    const [jobData, setJobData] = useState(null);
    const [inputs, setInputs] = useState([]);
  
    useEffect(() => {
      const fetchJobData = async () => {
        try {
          // const response = await axios.update(`http://localhost:4000/updateJobPost/${id}`);
          const response = await axios.get(`http://localhost:4000/getJobPost/${id}`);
          setJobData(response.data);
          // Assuming the response.data is an array of inputs
          console.log("API response:", response.data);
          if (Array.isArray(response.data)) {
            console.log("API response is an array");
            setInputs(response.data);
          } else {
            console.error('API response is not an array:', response.data);
          }
        } catch (error) {
          console.error('Error fetching job data:', error);
        }
      };
  
      fetchJobData();
    }, [id]);
  
    console.log("Inputs:", inputs);
  
    if (!jobData) return <div>Loading...</div>;
  
    return (
      <div>
        {Array.isArray(inputs) && inputs.map((input) => (
          <div key={input.id}>
            <label htmlFor={`input-${input.id}`}>{input.label}</label>
            <input
              id={`input-${input.id}`}
              type={input.type}
              placeholder={input.placeholder}
            />
          </div>
        ))}
      </div>
    );
  };
  
  
// The followings are view jobs by ID

export const ViewJobInput = () => {
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);
  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getJobPost/${id}`);
        setJobData(response.data);
        // Assuming the response.data is an array of inputs
        console.log("API response:", response.data);
        if (Array.isArray(response.data)) {
          console.log("API response is an array");
          setInputs(response.data);
        } else {
          console.error('API response is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };

    fetchJobData();
  }, [id]);

  console.log("Inputs:", inputs);

  if (!jobData) return <div>Loading...</div>;

  return (
    <div>
      {Array.isArray(inputs) && inputs.map((input) => (
        <div key={input.id}>
          <label htmlFor={`input-${input.id}`}>{input.label}</label>
          <input
            id={`input-${input.id}`}
            type={input.type}
            placeholder={input.placeholder}
          />
        </div>
      ))}
    </div>
  );
};
