import { useState } from 'react'
import Card from '../../../Components/Card/Card'
import style from '../style/Profile.module.css'
import ProfileForm from './ProfileForm/ProfileForm'
import Contrat from './Contrat/Contrat'
import ChangePass from './ChangePass/ChangePass'
import { FileUploadProvider } from '../Context/FileUpoadProvider'
import { ProfileProvider } from './ProfileForm/Context/ProfileProvider'
import { PasswordProvider } from './ChangePass/Context/PasswordProvider'

const MyProfile = () => (
    <FileUploadProvider>
        <ProfileProvider>
            <ProfileForm />
        </ProfileProvider>
    </FileUploadProvider>
)

const Contract = () => <Contrat />

const ChangePassword = () => (
    <PasswordProvider>
        <ChangePass />
    </PasswordProvider>
)

export default function Tabs() {
    const [activeTab, setActiveTab] = useState('MyProfile')

    const renderActiveComponent = () => {
        switch (activeTab) {
            case 'MyProfile':
                return <MyProfile />
            case 'Payroll':
                return <Contract />
            case 'ChangePassword':
                return <ChangePassword />
            default:
                return <MyProfile />
        }
    }

    return (
        <Card flex="1">
            <div className={style.tabs}>
                <button
                    className={`${style.tab} ${activeTab === 'MyProfile' ? style.activetab : ''} actions`}
                    onClick={() => setActiveTab('MyProfile')}
                >
                    My Profile
                </button>
                <button
                    className={`${style.tab} ${activeTab === 'Payroll' ? style.activetab : ''} actions`}
                    onClick={() => setActiveTab('Payroll')}
                >
                    Payroll
                </button>
                <button
                    className={`${style.tab} ${activeTab === 'ChangePassword' ? style.activetab : ''} actions`}
                    onClick={() => setActiveTab('ChangePassword')}
                >
                    Change Password
                </button>
            </div>
            {renderActiveComponent()}
        </Card>
    )
}
