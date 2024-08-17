import style from "./style/Profile.module.css";
import Tabs from "./Components/Tabs";

export default function Profile() {
  return (
    <>
      <div className={style.container}>
        <div className={style.content}>
          <Tabs />
        </div>
      </div>
    </>
  );
}
