import AxiosInstance from '@/Helpers/Axios'
import Card from '@/Components/Card/Card'
import { useEffect, useState } from 'react'
import style from '../styles/promotion.module.css'
import { BasicRating, ChangeRating } from './Stars'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import EditIcon from '@mui/icons-material/Edit'
import { useTheme } from '@mui/material/styles'
import { ModalComponent } from '@/Components/Modal/Modal'
import CloseIcon from '@mui/icons-material/Close'
import { useAuth } from '@/Context/AuthProvider'
import Toast from '@/Components/Toast/Toast'

export type Rating = {
    _id: string
    productivityScore: number
    teamCollaborationScore: number
    technicalSkillLevel: number
    clientFeedbackRating: number
    projectId: { _id: string; name: string }
}

export default function Rating({ id }: { id: string }) {
    const { currentUser } = useAuth()
    const theme = useTheme()
    const [ratings, setRatings] = useState<Rating[] | null>(null)
    const [updateRating, setUpdateRating] = useState<Rating | null>(null)
    const [open, setOpen] = useState(false)
    const [toastOpen, setToastOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [toastSeverity, setToastSeverity] = useState<'success' | 'error'>(
        'success',
    )

    const handleOpen = (rating: Rating) => {
        setUpdateRating(rating)
        setOpen(true)
    }

    const handleEditChange = (
        _event: React.ChangeEvent<{}>,
        value: number | null,
        fieldName: string,
    ) => {
        if (updateRating && value !== null) {
            setUpdateRating((prevRating) => ({
                ...prevRating!,
                [fieldName]: value,
            }))
        }
    }

    const update = async () => {
        if (!updateRating) return

        const updatedRating = {
            productivityScore: updateRating.productivityScore,
            teamCollaborationScore: updateRating.teamCollaborationScore,
            technicalSkillLevel: updateRating.technicalSkillLevel,
            clientFeedbackRating: updateRating.clientFeedbackRating,
        }

        try {
            const response = await AxiosInstance.patch(
                `/rating/${updateRating._id}`,
                updatedRating,
            )
            console.log('Rating updated successfully:', response.data)
            setRatings((prevRatings) =>
                (prevRatings ?? []).map((rating) =>
                    rating._id === updateRating._id ? response.data : rating,
                ),
            )
            setOpen(false)
            setToastOpen(true)
            setToastMessage('Rating updated successfully')
            setToastSeverity('success')
        } catch (error) {
            setToastOpen(true)
            setToastMessage(`Error updating rating: ${error}`)
            setToastSeverity('error')
            console.error('Error updating rating:', error)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await AxiosInstance.get(`/rating/user?id=${id}`)
            setRatings(response.data)
        }

        fetchData()
    }, [id])

    const handleCloseToast = () => {
        setToastOpen(false)
    }

    return (
        <>
            <Toast
                severity={toastSeverity }
                open={toastOpen}
                message={ toastMessage }
                onClose={ handleCloseToast}
            />

            <Card backgroundColor="rgba(255, 255, 255, 0.7)">
                <h3
                    style={{
                        padding: 0,
                        margin: ' 0 0 10px  0 ',
                        color: '#2457a3',
                    }}
                >
                    Rating
                </h3>
                <div className={style.secondDiv}>
                    {ratings &&
                        ratings.map((rating) => (
                            <Card
                                key={rating._id}
                                backgroundColor={
                                    theme.palette.background.default
                                }
                            >
                                <h4>{rating.projectId.name}</h4>
                                <div className={style.grid}>
                                    <BasicRating
                                        type="Productivity Score"
                                        value={rating.productivityScore}
                                    />
                                    <BasicRating
                                        type="Team Collaboration Score"
                                        value={rating.teamCollaborationScore}
                                    />
                                    <BasicRating
                                        type="Technical Skill Level"
                                        value={rating.technicalSkillLevel}
                                    />
                                    <BasicRating
                                        type="Client Feedback Rating"
                                        value={rating.clientFeedbackRating}
                                    />
                                </div>
                                {currentUser?.role === 'hr' && (
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            width: '100%',
                                        }}
                                    >
                                        <Button
                                            type={ButtonTypes.SECONDARY}
                                            btnText=""
                                            width="40px"
                                            height="30px"
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                            color="#2457A3"
                                            borderColor="#2457A3"
                                            icon={<EditIcon />}
                                            onClick={() => handleOpen(rating)}
                                        />
                                    </div>
                                )}
                            </Card>
                        ))}
                </div>

                {open && updateRating && (
                    <ModalComponent
                        open={open}
                        handleClose={() => setOpen(false)}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <h3>Change Rating</h3>
                            <CloseIcon
                                style={{ cursor: 'pointer' }}
                                onClick={() => setOpen(false)}
                            />{' '}
                        </div>
                        <ChangeRating
                            label="Productivity Score"
                            name="productivityScore"
                            value={updateRating.productivityScore}
                            onChange={(event, value) =>
                                handleEditChange(
                                    event,
                                    value,
                                    'productivityScore',
                                )
                            }
                        />
                        <ChangeRating
                            label="Team Collaboration Score"
                            name="teamCollaborationScore"
                            value={updateRating.teamCollaborationScore}
                            onChange={(event, value) =>
                                handleEditChange(
                                    event,
                                    value,
                                    'teamCollaborationScore',
                                )
                            }
                        />
                        <ChangeRating
                            label="Technical Skill Level"
                            name="technicalSkillLevel"
                            value={updateRating.technicalSkillLevel}
                            onChange={(event, value) =>
                                handleEditChange(
                                    event,
                                    value,
                                    'technicalSkillLevel',
                                )
                            }
                        />
                        <ChangeRating
                            label="Client Feedback Rating"
                            name="clientFeedbackRating"
                            value={updateRating.clientFeedbackRating}
                            onChange={(event, value) =>
                                handleEditChange(
                                    event,
                                    value,
                                    'clientFeedbackRating',
                                )
                            }
                        />

                        <Button
                            onClick={update}
                            type={ButtonTypes.PRIMARY}
                            btnText="Update"
                            width="200px"
                            marginTop="10px"
                        />
                    </ModalComponent>
                )}
            </Card>
        </>
    )
}
