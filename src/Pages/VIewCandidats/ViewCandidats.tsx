import Card from '../../Components/Card/Card';
import style from './styles/ViewCandidats.module.css';
import { useApplicantById } from './Hook';
import Button from '../../Components/Button/Button';
import { ButtonTypes } from '../../Components/Button/ButtonTypes';
import { ModalComponent } from '../../Components/Modal/Modal';
import Input from '@/Components/Input/Index';
import { useState } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

export default function ViewCandidats() {
    const {
        applicant,
        showModal,
        handleCloseModal,
        handleOpenModal,
        handleConfirm,
        showConfirmationModal,
        firstInterviewDate,
        setFirstInterviewDate,
        customMessage,
        setCustomMessage,
        handleSend,
        handleCloseConfirmationModal,
        customSubject,
        setCustomSubject,
    } = useApplicantById()

    const calculateAge = (dob: string): number => {
        const birthDate = new Date(dob)
        const today = new Date()
        let age = today.getFullYear() - birthDate.getFullYear()
        const monthDifference = today.getMonth() - birthDate.getMonth()

        if (
            monthDifference < 0 ||
            (monthDifference === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--
        }
        return age;
    };
    const [useCustomEmail, setUseCustomEmail] = useState(false) 


    return (
        <div className={style.container}>
            <Card
                flex="2"
                borderRadius="5px"
                padding="32px"
                border="1px solid #ebebeb"
            >
                <div className={style.columContanier}>
                    <div className={style.column}>
                        <div className={style.section}>
                            <div className={style.label}>First Name</div>
                            <div className={style.value}>
                                {applicant?.firstName}
                            </div>
                        </div>
                        <div className={style.border}></div>

                        <div className={style.section}>
                            <div className={style.label}>Email</div>
                            <div className={style.value}>
                                {applicant?.email}
                            </div>
                        </div>
                        <div className={style.border}></div>

                        <div className={style.section}>
                            <div className={style.label}>Age</div>

                            <div className={style.value}>
                                {applicant?.dob
                                    ? calculateAge(applicant.dob.split('T')[0])
                                    : 'N/A'}
                            </div>
                        </div>
                        <div className={style.border}></div>

                        <div className={style.section}>
                            <div className={style.label}>Work Position</div>
                            <div className={style.value}>
                                {applicant?.positionApplied}
                            </div>
                        </div>
                        <div className={style.border}></div>

                        <div className={style.section}>
                            <div className={style.label}>Experience</div>
                            <div className={style.value}>
                                {applicant?.experience}
                            </div>
                        </div>
                        <div className={style.border}></div>
                    </div>

                    <div className={style.column}>
                        <div className={style.section}>
                            <div className={style.label}>Last Name</div>
                            <div className={style.value}>
                                {applicant?.lastName}
                            </div>
                        </div>
                        <div className={style.border}></div>

                        <div className={style.section}>
                            <div className={style.label}>Phone Number</div>
                            <div className={style.value}>
                                {applicant?.phoneNumber}
                            </div>
                        </div>
                        <div className={style.border}></div>

                        <div className={style.section}>
                            <div className={style.label}>Applying Method</div>
                            <div className={style.value}>
                                {applicant?.applicationMethod}
                            </div>
                        </div>
                        <div className={style.border}></div>

                        <div className={style.section}>
                            <div className={style.label}>Wage Expectation</div>
                            <div className={style.value}>
                                {applicant?.salaryExpectations}
                            </div>
                        </div>
                        <div className={style.border}></div>
                        <div className={style.centerStatus}>
                            <div className={style.label}>Status</div>
                            <div
                                className={`${style.value} ${
                                    applicant?.status === 'active'
                                        ? style.statusActive
                                        : applicant?.status === 'rejected'
                                          ? style.statusRejected
                                          : ''
                                }`}
                            >
                                {applicant?.status}
                            </div>
                        </div>
                        <div className={style.border}></div>
                    </div>
                </div>
            </Card>
            <Card
                flex="1"
                borderRadius="5px"
                padding="32px"
                border="1px solid #ebebeb"
            >
                <div className={style.section}>
                    <div className={style.section}>
                        <div className={style.label}>Technologies Used</div>
                        <div className={style.value}>
                            {applicant?.technologiesUsed}
                        </div>
                    </div>
                    <div className={style.border}></div>{' '}
                    <div className={style.section}>
                        <div className={style.label}>CV</div>
                        <div className={style.value}>
                            {applicant?.cvAttachment && (
                                <a
                                    href={applicant.cvAttachment}
                                    target="_blank"
                                >
                                    {' '}
                                    View CV
                                </a>
                            )}
                        </div>
                    </div>
                    <div className={style.border}></div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        gap: '10px',
                        flexDirection: 'column',
                    }}
                >
                    <div className={style.label}>Create Interview:</div>
                    <Button
                        type={ButtonTypes.PRIMARY}
                        btnText="Create Interview"
                        width="100%"
                        onClick={() => handleOpenModal('active')}
                    />
                </div>
            </Card>
            {showModal && (
                <ModalComponent open={showModal} handleClose={handleCloseModal}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '15px',
                        }}
                    >
                        <div className={style.title}>Confirm Action</div>
                        <div>
                            {' '}
                            Are you sure you want to confirm interview with this
                            candidate?
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                gap: '10px',
                                marginTop: '20px',
                            }}
                        >
                            <Button
                                type={ButtonTypes.PRIMARY}
                                btnText="Confirm"
                                width="100%"
                                onClick={handleConfirm}
                            />
                            <Button
                                type={ButtonTypes.SECONDARY}
                                btnText="Cancel"
                                width="100%"
                                onClick={handleCloseModal}
                            />
                        </div>
                    </div>
                </ModalComponent>
            )}

            {showConfirmationModal && (
                <ModalComponent
                    open={showConfirmationModal}
                    handleClose={handleCloseConfirmationModal}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                        }}
                    >
                        <div className={style.title}>Notify Applicant.</div>
                        <Input
                            IsUsername
                            type="datetime-local"
                            name="interviewDate"
                            label="Date"
                            value={firstInterviewDate}
                            onChange={(e) =>
                                setFirstInterviewDate(e.target.value)
                            }
                        />
                          <FormControlLabel
                    control={
                        <Checkbox
                            checked={useCustomEmail}
                            onChange={(e) => setUseCustomEmail(e.target.checked)}
                            color="primary"
                        />
                    }
                    label="Use custom email"
                />{useCustomEmail && (
                    <>
                        <Input
                            IsUsername
                            type="textarea"
                            name="costumMessage"
                            label="Message"
                            multiline
                            rows={3}
                            value={customMessage}
                            onChange={(e) => setCustomMessage(e.target.value)}
                        />
                        <Input
                            IsUsername
                            type="textarea"
                            name="customSubject"
                            label="Message"
                            multiline
                            rows={3}
                            value={customSubject}
                            onChange={(e) => setCustomSubject(e.target.value)}
                        />
                         </>
                )}
                        <div
                            style={{
                                display: 'flex',
                                gap: '10px',
                                marginTop: '20px',
                            }}
                        >
                           
                            <Button
                                type={ButtonTypes.PRIMARY}
                                btnText="Send"
                                width="100%"
                                onClick={handleSend}
                            />
                            <Button
                                type={ButtonTypes.SECONDARY}
                                btnText="Close"
                                width="100%"
                                onClick={handleCloseConfirmationModal}
                            />
                        </div>
                    </div>
                </ModalComponent>
            )}
        </div>
    )
}
