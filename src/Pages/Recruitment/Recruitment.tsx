import Button from "../../Components/Button/Button";
import { ButtonTypes } from "../../Components/Button/ButtonTypes";
import Input from "../../Components/Input/Index";
import style from './style/Recruitment.module.css'
import logo from '/Images/image_1-removebg-preview.png'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { MuiSelect } from "../../Components/Input/components/Select/autocomplete";
import image from "/Images/image.png"
import { useCreateAplicant } from "./Context/Recruitment.Provider";

export default function Recruitment() {

    const { handleChange, aplicantFormData, handleTechnologiesChange, handleFileChange, handleCreateAplicant } = useCreateAplicant();

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
                        name='firstName'
                        IsUsername
                        width="300px"
                        value={aplicantFormData.firstName}
                        onChange={handleChange}
                    />
                    <Input
                        label="Last Name"
                        name='lastName'
                        IsUsername
                        width="300px"
                        value={aplicantFormData.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ display: "flex", gap: "20px" }}>
                    <Input
                        label="Age"
                        name='age'
                        IsUsername
                        width="300px"
                        onChange={handleChange}
                        value={aplicantFormData.age}
                    />
                    <Input
                        label="Phone Number"
                        name='phone'
                        IsUsername
                        width="300px"
                        onChange={handleChange}
                        value={aplicantFormData.phone}
                    />
                </div>
                <div style={{ display: "flex", gap: "20px" }}>       
                     <Input
                    label="Email"
                    name='email'
                    IsUsername
                    width="300px"
                    onChange={handleChange}
                    value={aplicantFormData.email}
                />
                    <Input
                        label="Applying method"
                        name='applicationMethod'
                        IsUsername
                        width="300px"
                        onChange={handleChange}
                    value={aplicantFormData.applicationMethod}
                    />
                </div>
                <div style={{ display: "flex", gap:'20px' }}>
                    <Input
                        label="Work position"
                        name='positionApplied'
                        IsUsername
                        width="300px"
                        onChange={handleChange}
                        value={aplicantFormData.positionApplied}
                    />
                    <Input
                        label="Wage expectation"
                        name='salaryExpectations'
                        IsUsername
                        width="300px"
                        onChange={handleChange}
                        value={aplicantFormData.salaryExpectations}
                    />
                </div>
                <div style={{ display: "flex" }}>
                    <Input
                        label="Previous working experience"
                        name='experience'
                        IsUsername
                        width="620px"
                        onChange={handleChange}
                        value={aplicantFormData.experience}
                    />
                </div>
                <div style={{ display: "flex" }}>
                    <MuiSelect value={aplicantFormData.technologiesUsed} onChange={handleTechnologiesChange} name="technologiesUsed"/>
                </div>
                <div style={{ display: "flex" }}>
                    <Input
                        label="Individual projects"
                        name='individualProjects'
                        IsUsername
                        width="620px"
                        onChange={handleChange}
                        value={aplicantFormData.individualProjects}
                    />
                </div>
              


                <div style={{ display: "flex" }}>
                <Input
                    label="CV"
                    name='cv'
                    type="file" 
                    IsUsername
                    width="620px"
                    icon={<DriveFolderUploadIcon />}
                    onChange={handleFileChange} 
                />
                </div>
                <div style={{ display: "flex", gap: "20px" }}>
                    <Button type={ButtonTypes.SECONDARY} btnText="Reset" width="100%"/>
                    <Button type={ButtonTypes.TERTIARY} btnText="Apply" onClick={handleCreateAplicant} />
                </div></div>
       <img alt="image" src={image} style={{width:"600px", height:"auto", }}/>
       <div style={{backgroundColor:"#1B5FF4", width:"120px", height:"100%",  zIndex:"-1",position:"absolute", top:0, right:0}}></div>
        </div>
        
        </>
    )
}