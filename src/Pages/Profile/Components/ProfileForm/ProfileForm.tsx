import Input from '../../../../Components/Input/Index'
import { ButtonTypes } from '../../../../Components/Button/ButtonTypes'
import Button from '../../../../Components/Button/Button'
import style from './style/ProfileForm.module.css'
import { useProfile } from './Context/ProfileContext'
import { FileUploadProvider } from '../../Context/FileUpoadProvider'
import { ProfileProvider } from './Context/ProfileProvider'
import Selecter from '@/Components/Input/components/Select/Selecter'
import Toast from '@/Components/Toast/Toast'

const ProfileFormContext = () => {

    const {
        user,
        isCurrentUser,
        isAdmin,
        handleChange,
        handleUpdate,
        genderOptions,
        handleGenderChange,
        updateToastMessage,
        updateToastOpen,
        updateToastSeverity,
        handleUpdateToastClose,
        handlePlaceChange,
        Places,
        handleCancel,
        handlePositionChange,
        position,
        engagement,
        handleEngagementChange
    } = useProfile()

    if (!user) {
        return <div>No user data available</div>
    }

    return (

        <div>
            <Toast
                open={updateToastOpen}
                message={updateToastMessage}
                severity={updateToastSeverity}
                onClose={handleUpdateToastClose}
            />
            <div className={style.container}>
                <div style={{ display: "flex", gap: "20px" }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: "20px" }}>
                        <Input
                            IsUsername
                            label="FirstName"
                            width="450px"
                            disabled={!isAdmin}
                            name="firstName"
                            onChange={handleChange}
                            value={user.firstName}
                        />
                        <Input
                            IsUsername
                            type="email"
                            width="450px"
                            label="Email"
                            name="email"
                            disabled={!isAdmin}
                            onChange={handleChange}
                            value={user.auth.email}
                        />
                        <Input
                            IsUsername
                            label="BirthDate"
                            width="450px"
                            type="date"
                            shrink={true}
                            disabled={!isAdmin}
                            name="dob"
                            onChange={handleChange}
                            value={user.dob}
                        />
                        <Selecter
                            options={Places}
                            multiple={false}
                            disabled={!isAdmin}
                            width="450px"
                            label="Places of Birth"
                            name="pob"
                            onChange={handlePlaceChange}
                            value={user.pob}
                        />
                        <Selecter
                            disabled={!isAdmin}
                            multiple={false}
                            onChange={handleEngagementChange}
                            options={engagement}
                            name="engagement"
                            label="Engagement"
                            width="450px"
                            value={user.engagement}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: "20px" }}>

                        <Input
                            IsUsername
                            name="lastName"
                            width="450px"
                            disabled={!isAdmin}
                            label="LastName"
                            onChange={handleChange}
                            value={user.lastName}

                        />
                        <Input
                            icon={<p className={style.numberPrefix}>+355</p>}
                            iconPosition="start"
                            IsUsername
                            type="number"
                            name="phone"
                            width="450px"
                            disabled={!isAdmin}
                            label="PhoneNumber"
                            onChange={handleChange}
                            value={user.phone}
                        />
                         <Selecter
                            disabled={!isAdmin}
                            multiple={false}
                            onChange={handlePositionChange}
                            options={position}
                            name="position"
                            label="Position"
                            width="450px"
                            value={user.position}
                        />
                        <Selecter
                            disabled={!isAdmin}
                            width="450px"
                            name="gender"
                            label="Gender"
                            options={genderOptions}
                            onChange={handleGenderChange}
                            multiple={false}
                            value={user.gender}
                        />

                    </div>
                </div>
                {isAdmin ? (
                    <div
                        className={style.inputWidth}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '20px',
                            marginTop: '30px',
                        }}
                    >
                        <Button
                            onClick={handleUpdate}
                            type={ButtonTypes.PRIMARY}
                            btnText="Save Changes"
                            width="450px"
                        />
                        <span>
                            <Button
                                btnText="Remove account"
                                type={ButtonTypes.SECONDARY}
                                width="450px"
                                height="38px"
                                color="#ffffff"
                                borderColor="#C70039"
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
            <div className={style.border}> </div>
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
