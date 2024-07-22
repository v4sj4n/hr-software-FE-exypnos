import style from "./Profile.module.css"
import Tabs from "./Components/Tabs";
import Header from "../../Components/header";
import SideBar from "../../Components/sidebar";

export default function Profile() {
  return (
    <>   
      <Header />
      <div className={style.container}>
        <SideBar />
        <div className={style.content}>
          <div className={style.formContainer}>
          <div className={style.account}>Account Settings</div>
            <Tabs />
          </div>
        </div>
      </div>
    </>
  )
}