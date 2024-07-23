import Input from "../../../../Components/Input/Index";
import { ButtonTypes } from "../../../../Components/Button/ButtonTypes";
import Button from "../../../../Components/Button/Button";
import style from '../ProfileForm/ProfileForm.module.css'

const Contrat = () => {
    
    return (
        <div className={style.container}>
       
    <div className={style.title}>Contract Information</div>

    <div className={style.forms}>
                <div className={style.inputWidth}>
                    <Input IsUsername label="Pay company" name="Pay company" />
                </div>
                <div className={style.inputWidth}>
                    <Input IsUsername label="Company department" name="Company department" />
                </div>
            </div>

            <div className={style.forms}>
            <div className={style.inputWidth}>
            <Input IsUsername label="Contract type" name="Contract type" />
        </div>
    </div>
    <div className={style.border}></div>

    <div className={style.forms}>
    <div style={{display:"flex", width:"350px", gap:"20px"}}>
            <Input IsUsername label="Start date" name="Start date" />
            <Input IsUsername label="End date" name="End date" />
        </div>
        <div className={style.inputWidth}>
            <Input IsUsername label="Weekly duration" name="Weekly duration" />
        </div>
    </div>

    <div className={style.forms}>
    <div className={style.inputWidth}>
            <Input IsUsername label="Hours" name="Hours" />
        </div>
        <div className={style.inputWidth}>
            <Input IsUsername label="Trial Period" name="Trial Period" />
        </div>
    </div>

    <div className={style.border}></div>

    <div className={style.forms}>
    <div style={{display:"flex", flexDirection:"column", width:"350px", gap:"20px"}}>
            <Input IsUsername label="Work Position" name="Work Position" />
            <Input IsUsername label="Annual gross salary" name="Annual gross salary" />
        </div>
        <div  className={style.inputWidth}>
            <Input IsUsername name="Hourly gross salary" label="Hourly gross salary" />
        </div>
    </div>

    <div className={style.border}></div>
    <div className={style.title}>End of Contract</div>

    <div className={style.forms}>
    <div style={{display:"flex", flexDirection:"column", width:"350px", gap:"20px"}}>
            <Input IsUsername label="Reason" name="Reason" />
        </div>
        <div  className={style.inputWidth}>
            <Input IsUsername name="Other details" label="Other details" />
        </div>
    </div>
  
    <div className={style.border}></div>
    <div className={style.inputWidth}>
        <Button type={ButtonTypes.PRIMARY} btnText='Save Changes' />
    </div>
    </div>
    )
}

export default Contrat;