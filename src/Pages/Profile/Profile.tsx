import style from "./Profile.module.css"
import Tabs from "./Components/Tabs";
import Header from "../../Components/Header/header";
import SideBar from "../../Components/SideBar/sidebar";
import Button from "../../Components/Button/Button";
import { ButtonTypes } from "../../Components/Button/ButtonTypes";
import { useAuth } from "../../Context/AuthProvider";
import { useNavigate } from "react-router-dom";


export default function Profile() {
  const { logout } = useAuth();
  const  navigate  = useNavigate(); 

      const handleLogOut = () => {
        logout();  
        navigate("/"); 
    };
  return (
    <>
      <Header />
      <div className={style.container}>
        <SideBar />
        <div className={style.content}>
          <div style={{display:'flex', justifyContent:"space-between"}}>
            <div className={style.account}>Account Settings</div>
            <Button onClick={handleLogOut} type={ButtonTypes.SECONDARY} btnText="Logout" />
          </div>

          <Tabs />
        </div>
      </div>
    </>
  )
}