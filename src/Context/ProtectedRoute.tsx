import { Navigate, Outlet } from 'react-router-dom';
import Header from '../Components/Header/header';
import { useState } from 'react';
import SideBar from '../Components/SideBar/sidebar';

const PrivateRoute = () => {

  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
};
  const isAuthenticated = !!localStorage.getItem("access_token");

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header isOpen={isOpen}/>
      <div style={{display:'flex'}}>
      <SideBar isOpen={isOpen} toggleSidebar={toggleSidebar}/>
      <Outlet />
      </div>
    
    </>
  );
};

export default PrivateRoute;