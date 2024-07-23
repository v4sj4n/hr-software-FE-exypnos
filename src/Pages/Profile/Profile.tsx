import style from "./Profile.module.css"
import Tabs from "./Components/Tabs";
// import Header from "../../Components/Header/header";
import SideBar from "../../Components/SideBar/sidebar";
import { useState } from "react";

export default function Profile() {

  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
};

  return (
    <>
      {/* <Header isOpen={isOpen}/> */}
      <div className={style.container}>
        <SideBar isOpen={isOpen} toggleSidebar={toggleSidebar}/>
        <div className={style.content}>
            <div className={style.account}>Account Settings</div>
          <Tabs />
        </div>
      </div>
    </>
  )
}