import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import Header from '../Components/Header/header';
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
      <main style={{backgroundColor:"#f0f5ff", width:"100%"}}>
          <Outlet/>
      </main>
      </div>
    
    </>
  );
};

export default PrivateRoute;