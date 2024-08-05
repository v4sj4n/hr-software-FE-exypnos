import Button1 from "../../Components/Button/Button";
import { ButtonTypes } from "../../Components/Button/ButtonTypes";
import Input from "../../Components/Input/Index";
import style from './style/Recruitment.module.css'
import logo from '/Images/image_1-removebg-preview.png'
import { MuiSelect } from "../../Components/Input/components/Select/autocomplete";
import image from "/Images/Vector-illustration-of-communication-Graphics-69695603-1-removebg-preview.png"
import { useCreateAplicant } from "./Context/Recruitment.Provider";
import Card from "../../Components/Card/Card";
import { VisuallyHiddenInput } from "@/Components/Input/Styles";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ModalComponent } from "@/Components/Modal/Modal";

export default function Recruitment() {

    const { handleChange, aplicantFormData, handleTechnologiesChange, handleFileChange, handleCreateAplicant, showModal, closeModal, resetForm } = useCreateAplicant();

    return (
        <div className={style.background}>
            <div className={style.container}>
                <Card gap="20px" padding="30px">
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
                            name='phoneNumber'
                            IsUsername
                            width="300px"
                            onChange={handleChange}
                            value={aplicantFormData.phoneNumber}
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
                    <div style={{ display: "flex", gap: '20px' }}>
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
                        <MuiSelect value={aplicantFormData.technologiesUsed} onChange={handleTechnologiesChange} name="technologiesUsed" />
                    </div>
                    <div style={{ display: "flex" }}>
                        <Button
                            component="label"
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                            style={{ width: "620px", backgroundColor: "#2469FF", color: "#FFFFFF", boxShadow: "none", fontFamily: "Outfit, sans-serif", }}
                        >
                            Upload CV
                            <VisuallyHiddenInput
                                type="file"
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx"
                                name="file"
                            />
                        </Button>
                    </div>
                    <div style={{ display: "flex", gap: "20px" }}>
                        <Button1 type={ButtonTypes.SECONDARY} btnText="Reset" width="100%" onClick={resetForm} />
                        <Button1 type={ButtonTypes.TERTIARY} btnText="Apply" onClick={handleCreateAplicant} />
                    </div>
                </Card>
            </div>
            <img alt="image" src={image} style={{ width: "600px", height: "auto", }} />
            {showModal && (
                <ModalComponent open={showModal} handleClose={closeModal}>
                    <div>Your email was sent successfully</div>
                </ModalComponent>
            )}
        </div>


    )
}