import { Avatar } from '@mui/material'
import Input from '../../../../Components/Input/Index'
import { ButtonTypes } from '../../../../Components/Button/ButtonTypes'
import Button from '../../../../Components/Button/Button'
import style from './style/ProfileForm.module.css'
import Image from '../../../../Components/uploads/uploadImage'
import { useFileUpload } from '../../Context/Hook'
import { useProfile } from './Context/ProfileContext'
import { FileUploadProvider } from '../../Context/FileUpoadProvider'
import { ProfileProvider } from './Context/ProfileProvider'
import Selecter from '@/Components/Input/components/Select/Selecter'
import Toast from '@/Components/Toast/Toast'
// import {handleCancel} from './../ProfileForm/Hook/Index'

const ProfileFormContext = () => {

    
    const { uploadImage, previewImage } = useFileUpload()

    const { user, isCurrentUser, isAdmin, handleChange, handleUpdate,genderOptions, handleGenderChange, updateToastMessage, updateToastOpen, updateToastSeverity,handleUpdateToastClose, handlePlaceChange, Places,handleCancel,handlePositionChange, position } = useProfile()

    if (!user) {
        return <div>No user data available</div>
    }

    return (
        <div className={style.container}>
            {/* <div className={style.title}>Personal Information</div> */}
            <Toast
            open={updateToastOpen}
            message={updateToastMessage}
            severity={updateToastSeverity}
            onClose={handleUpdateToastClose}
            />

                    <div>
                    <div className={style.profile} style={{ position: 'relative', display: 'inline-block' }}>
    <Avatar
        src={previewImage || user.imageUrl}
        style={{ width: '150px', height: '150px', borderRadius: '50%' }}
    />
    {isCurrentUser && (
        <div style={{ 
            position: 'absolute', 
            bottom: '1px', 
            right: '10px', 
        
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            cursor: 'pointer', 
        }}>
            <Image onChange={uploadImage} />
        </div>
    )}
</div>
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '15px' }}>
    <div style={{ fontSize: '30px', color: '#000000' }}>
        {`${user.firstName} ${user.lastName}`}
    </div>
    <div style={{ color: '#000000' }}>
        {user.auth.email}
    </div>
</div>

                </div>

            <div className={style.forms}>
            </div>

            <div className={style.forms} >
                <div className={style.inputWidth}>
                    <Input
                        IsUsername
                        type="email"
                        width="350px"
                        label="Email"
                        name="email"
                        disabled={!isAdmin}
                        onChange={handleChange}
                        value={user.auth.email}
                    />
                </div>
                <div className={style.inputWidth}>
                    <Input
                        IsUsername
                        name="lastName"
                        width="350px"
                        disabled={!isAdmin}
                        label="LastName"
                        onChange={handleChange}
                        value={user.lastName}
                    />
                </div>
            </div>

            <div className={style.forms}>
                <div className={style.inputWidth}>
                    <Input
                        IsUsername
                        label="BirthDate"
                        width="350px"
                        type="date"
                        shrink={true}
                        disabled={!isAdmin}
                        name="dob"
                        onChange={handleChange}
                        value={user.dob}
                    />
                </div>
                <div className={style.inputWidth}>
                    <Selecter
                       options={Places}
                       multiple={false} 
                        width="350px"
                        label="Places of Birth"
                        name="pob"
                        onChange={handlePlaceChange}
                        value={user.pob}
                    />
                </div>
                
            </div>

            <div className={style.forms}>
                <div className={style.inputWidth}>
                <Selecter width='100%' name='gender' label='Gender' options={genderOptions} onChange={handleGenderChange} multiple={false} value={user.gender}/>
                </div>
                <div className={style.inputWidth}>
                    <Input
                     icon={
                        <p className={style.numberPrefix}>
                            +355
                        </p>
                    }
                    iconPosition="start"
                        IsUsername
                        type='number'
                        name="phone"
                        width="350px"
                        disabled={!isAdmin}
                        label="PhoneNumber"
                        onChange={handleChange}
                        value={user.phone}
                    />
                </div>
                
                <div className={style.inputWidth}>
                    <Input
                        IsUsername
                        label="FirstName"
                        width="350px"
                        disabled={!isAdmin}
                        name="firstName"
                        onChange={handleChange}
                        value={user.firstName}
                    />
                    
                </div>
                <div className={style.inputWidth}>
                < Selecter multiple={false} onChange={handlePositionChange} options={position}  name='position' label='Position' width="350px" value={user.position}
                />
                </div>
            </div>

            <div className={style.checkboxDiv}>
                <Input
                    isCheckBox
                    label="Public Holidays"
                    name="check"
                    disabled={!isAdmin}
                />
                <Input
                    isCheckBox
                    label="Remote"
                    name="check"
                    disabled={!isAdmin}
                />
                <Input
                    isCheckBox
                    label="External"
                    name="check"
                    disabled={!isAdmin}
                />
            </div>
            <div className={style.border}> </div>
            {isAdmin ? ( 
                <div className={style.inputWidth} style={{display:'flex',justifyContent:'center',gap:'20px'}}>
                    <Button
                        onClick={handleUpdate}
                        type={ButtonTypes.PRIMARY}
                        btnText="Save Changes"
                        width="350px"
                    />
					<span>
          <Button
              btnText="Remove account"
			type={ButtonTypes.SECONDARY}
               width="160px"
			height='38px'
			color="#ffffff"
			borderColor='#C70039'
			backgroundColor="#C70039"
			display="flex"
			justifyContent="center"
			alignItems="center"
			onClick={handleCancel}
         />
        </span>
	
                </div>
            ) : (
                isCurrentUser && (
                    <div className={style.inputWidth}>
                        <Button
                            onClick={handleUpdate}
                            type={ButtonTypes.PRIMARY}
                            btnText="Change Picture"
                            width="350px"
                        />
						
                    </div>
                )
            )}
			
        
        </div>
    )
}

const ProfileForm: React.FC = () => {
    return (
        <FileUploadProvider>
            <ProfileProvider>
                <ProfileFormContext />
            </ProfileProvider>
        </FileUploadProvider>
    )
}

export default ProfileForm
