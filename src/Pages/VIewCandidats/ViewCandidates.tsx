import style from './styles/ViewCandidats.module.css'
import { useApplicantById } from './Hook'
import { Card, Checkbox, Chip } from '@mui/joy'
import { useState } from 'react'
import { FormatPhoneNumber } from '@/Helpers/FormatPhoneNumber'
import { ForbiddenResource } from '@/Components/ForbiddenResource/ForbiddenResource'
import { Box, Button, Typography } from '@mui/joy'
import { Input } from '@/NewComponents/Inputs/Input'
import { Textarea } from '@/NewComponents/Inputs/Textarea'
import { Collapse } from '@mui/material'
import dayjs from 'dayjs'
import { Modal } from '@/NewComponents/Modal'

export default function ViewCandidates() {
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
        return dayjs().diff(dayjs(dob), 'year')
    }

    const [useCustomEmail, setUseCustomEmail] = useState(false)

    return (
        <ForbiddenResource>
            <div className={style.container}>
                <Card
                className="flex-[2]"
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
                                        ? calculateAge(
                                              applicant.dob.split('T')[0],
                                          )
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
                                    {FormatPhoneNumber(
                                        `+355${applicant?.phoneNumber}`,
                                    )}
                                </div>
                            </div>
                            <div className={style.border}></div>

                            <div className={style.section}>
                                <div className={style.label}>
                                    Applying Method
                                </div>
                                <div className={style.value}>
                                    {applicant?.applicationMethod}
                                </div>
                            </div>
                            <div className={style.border}></div>

                            <div className={style.section}>
                                <div className={style.label}>
                                    Wage Expectation
                                </div>
                                <div className={style.value}>
                                    {Number(
                                        applicant?.salaryExpectations,
                                    ).toLocaleString()}
                                </div>
                            </div>
                            <div className={style.border}></div>
                            <div className="flex flex-col gap-1">
                                <div className={style.label}>Status</div>
                                <Chip
                                    variant="soft"
                                    color={
                                        applicant?.status === 'active'
                                            ? 'success'
                                            : applicant?.status === 'rejected'
                                              ? 'danger'
                                              : 'primary'
                                    }
                                >
                                    {applicant?.status}
                                </Chip>
                            </div>
                            <div className={style.border}></div>
                        </div>
                    </div>
                </Card>
                <Card
                    className="flex-[2_2_0%]"
                >
                    <div className={style.section}>
                        <div className={style.section}>
                            <div className={style.label}>Technologies Used</div>
                            <div className="flex gap-2 my-2">
                                {applicant?.technologiesUsed &&
                                    JSON.parse(applicant?.technologiesUsed)
                                        .sort((a: string, b: string) =>
                                            a.localeCompare(b),
                                        )
                                        .map((tech: string) => (
                                            <Chip key={tech} color="primary">
                                                {tech}
                                            </Chip>
                                        ))}
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
                        className={style.section}
                        style={{
                            display: 'flex',
                            gap: '10px',
                            flexDirection: 'column',
                        }}
                    >
                        <div className={style.label}>
                            Create First Interview:
                        </div>
                        <Button
                            fullWidth
                            onClick={() => handleOpenModal('active')}
                        >
                            Create Interview
                        </Button>
                    </div>
                </Card>
                {showModal && (
                    <Modal open={showModal} onClose={handleCloseModal}>
                        <div className="flex flex-col gap-4">
                            <Box>
                                <Typography
                                    level="title-lg"
                                    className={style.title}
                                >
                                    Confirm {applicant?.firstName}
                                </Typography>
                                <Typography level="body-md">
                                    Are you sure you want to confirm interview
                                    with {applicant?.firstName}{' '}
                                    {applicant?.lastName}?
                                </Typography>
                            </Box>
                            <Box className="flex gap-3">
                                <Button fullWidth onClick={handleConfirm}>
                                    Confirm
                                </Button>
                                <Button
                                    variant="soft"
                                    fullWidth
                                    onClick={handleCloseModal}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </div>
                    </Modal>
                )}

                {showConfirmationModal && (
                    <Modal
                        open={showConfirmationModal}
                        onClose={handleCloseConfirmationModal}
                    >
                        <div className="flex flex-col gap-5">
                            <div className={style.title}>Notify Applicant</div>
                            <Input
                                type="datetime-local"
                                label="Interview date & time"
                                name="interviewDate"
                                value={firstInterviewDate}
                                onChange={(e) =>
                                    setFirstInterviewDate(e.target.value)
                                }
                            />
                            <Checkbox
                                color="primary"
                                onChange={(e) =>
                                    setUseCustomEmail(e.target.checked)
                                }
                                label="Use custom email"
                                variant="soft"
                            />

                            <Collapse in={useCustomEmail} unmountOnExit>
                                <>
                                    <Input
                                        type="text"
                                        variant="soft"
                                        label="Subject"
                                        name="customSubject"
                                        placeholder="Enter the subject of the email"
                                        value={customSubject}
                                        onChange={(e) =>
                                            setCustomSubject(e.target.value)
                                        }
                                    />
                                    <Textarea
                                        label="Message"
                                        variant="soft"
                                        minRows={3}
                                        name="customMessage"
                                        placeholder="Enter the message of the email"
                                        value={customMessage}
                                        onChange={(e) =>
                                            setCustomMessage(e.target.value)
                                        }
                                    />
                                </>
                            </Collapse>
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '10px',
                                    marginTop: '20px',
                                }}
                            >
                                <Button fullWidth onClick={handleSend}>
                                    Send
                                </Button>
                                <Button
                                    fullWidth
                                    variant="soft"
                                    onClick={handleCloseConfirmationModal}
                                >
                                    Close
                                </Button>
                            </div>
                        </div>
                    </Modal>
                )}
            </div>
        </ForbiddenResource>
    )
}
