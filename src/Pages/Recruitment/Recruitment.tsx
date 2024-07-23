import Button from "../../Components/Button/Button";
import { ButtonTypes } from "../../Components/Button/ButtonTypes";
import Card from "../../Components/Card/Card";
import Input from "../../Components/Input/Index";
import style from './Recruitment.module.css'
import logo from '../../../Public/Images/image_1-removebg-preview.png'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import MultipleSelectChip from "../../Components/Input/components/Select/autocomplete";

export default function Recruitment() {
    return (

        <div className={style.container}>
            <Card padding="30px" gap="15px">
                <img className={style.img2} alt="img" src={logo} />
                <div className={style.title}>
                    Apply to Codevider
                </div>
                <div style={{ display: "flex", gap: "20px" }}>
                    <Input
                        label="First Name"
                        name='First Name'
                        IsUsername
                        width="300px"
                    />
                    <Input
                        label="Last Name"
                        name='Last Name'
                        IsUsername
                        width="300px"
                    />
                </div>
                <div style={{ display: "flex", gap: "20px" }}>
                    <Input
                        label="Age"
                        name='Age'
                        IsUsername
                        width="300px"
                    />
                    <Input
                        label="Phone Number"
                        name='Phone Number'
                        IsUsername
                        width="300px"
                    />
                </div>
                <div style={{ display: "flex", gap: "20px" }}>       
                     <Input
                    label="Email"
                    name='email'
                    IsUsername
                    width="300px"
                />
                    <Input
                        label="Applying method"
                        name='Applying method'
                        IsUsername
                        width="300px"
                    />
                </div>
                <div style={{ display: "flex" }}>
                    <Input
                        label="Work position"
                        name='Work position'
                        IsUsername
                        width="620px"
                    />
                </div>
                <div style={{ display: "flex" }}>
                    <Input
                        label="Previous working experience"
                        name='Previous working experience'
                        IsUsername
                        width="620px"
                    />
                </div>
                <div style={{ display: "flex" }}>
                    <MultipleSelectChip/>
                </div>
                <div style={{ display: "flex" }}>
                    <Input
                        label="Individual projects"
                        name='Individual projects'
                        IsUsername
                        width="620px"
                    />
                </div>
                <div style={{ display: "flex", gap: "20px" }}>
                    <Input
                        label="Wage expectation"
                        name='Wage expectation'
                        IsUsername
                        width="300px"
                    />
                </div>


                <div style={{ display: "flex" }}>
                    <Input
                        label="CV"
                        name='CV'
                        IsUsername
                        width="620px"
                        icon={<DriveFolderUploadIcon />}
                    />
                </div>
                <div style={{ display: "flex", gap: "20px" }}>
                    <Button type={ButtonTypes.SECONDARY} btnText="Reset" />
                    <Button type={ButtonTypes.TERTIARY} btnText="Apply" />
                </div>
            </Card>
        </div>
    )
}