import SignUp from "./Components/SignUp";
import style from "./Profile.module.css"


export default function Profile() {
  return (
    <div className={style.container}>
      <div style={{display:'flex', flexDirection:"column"}}>
      <div style={{ color: "#000000", fontSize: "18px", marginBottom:"10px", marginTop:"10px" }}>Account Settings</div>
      <SignUp/>
      </div>
    </div>
  )
}
