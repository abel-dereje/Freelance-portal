import React, { useState } from 'react';

const LogoutButton = () => {
  const [logoutMessage, setLogoutMessage] = useState('');

  const handleLogout = async () => {
    try {
      const response = await fetch('/logout', {
        method: 'POST',
        // headers: {
        //   'Authorization': `Bearer ${getToken()}`, // Assuming you have a function to get the token
        //   'Content-Type': 'application/json'
        // }
      });
      if (response.ok) {
        setLogoutMessage('Logout successful');
        // Perform any additional actions after successful logout, such as redirecting to a login page
      } else {
        const data = await response.json();
        setLogoutMessage(data.message); // Assuming the API returns a message on failure
      }
    } catch (error) {
      console.error('Error logging out:', error);
      setLogoutMessage('Error logging out');
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <p>{logoutMessage}</p>
    </div>
  );
};

export default LogoutButton;
