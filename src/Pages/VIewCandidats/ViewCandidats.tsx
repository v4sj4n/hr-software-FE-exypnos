import Card from '../../Components/Card/Card'
import style from './styles/ViewCandidats.module.css'
import { useApplicantById } from './Hook'
import Button from '../../Components/Button/Button'
import { ButtonTypes } from '../../Components/Button/ButtonTypes'
import { ModalComponent } from '../../Components/Modal/Modal'
import Input from '@/Components/Input/Index'
export default function ViewCandidats() {
    const {
        applicant,
        showModal,
        handleCloseModal,
        handleOpenModal,
        handleConfirm,
        modalAction,
        showConfirmationModal,
        interviewDate,
        setInterviewDate,
        message,
        setMessage,
        handleSend,
        handleCloseConfirmationModal,
    } = useApplicantById()

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
                            <div className={style.value}>{applicant?.age}</div>
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
                    <div className={style.centerStatus}>
                        <div className={style.label}>Status</div>
                        <div
                            className={`${style.value} ${
                                applicant?.status === 'accepted'
                                    ? style.statusAccepted
                                    : applicant?.status === 'rejected'
                                      ? style.statusRejected
                                      : style.statusPending
                            }`}
                        >
                            {applicant?.status}
                        </div>
                    </div>
                    <div className={style.border}></div>
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
                    <div className={style.label}>Select Status:</div>
                    {applicant?.status !== 'accepted' && (
                        <Button
                            type={ButtonTypes.PRIMARY}
                            btnText="Accept"
                            width="100%"
                            onClick={() => handleOpenModal('accept')}
                        />
                    )}
                    {applicant?.status !== 'rejected' && (
                        <Button
                            type={ButtonTypes.PRIMARY}
                            btnText="Reject"
                            width="100%"
                            onClick={() => handleOpenModal('reject')}
                        />
                    )}
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
                        <div className={style.title}>Confirm Action.</div>
                        <div>
                            {' '}
                            Are you sure you want to {modalAction} this
                            candidate?{' '}
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
                            value={interviewDate}
                            onChange={(e) => setInterviewDate(e.target.value)}
                        />
                        <Input
                            IsUsername
                            type="textarea"
                            name="message"
                            label="Message"
                            multiline
                            rows={3}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
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
