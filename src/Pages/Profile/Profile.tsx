import style from "./Profile.module.css"
import Tabs from "./Components/Tabs";

export default function Profile() {

  return (
    <>
      <div className={style.container}>
        <div className={style.content}>
            <div className={style.account}>Account Settings</div>
          <Tabs />
        </div>
      </div>
    </>
  )
}