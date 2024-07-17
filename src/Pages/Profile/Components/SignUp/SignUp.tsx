import { Avatar, FormControlLabel, Checkbox } from "@mui/material";
import Input from "../../../../Components/Input/input";
import { ButtonTypes } from "../../../../Components/Button/ButtonTypes";
import Button from "../../../../Components/Button/Button";
import style from "./SignUp.module.css"

const SignUp = () => {
    
    return (
        <div className={style.container}>
        <div className={style.profile}>
        <Avatar style={{ width: "94px", height: "94px" }} />
        <div>
            <div className={style.name}>Elisabeta Guri</div>
            <div className={style.position}>Head of Human Resources</div>
            <div className={style.hr}>HR Department</div>
        </div>
    </div>
    <div className={style.border}></div>
    <div className={style.title}>Personal Information</div>

    <div className={style.forms}>
                <div className={style.inputWidth}>
                    <Input IsUsername label="FirstName" name="FirstName" />
                </div>
                <div className={style.inputWidth}>
                    <Input IsUsername label="LastName" name="LastName" />
                </div>
            </div>

            <div className={style.forms}>
            <div className={style.inputWidth}>
            <Input IsUsername label="Email" name="Email" />
        </div>
        <div className={style.inputWidth}>
            <Input IsUsername name="PhoneNumber" label="PhoneNumber" />
        </div>
    </div>

    <div className={style.forms}>
    <div className={style.inputWidth}>
            <Input IsUsername label="BirthDate" name="BirthDate" />
        </div>
        <div className={style.inputWidth}>
            <Input IsUsername label="CountryOfBirth" name="CountryOfBirth" />
        </div>
    </div>

    <div className={style.forms}>
    <div className={style.inputWidth}>
            <Input IsUsername label="MaritalStatus" name="MaritalStatus" />
        </div>
        <div className={style.inputWidth}>
            <Input IsUsername label="Gender" name="Gender" />
        </div>
    </div>

    <div className={style.border}></div>
    <div className={style.title}>Emergency Contact</div>

    <div className={style.forms}>
    <div className={style.inputWidth}>
            <Input IsUsername label="Emergency Contact" name="Emergency Contact" />
        </div>
        <div className={style.inputWidth}>
            <Input IsUsername name="PhoneNumber" label="PhoneNumber" />
        </div>
    </div>

    <div className={style.border}></div>
    <div className={style.title}>Work Information</div>

    <div className={style.forms}>
    <div className={style.inputWidth}>
            <Input IsUsername label="Manager" name="Manager" />
        </div>
        <div className={style.inputWidth}>
            <Input IsUsername label="Weekly Planning " name="Weekly Planning " />
        </div>
    </div>
    <div className={style.checkboxDiv}>
        <FormControlLabel control={<Checkbox />} label="Public Holidays" />
        <FormControlLabel control={<Checkbox />} label="Remote" />
        <FormControlLabel control={<Checkbox />} label="External" />
    </div>
    <div className={style.border}></div>
    <div className={style.inputWidth}>
        <Button type={ButtonTypes.PRIMARY} btnText='Save Changes' />
    </div>
    </div>
    )
}

export default SignUp;