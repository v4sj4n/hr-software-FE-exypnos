import React from 'react';
import Card from '../../Components/Card/Card';
import style from './ViewCandidats.module.css'

export default function ViewCandidats() {
    return (
        <div className={style.container}>
            <Card className={style.card}>
                <div className={style.header}>
                    <div className={style.section}>
                        <div className={style.label}>First Name</div>
                        <div className={style.value}>First Name</div>
                    </div>
                    <div className={style.section}>
                        <div className={style.label}>Last Name</div>
                        <div className={style.value}>First Name</div>
                    </div>
                </div>

                <div className={style.header}>                <div className={style.section}>
                    <div className={style.label}>Email</div>
                    <div className={style.value}>First Name</div>
                </div>
                
                    <div className={style.section}>
                        <div className={style.label}>Phone</div>
                        <div className={style.value}>First Name</div>
                    </div></div>

                    <div className={style.header}>  <div className={style.section}>
                    <div className={style.label}>Age</div>
                    <div className={style.value}>First Name</div>
                </div>
                <div className={style.section}>
                    <div className={style.label}>Applying Method</div>
                    <div className={style.value}>First Name</div>
                </div></div>
               
                <div className={style.header}><div className={style.section}>
                    <div className={style.label}>Work Position</div>
                    <div className={style.value}>First Name</div>
                </div>
                <div className={style.section}>
                    <div className={style.label}>Wage Expectation</div>
                    <div className={style.value}>First Name</div>
                </div> </div>
                

                <div className={style.header}><div className={style.section}>
                    <div className={style.label}>Experience</div>
                    <div className={style.value}>First Name</div>
                </div>
                <div className={style.section}>
                    <div className={style.label}>Technologies Used</div>
                    <div className={style.value}>First Name</div>
                </div> </div>
                

                <div className={style.header}>  <div className={style.section}>
                    <div className={style.label}>Individual Projects</div>
                    <div className={style.value}>First Name</div>
                </div>
                <div className={style.section}>
                    <div className={style.label}>CV</div>
                    {/* <div className={style.value}><a href={aplicantData.cv} target="_blank" rel="noopener noreferrer">View CV</a></div> */}
                </div></div>
               
            </Card>
        </div>
    );
}
