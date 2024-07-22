import { useState } from 'react';
import Card from '../../../Components/Card/Card';
import style from "../Profile.module.css";
import ProfileForm from './ProfileForm/ProfileForm';
import Contrat from './Contrat/Contrat';
import ChangePass from './ChangePass/ChangePass';

const MyProfile = () => (
    <ProfileForm/>
);

const Contract = () => (
    <Contrat/>
);

const ChangePassword = () => (
    <ChangePass/>
);

export default function Tabs() {
    const [activeTab, setActiveTab] = useState("MyProfile");

    const renderActiveComponent = () => {
        switch(activeTab) {
            case "MyProfile":
                return <MyProfile />;
            case "Contract":
                return <Contract />;
            case "ChangePassword":
                return <ChangePassword />;
            default:
                return <MyProfile />;
        }
    };

    return (
        <Card>
            <div className={style.tabs}>
                <button
                    className={`${style.tab} ${activeTab === "MyProfile" ? style.activetab : ""} actions`}
                    onClick={() => setActiveTab("MyProfile")}
                >
                    My Profile
                </button>
                <button
                    className={`${style.tab} ${activeTab === "Contract" ? style.activetab : ""} actions`}
                    onClick={() => setActiveTab("Contract")}
                >
                    Contract
                </button>
                <button
                    className={`${style.tab} ${activeTab === "ChangePassword" ? style.activetab : ""} actions`}
                    onClick={() => setActiveTab("ChangePassword")}
                >
                    Change Password
                </button>
            </div>
            {renderActiveComponent()}
        </Card>
    );
}
