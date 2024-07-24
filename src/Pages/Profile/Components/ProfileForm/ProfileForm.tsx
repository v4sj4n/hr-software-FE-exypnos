import { Avatar } from "@mui/material";
import Input from "../../../../Components/Input/Index";
import { ButtonTypes } from "../../../../Components/Button/ButtonTypes";
import Button from "../../../../Components/Button/Button";
import style from "./ProfileForm.module.css";
import Image from '../../../../Components/uploads/uploadImage';
import { useFileUpload } from "../../Context/Hook";
import { useProfile } from "./Context/Hook";

const ProfileForm = () => {
    const { uploadImage, previewImage } = useFileUpload();
    const { user, error, isLoading, isCurrentUser, isAdmin, handleChange, handleUpdate } = useProfile();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>No user data available</div>;
    }

    return (
        <div className={style.container}>
            <div className={style.title}>Personal Information</div>

            <div className={style.forms}>
                <div className={style.profile}>
                    <Avatar
                        src={previewImage || user.imageUrl}
                        style={{ width: "50px", height: "50px" }}
                    />
                    {isCurrentUser && <Image onChange={uploadImage} />}

                </div>
                <div className={style.inputWidth}>
                    <Input IsUsername label="firstName" width='350px' disabled={!isAdmin} name="firstName" onChange={handleChange} value={user.firstName} />
                </div>
            </div>

            <div className={style.forms}>
                <div className={style.inputWidth}>
                    <Input IsUsername type="email" width='350px' label="Email" name="email" disabled={!isAdmin} onChange={handleChange} value={user.auth.email} />
                </div>
                <div className={style.inputWidth}>
                    <Input IsUsername name="lastName" width='350px' disabled={!isAdmin} label="lastName" onChange={handleChange} value={user.lastName} />
                </div>
            </div>

            <div className={style.forms}>
                <div className={style.inputWidth}>
                    <Input IsUsername label="BirthDate" width='350px' disabled={!isAdmin} name="dob" onChange={handleChange} value={user.dob} />
                </div>
                <div className={style.inputWidth}>
                    <Input IsUsername disabled={!isAdmin} width='350px' label="CountryOfBirth" name="pob" onChange={handleChange} value={user.pob} />
                </div>
            </div>

            <div className={style.forms}>
                <div className={style.inputWidth}>
                    <Input IsUsername label="Gender" width='350px' disabled={!isAdmin} name="gender" onChange={handleChange} value={user.gender} />

                </div>
                <div className={style.inputWidth}>

                    <Input IsUsername name="phone" width='350px' disabled={!isAdmin} label="PhoneNumber" onChange={handleChange} value={user.phone} />
                </div>
            </div>

            <div className={style.checkboxDiv}>
                <Input isCheckBox label='Public Holidays' name='check' disabled={!isAdmin} />
                <Input isCheckBox label='Remote' name='check' disabled={!isAdmin} />
                <Input isCheckBox label='External' name='check' disabled={!isAdmin} />
            </div>
            <div className={style.border}></div>
            {isAdmin ? (
                <div className={style.inputWidth}>
                    <Button onClick={handleUpdate} type={ButtonTypes.PRIMARY} btnText='Save Changes' />
                </div>
            ) : (
                isCurrentUser && (
                    <div className={style.inputWidth}>
                        <Button onClick={handleUpdate} type={ButtonTypes.PRIMARY} btnText='Change Picture' />
                    </div>
                )
            )}
        </div>
    )
}

export default ProfileForm;