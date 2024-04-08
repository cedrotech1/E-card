import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // This effect runs once when the component mounts
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Navigate to the login page
    navigate('/login');
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <>
      Logout
    </>
  );
};

export default Logout;
