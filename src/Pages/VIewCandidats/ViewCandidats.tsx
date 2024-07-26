import Card from '../../Components/Card/Card';
import style from './ViewCandidats.module.css'
import { useApplicantById } from './Hook';
import Button from '../../Components/Button/Button';
import { ButtonTypes } from '../../Components/Button/ButtonTypes';
import { ModalComponent } from '../../Components/Modal/Modal';
import { useState } from 'react';
export default function ViewCandidats() {

    const { applicant } = useApplicantById()
    const [showModal, setShowModal] = useState(false);
    const [modalAction, setModalAction] = useState('');


    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleOpenModal = (action) => {
        setModalAction(action);
        setShowModal(true);
    }



    return (
        <div className={style.container}>
            <Card padding='50px' className={style.card}>
                <div className={style.header}>
                    <div className={style.section}>
                        <div className={style.label}>First Name</div>
                        <div className={style.value}>{applicant?.firstName}</div>
                    </div>
                    <div className={style.section}>
                        <div className={style.label}>Last Name</div>
                        <div className={style.value}>{applicant?.lastName}</div>
                    </div>
                </div>

                <div className={style.header}>
                    <div className={style.section}>
                        <div className={style.label}>Email</div>
                        <div className={style.value}>{applicant?.email}</div>
                    </div>

                    <div className={style.section}>
                        <div className={style.label}>Phone Number</div>
                        <div className={style.value}>{applicant?.phoneNumber}</div>
                    </div></div>

                <div className={style.header}>  <div className={style.section}>
                    <div className={style.label}>Age</div>
                    <div className={style.value}>{applicant?.age}</div>
                </div>
                    <div className={style.section}>
                        <div className={style.label}>Applying Method</div>
                        <div className={style.value}>{applicant?.applicationMethod}</div>
                    </div></div>

                <div className={style.header}><div className={style.section}>
                    <div className={style.label}>Work Position</div>
                    <div className={style.value}>{applicant?.positionApplied}</div>
                </div>
                    <div className={style.section}>
                        <div className={style.label}>Wage Expectation</div>
                        <div className={style.value}>{applicant?.salaryExpectations}</div>
                    </div> </div>


                <div className={style.header}><div className={style.section}>
                    <div className={style.label}>Experience</div>
                    <div className={style.value}>{applicant?.experience}</div>
                </div>
                    <div className={style.section}>
                        <div className={style.label}>Technologies Used</div>
                        <div className={style.value}>{applicant?.technologiesUsed}</div>
                    </div> </div>


                <div className={style.header}>  <div className={style.section}>
                    <div className={style.label}>CV</div>
                    <div className={style.value}> 
                         {applicant?.cvAttachment ? (
                        <a
                            href={applicant.cvAttachment}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View CV
                        </a>
                    ) : (
                        "No CV attached"
                    )}
                    </div>
                </div>
                </div>

                <div style={{ display: 'flex', gap: "10px" }}>
                    <Button type={ButtonTypes.PRIMARY} btnText='Accept' width='100%' onClick={() => handleOpenModal('accept')} />
                    <Button type={ButtonTypes.SECONDARY} btnText='Reject' width='100%' onClick={() => handleOpenModal('reject')} />
                </div>
            </Card>
            {showModal && (
                <ModalComponent open={showModal} handleClose={handleCloseModal}>
                    <div>
                        Are you sure you want to {modalAction} this candidate?
                    </div>
                    <div style={{ display: 'flex', gap: "10px", marginTop: "20px" }}>
                        <Button
                            type={ButtonTypes.PRIMARY}
                            btnText='Confirm'
                            width='100%'
                            onClick={() => {
                                handleCloseModal();
                            }}
                        />
                        <Button
                            type={ButtonTypes.SECONDARY}
                            btnText='Cancel'
                            width='100%'
                            onClick={handleCloseModal}
                        />
                    </div>
                </ModalComponent>
            )}
        </div>
    );
}
