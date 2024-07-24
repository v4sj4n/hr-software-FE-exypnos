import Button from "../../Components/Button/Button";
import { ButtonTypes } from "../../Components/Button/ButtonTypes";
import Input from "../../Components/Input/Index";
import style from './Recruitment.module.css'
import logo from '/Images/image_1-removebg-preview.png'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { MuiSelect } from "../../Components/Input/components/Select/autocomplete";
import image from "/Images/image.png"

export default function Recruitment() {
    return (
<>
        <div className={style.container}>

            <div style={{display:'flex', flexDirection:"column", gap:"20px"}}>
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
                <div style={{ display: "flex", gap:'20px' }}>
                    <Input
                        label="Work position"
                        name='Work position'
                        IsUsername
                        width="300px"
                    />
                    <Input
                        label="Wage expectation"
                        name='Wage expectation'
                        IsUsername
                        width="300px"
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
                    <MuiSelect name="selecter"/>
                </div>
                <div style={{ display: "flex" }}>
                    <Input
                        label="Individual projects"
                        name='Individual projects'
                        IsUsername
                        width="620px"
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
                </div></div>
       <img alt="image" src={image} style={{width:"600px", height:"auto", }}/>
       <div style={{backgroundColor:"#1B5FF4", width:"120px", height:"100%",  zIndex:"-1",position:"absolute", top:0, right:0}}></div>
        </div>
        
        </>
    )
}