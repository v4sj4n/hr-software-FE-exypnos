import { Avatar } from "@mui/material";
import Card from "../../../Ui/Crad/Crard";
import Input from "../../../Components/input";
import { ButtonTypes } from "../../../Ui/Button/ButtonTypes";
import Button from "../../../Ui/Button/Button";
import style from "../Profile.module.css"
// import { useState } from "react";



const SignUp = () => {

    // const [activeTab, setActiveTab] = useState(false);

    return (
        <Card>
             <div className={style.tabs}>
        <button
          
          className={ style.tab}
        >
          My Events
        </button>
        <button
          className={
           style.tab
          }
         
        >
          Participating
        </button>
        <button
          className={
           style.tab
          }
         
        >
          Participating
        </button>
        
      </div>
      <div style={{ border: "0.5px solid #EBEBEB" }}></div>
            
            <div style={{ display: "flex", alignItems: 'center', gap: "20px" }}>
                <Avatar style={{ width: "94px", height: "94px" }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ color: "#000000", fontSize: "18px" }}>Elisabeta Guri</div>
                    <div style={{ color: "#4C556B", fontSize: "16px" }}>Head of Human Resources</div>
                    <div style={{ color: "#4C556B", fontSize: "14px" }}>HR Department</div>
                </div>
            </div>

            <div style={{ border: "0.5px solid #EBEBEB" }}></div>
            <div style={{ color: "#000000", fontSize: "16px" }}>Personal Information</div>

            <div style={{ display: 'flex', gap: "20px" }}>
                <div style={{ width: "350px" }}>
                    <Input IsUsername label="FirstName" name="FirstName" />
                </div>
                <div style={{ width: "350px", gap: "20px" }}>
                    <Input IsUsername label="LastName" name="LastName" />
                </div>
            </div>

            <div style={{ display: 'flex', gap: "20px" }}>
                <div style={{ width: "350px" }}>
                    <Input IsUsername label="Email" name="Email" />
                </div>
                <div style={{ width: "350px", gap: "20px" }}>
                    <Input IsUsername name="PhoneNumber" label="PhoneNumber" />
                </div>
            </div>

            <div style={{ display: 'flex', gap: "20px" }}>
                <div style={{ width: "350px" }}>
                    <Input IsUsername label="BirthDate" name="BirthDate" />
                </div>
                <div style={{ width: "350px", gap: "20px" }}>
                    <Input IsUsername label="CountryOfBirth" name="CountryOfBirth" /></div>
            </div>

            <div style={{ display: 'flex', gap: "20px" }}>
                <div style={{ width: "350px" }}>
                    <Input IsUsername label="MaritalStatus" name="MaritalStatus" />
                </div>
                <div style={{ width: "350px", gap: "20px" }}>
                    <Input IsUsername label="Gender" name="Gender" />
                </div>
            </div>

            <div style={{ border: "0.5px solid #EBEBEB" }}></div>
            <div style={{ color: "#000000", fontSize: "16px" }}>Emergency Contact</div>

            <div style={{ display: 'flex', gap: "20px" }}>
                <div style={{ width: "350px" }}>
                    <Input IsUsername label="Emergency Contact" name="Emergency Contact" />
                </div>
                <div style={{ width: "350px", gap: "20px" }}>
                    <Input IsUsername name="PhoneNumber" label="PhoneNumber" />
                </div>
            </div>

            <div style={{ border: "0.5px solid #EBEBEB", top: "0" }}></div>
            <div style={{ color: "#000000", fontSize: "16px" }}>Work Information</div>

            <div style={{ display: 'flex', gap: "20px" }}>
                <div style={{ width: "350px" }}>
                    <Input IsUsername label="Manager" name="Manager" />
                </div>
                <div style={{ width: "350px", gap: "20px" }}>
                    <Input IsUsername label="Weekly Planning " name="Weekly Planning " />
                </div>
            </div>

            <div style={{ border: "0.5px solid #EBEBEB" }}></div>
            <div style={{ width: "350px" }}> <Button type={ButtonTypes.PRIMARY} btnText='Save Changes' /></div>

        </Card>
    )
}

export default SignUp;