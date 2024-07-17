import { useState } from 'react'
import Card from '../../../Components/Card/Card';
import style from "../Profile.module.css"
import SignUp from './SignUp/SignUp';

const MyEvents = () => (
    <SignUp/>
);

const Contract = () => (
    <SignUp/>
);

const Settings = () => (
    <div>
        <h2>Settings</h2>
    </div>
);

export default function Tabs() {
    const [activeTab, setActiveTab] = useState("myEvents");

    const renderActiveComponent = () => {
        switch(activeTab) {
            case "myEvents":
                return <MyEvents />;
            case "Contract":
                return <Contract />;
            case "Settings":
                return <Settings />;
            default:
                return <MyEvents />;
        }
    };

    return (
        <Card>
            <div className={style.tabs}>
                <button
                    className={`${style.tab} ${activeTab === "myEvents" ? style.activetab : ""} actions`}
                    onClick={() => setActiveTab("myEvents")}
                >
                    My Events
                </button>
                <button
                    className={`${style.tab} ${activeTab === "Contract" ? style.activetab : ""} actions`}
                    onClick={() => setActiveTab("Contract")}
                >
                    Contract
                </button>
                <button
                    className={`${style.tab} ${activeTab === "Settings" ? style.activetab : ""} actions`}
                    onClick={() => setActiveTab("Settings")}
                >
                    Settings
                </button>
            </div>
            {renderActiveComponent()}
        </Card>
    )
}